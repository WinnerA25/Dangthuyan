import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Settings2,
  Volume2,
  VolumeX,
  Cake,
  Music,
  Mail,
  Camera,
  Flame,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  LogOut,
  Calendar,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig, BirthdayPhoto, SongItem } from '../types.ts';
import { DEFAULT_BIRTHDAY_DATA } from '../data/defaultBirthdayData.ts';
import { BirthdayCake } from './BirthdayCake.tsx';
import { MusicLyricsCard } from './MusicLyricsCard.tsx';
import { PhotoGallery } from './PhotoGallery.tsx';
import { RomanticLetter } from './RomanticLetter.tsx';
import { soundEngine } from '../utils/audio.ts';

interface CelebrationMainProps {
  config: BirthdayConfig;
  onUpdatePhotos: (photos: BirthdayPhoto[]) => void;
  onSongChange?: (song: SongItem) => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  onTriggerFirework: () => void;
}

export const CelebrationMain: React.FC<CelebrationMainProps> = ({
  config,
  onUpdatePhotos,
  onSongChange,
  onOpenSettings,
  onLogout,
  onTriggerFirework,
}) => {
  // Page index: 0 = Cake, 1 = Lyrics, 2 = Letter, 3 = Album, 4 = Fireworks Finale
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageDirection, setPageDirection] = useState<'forward' | 'backward'>('forward');

  // Playlist & Persistent Audio Playback
  const playlist = config.playlist && config.playlist.length > 0
    ? config.playlist
    : DEFAULT_BIRTHDAY_DATA.playlist!;

  const initialSong = playlist.find((s) => s.id === config.selectedSongId) || playlist[0];
  const [activeSong, setActiveSong] = useState<SongItem>(initialSong);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const audioRef = useRef<HTMLAudioElement>(null);

  const [bYear, bMonth, bDay] = config.birthDate.split('-');

  const PAGES = [
    { id: 0, title: 'Bánh Kem & Thổi Nến', shortTitle: 'Bánh Kem', icon: Cake },
    { id: 1, title: 'Lời Bài Hát & Giai Điệu', shortTitle: 'Lời Bài Hát', icon: Music },
    { id: 2, title: 'Bức Thư Lời Chúc', shortTitle: 'Bức Thư', icon: Mail },
    { id: 3, title: 'Người Yêu Xinh Của PCT', shortTitle: 'Album Ảnh', icon: Camera },
    { id: 4, title: 'Đại Tiệc Pháo Hoa', shortTitle: 'Pháo Hoa', icon: Flame },
  ];

  const totalPages = PAGES.length;

  // Auto-play music persistently upon entering Celebration
  useEffect(() => {
    soundEngine.stopBgm(); // Silence synthesizer so real vocal audio plays
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = activeSong.audioUrl || '';
    audio.load();

    const startAudio = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy prevents autoplay, wait for user's next click
          const handleFirstClick = () => {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener('click', handleFirstClick);
            window.removeEventListener('touchstart', handleFirstClick);
          };
          window.addEventListener('click', handleFirstClick, { once: true });
          window.addEventListener('touchstart', handleFirstClick, { once: true });
        });
    };

    startAudio();

    return () => {
      audio.pause();
    };
  }, []);

  // Sync activeSong if selectedSongId changes externally
  useEffect(() => {
    if (config.selectedSongId) {
      const match = playlist.find((s) => s.id === config.selectedSongId);
      if (match && match.id !== activeSong.id) {
        handleSelectSong(match);
      }
    }
  }, [config.selectedSongId, playlist]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    soundEngine.stopBgm();
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (isMuted) {
        handleToggleMute();
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSelectSong = (song: SongItem) => {
    setActiveSong(song);
    setCurrentTime(0);
    soundEngine.stopBgm();
    const audio = audioRef.current;
    if (audio) {
      audio.src = song.audioUrl || '';
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
    if (onSongChange) {
      onSongChange(song);
    }
  };

  const handleNextSong = () => {
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    handleSelectSong(playlist[nextIndex]);
  };

  const handlePrevSong = () => {
    const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    handleSelectSong(playlist[prevIndex]);
  };

  const handleSeek = (timeSec: number) => {
    setCurrentTime(timeSec);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = timeSec;
      if (!isPlaying) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex === currentPage) return;
    setPageDirection(pageIndex > currentPage ? 'forward' : 'backward');
    setCurrentPage(pageIndex);
    soundEngine.playSparkleChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mini confetti on page turn with purple & gold/beige colors
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#a855f7', '#c084fc', '#d4af37', '#fef3c7'],
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation: left/right arrows jump pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentPage < totalPages - 1) handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 0) handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const handleManualFirework = () => {
    onTriggerFirework();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#c084fc', '#d4af37', '#faebd7', '#ffffff'],
    });
  };

  // Animation variants for page transition
  const pageVariants = {
    initial: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      x: direction === 'forward' ? 120 : -120,
      scale: 0.96,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
    exit: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      x: direction === 'forward' ? -120 : 120,
      scale: 0.96,
      transition: { duration: 0.35, ease: 'easeIn' as const },
    }),
  };

  return (
    <div className="relative z-10 min-h-screen pb-32 pt-4 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col text-[#2E1537]">
      {/* ================= PERSISTENT AUDIO ELEMENT ================= */}
      {/* Kept at the top level of CelebrationMain so changing pages NEVER cuts the music */}
      <audio
        ref={audioRef}
        src={activeSong.audioUrl || undefined}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          handleNextSong();
        }}
        preload="auto"
      />

      {/* Top Navbar */}
      <header className="sticky top-4 z-40 mb-6 rounded-2xl bg-[#FAF7F2]/95 border border-purple-200/90 px-4 sm:px-6 py-3 backdrop-blur-xl shadow-md flex items-center justify-between gap-3">
        {/* Brand / Recipient badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 p-0.5 bg-white shrink-0 shadow-sm">
            <img
              src={config.loginPhoto}
              alt={config.recipientName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#2E1537] flex items-center gap-1.5 font-serif-elegant">
              <span>{config.recipientName}</span>
              <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
            </h1>
            <p className="text-[10px] sm:text-xs text-purple-700 font-semibold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#B8860B]" />
              <span>Sinh nhật: {bDay}/{bMonth}/{bYear}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick mini sound player indicator in header */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isPlaying
                ? 'bg-purple-100/80 border-purple-300 text-purple-900'
                : 'bg-white border-[#E8DCF0] text-[#7A5A82] hover:text-purple-900'
            }`}
            title={isPlaying ? 'Đang phát bài hát (Bấm để dừng)' : 'Bấm để phát bài hát'}
          >
            <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-purple-600 animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="max-w-[130px] truncate">{activeSong.title}</span>
          </button>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
            title="Tùy chỉnh thông tin sinh nhật"
          >
            <Settings2 className="w-4 h-4 text-purple-600" />
          </button>

          {/* Log out / Lock again */}
          <button
            type="button"
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              onLogout();
            }}
            className="p-2 rounded-xl bg-white border border-[#E8DCF0] text-[#7A5A82] hover:text-purple-950 hover:bg-purple-50 transition-colors cursor-pointer shadow-sm"
            title="Khóa lại / Quay về màn hình đăng nhập"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Chapter Tabs / Page Switcher Bar ("Thanh Nhảy Trang") */}
      <div className="mb-8 rounded-2xl bg-[#FAF7F2]/95 border border-purple-200/90 p-1.5 sm:p-2 backdrop-blur-md shadow-sm">
        {/* Progress indicator */}
        <div className="flex items-center justify-between px-3 py-1.5 text-xs mb-2 border-b border-[#EAE0F0]">
          <span className="font-semibold text-purple-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Trang {currentPage + 1} / {totalPages}: {PAGES[currentPage].title}</span>
          </span>
          <span className="text-[11px] text-[#7A5A82] font-medium hidden sm:inline">
            (Dùng phím mũi tên ← → để nhảy trang)
          </span>
        </div>

        {/* 5 Page Buttons */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {PAGES.map((page) => {
            const Icon = page.icon;
            const isActive = page.id === currentPage;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => goToPage(page.id)}
                className={`py-2 px-1 sm:px-3 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-md shadow-purple-600/30 scale-[1.02]'
                    : 'text-[#6B4E71] hover:text-purple-950 hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-[#7A5A82]'}`} />
                <span className="text-[11px] sm:text-xs truncate font-medium">{page.shortTitle}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePageIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#D4AF37] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Page Slide View (Dạng Nhảy Trang) */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={pageDirection} mode="wait">
          {/* ================= PAGE 1: BÁNH KEM & THỔI NẾN ================= */}
          {currentPage === 0 && (
            <motion.div
              key="page-cake"
              custom={pageDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              {/* Hero Banner */}
              <div className="text-center py-4 relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#B8860B]" />
                  <span>Trang 1: Chúc Mừng Sinh Nhật Ngọt Ngào</span>
                  <Sparkles className="w-4 h-4 text-[#B8860B]" />
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-violet-700 to-[#A0522D] font-romantic tracking-wider drop-shadow-sm">
                  Happy Birthday, {config.recipientName}!
                </h2>

                <p className="text-[#4A2855] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3 font-serif-elegant leading-relaxed font-medium">
                  Hôm nay là ngày tuyệt vời nhất để em tỏa sáng và mỉm cười rạng rỡ! Hãy cùng nhau thổi nến và ước nguyện nhé! ✨
                </p>
              </div>

              {/* Birthday Cake Card */}
              <div className="rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-6 sm:p-10 backdrop-blur-md shadow-xl">
                <BirthdayCake
                  recipientName={config.recipientName}
                  onBlowCandles={handleManualFirework}
                />
              </div>

              {/* Bottom Page Navigation Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sang Trang 2: Lời Bài Hát & Giai Điệu 🎶</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PAGE 2: LỜI BÀI HÁT & ÂM NHẠC ================= */}
          {currentPage === 1 && (
            <motion.div
              key="page-lyrics"
              custom={pageDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-2 shadow-sm">
                  <Music className="w-4 h-4 text-[#B8860B]" />
                  <span>Trang 2: Giai Điệu Sinh Nhật Trao Em</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#2E1537] font-serif-elegant">
                  Khúc Hát Sinh Nhật Du Dương
                </h2>
                <p className="text-xs sm:text-sm text-[#6B4E71] mt-1 max-w-lg mx-auto font-medium">
                  Lắng nghe giai điệu ngọt ngào vang lên cùng những câu từ dành riêng cho em.
                </p>
              </div>

              {/* Connected Music Player & Lyrics Card */}
              <MusicLyricsCard
                playlist={playlist}
                activeSong={activeSong}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                isMuted={isMuted}
                onTogglePlay={handleTogglePlay}
                onSeek={handleSeek}
                onSelectSong={handleSelectSong}
                onNextSong={handleNextSong}
                onPrevSong={handlePrevSong}
                onToggleMute={handleToggleMute}
              />

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="px-5 py-3 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:bg-purple-50 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trang 1: Bánh Kem</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sang Trang 3: Bức Thư Lời Chúc 💌</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PAGE 3: BỨC THƯ TÌNH CẢM & THẢ ĐÈN TRỜI ================= */}
          {currentPage === 2 && (
            <motion.div
              key="page-letter"
              custom={pageDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-2 shadow-sm">
                  <Mail className="w-4 h-4 text-[#B8860B]" />
                  <span>Trang 3: Những Dòng Tâm Sự Ngọt Ngào</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#2E1537] font-serif-elegant">
                  Bức Thư Bí Mật Dành Riêng Cho Em
                </h2>
                <p className="text-xs sm:text-sm text-[#6B4E71] mt-1 max-w-lg mx-auto font-medium">
                  Mở phong thư sáp ấn để đọc trọn vẹn những lời chúc sâu thẳm từ đáy lòng.
                </p>
              </div>

              {/* Romantic Letter & Lantern */}
              <RomanticLetter
                title={config.letterTitle}
                salutation={config.letterSalutation}
                body={config.letterBody}
                signOff={config.letterSignOff}
                senderName={config.senderName}
              />

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="px-5 py-3 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:bg-purple-50 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trang 2: Lời Bài Hát</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sang Trang 4: Người Yêu Xinh Của PCT 📸</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PAGE 4: ALBUM NGƯỜI YÊU XINH CỦA PCT ================= */}
          {currentPage === 3 && (
            <motion.div
              key="page-album"
              custom={pageDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-2 shadow-sm">
                  <Camera className="w-4 h-4 text-[#B8860B]" />
                  <span>Trang 4: Album Ảnh Kỷ Niệm</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#2E1537] font-serif-elegant flex items-center justify-center gap-2">
                  <span>Người Yêu Xinh Của PCT</span>
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                </h2>
                <p className="text-xs sm:text-sm text-[#6B4E71] mt-1 max-w-lg mx-auto font-medium">
                  Lật từng trang ảnh Polaroid, nhấn vào ảnh bất kỳ để ngắm cận cảnh.
                </p>
              </div>

              {/* Photo Gallery Component */}
              <PhotoGallery
                photos={config.photos}
                onUpdatePhotos={onUpdatePhotos}
              />

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="px-5 py-3 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:bg-purple-50 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trang 3: Bức Thư Lời Chúc</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/25 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sang Trang 5: Bão Pháo Hoa 🎆</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PAGE 5: ĐẠI TIỆC PHÁO HOA (GRAND FINALE) ================= */}
          {currentPage === 4 && (
            <motion.div
              key="page-fireworks"
              custom={pageDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
                  <Flame className="w-4 h-4 text-[#B8860B]" />
                  <span>Trang 5: Bầu Trời Pháo Hoa Rực Rỡ</span>
                  <Sparkles className="w-4 h-4 text-[#B8860B]" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-violet-700 to-[#A0522D] font-romantic tracking-wider">
                  Mãi Mãi Hạnh Phúc Nhất Nhé Em!
                </h2>
                <p className="text-sm sm:text-base text-[#4A2855] mt-3 max-w-xl mx-auto font-serif-elegant leading-relaxed font-medium">
                  Cảm ơn em vì đã hiện diện trên thế giới này và mang đến ngập tràn niềm vui! Chúc tuổi mới rạng ngời như vạn chùm pháo hoa thắp sáng màn đêm! ✨💜
                </p>
              </div>

              {/* Interactive Fireworks Center Control */}
              <div className="rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-8 sm:p-12 text-center backdrop-blur-xl shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-200/20 via-transparent to-amber-100/30 pointer-events-none" />

                <div className="max-w-md mx-auto space-y-6 relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#D4AF37] via-purple-600 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-purple-600/30 animate-bounce">
                    <Flame className="w-10 h-10 fill-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#2E1537] mb-2 font-serif-elegant">
                      Khai Hỏa Cơn Mưa Pháo Hoa Trái Tim
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B4E71] font-medium">
                      Bấm nút bên dưới hoặc chạm bất kỳ đâu trên màn hình để phóng pháo hoa trái tim rực rỡ lên bầu trời!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleManualFirework}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 text-amber-200" />
                      <span>Bắn Pháo Hoa Liên Hoàn 🎆</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Back & Restart */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:bg-purple-50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại Trang 4: Người Yêu Xinh Của PCT</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToPage(0)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-purple-400 text-purple-900 hover:bg-purple-50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Xem lại từ Trang 1 🎂</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= PERSISTENT FLOATING MINI MUSIC BAR ================= */}
      {/* Shown whenever the user is NOT on Page 2 (Lyrics), so music is visibly active across all other pages */}
      {currentPage !== 1 && (
        <div className="fixed bottom-16 sm:bottom-18 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md rounded-2xl bg-[#FAF7F2]/95 border border-purple-300 px-3.5 py-2.5 backdrop-blur-xl shadow-xl flex items-center justify-between gap-2.5">
          {/* Left: Disc & Title */}
          <div
            onClick={() => goToPage(1)}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
            title="Bấm để mở trang Lời Bài Hát & Karaoke"
          >
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 to-violet-500 flex items-center justify-center text-white shrink-0 shadow-sm ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <Music className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-purple-950 truncate group-hover:text-purple-700 transition-colors">
                {activeSong.title}
              </p>
              <p className="text-[10px] text-[#7A5A82] truncate">
                {activeSong.artist}
              </p>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handlePrevSong}
              className="p-1.5 rounded-lg text-purple-900 hover:bg-purple-100 transition-colors cursor-pointer"
              title="Bài trước"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-2 rounded-xl bg-purple-600 text-white shadow-md hover:bg-purple-700 transition-all cursor-pointer"
              title={isPlaying ? 'Tạm dừng' : 'Phát bài hát'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNextSong}
              className="p-1.5 rounded-lg text-purple-900 hover:bg-purple-100 transition-colors cursor-pointer"
              title="Bài tiếp theo"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg text-purple-900 hover:bg-purple-100 transition-colors cursor-pointer ml-1"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-purple-600" />}
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Quick Page Bar (Nhảy trang nhanh) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/95 border border-purple-200/90 backdrop-blur-xl shadow-2xl shadow-purple-950/15">
        <button
          type="button"
          disabled={currentPage === 0}
          onClick={handlePrevPage}
          className="p-1.5 rounded-full text-[#7A5A82] hover:text-purple-950 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          title="Trang trước (Phím ←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {PAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goToPage(p.id)}
              className={`transition-all rounded-full cursor-pointer ${
                p.id === currentPage
                  ? 'w-7 h-2 bg-gradient-to-r from-purple-600 to-violet-500 shadow-md shadow-purple-600/40'
                  : 'w-2 h-2 bg-[#E2D4C5] hover:bg-purple-400/60'
              }`}
              title={`Nhảy tới Trang ${p.id + 1}: ${p.title}`}
            />
          ))}
        </div>

        <button
          type="button"
          disabled={currentPage === totalPages - 1}
          onClick={handleNextPage}
          className="p-1.5 rounded-full text-[#7A5A82] hover:text-purple-950 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          title="Trang tiếp theo (Phím →)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
