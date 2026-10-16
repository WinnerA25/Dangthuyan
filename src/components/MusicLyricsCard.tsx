import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  SkipBack,
  SkipForward,
  ListMusic,
  Check,
} from 'lucide-react';
import { SongItem } from '../types.ts';

interface MusicLyricsCardProps {
  playlist: SongItem[];
  activeSong: SongItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onSeek: (timeSec: number) => void;
  onSelectSong: (song: SongItem) => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  onToggleMute: () => void;
}

export const MusicLyricsCard: React.FC<MusicLyricsCardProps> = ({
  playlist,
  activeSong,
  isPlaying,
  currentTime,
  duration,
  isMuted,
  onTogglePlay,
  onSeek,
  onSelectSong,
  onNextSong,
  onPrevSong,
  onToggleMute,
}) => {
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Find active lyric index by comparing currentTime with each lyric's timeSec
  const activeLyricIndex = useMemo(() => {
    if (!activeSong.lyrics || activeSong.lyrics.length === 0) return 0;
    let match = 0;
    for (let i = 0; i < activeSong.lyrics.length; i++) {
      if (currentTime >= activeSong.lyrics[i].timeSec) {
        match = i;
      }
    }
    return match;
  }, [currentTime, activeSong.lyrics]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    onSeek(newTime);
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= PLAYLIST SELECTOR TABS ================= */}
      <div className="rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-4 sm:p-5 backdrop-blur-xl shadow-lg shadow-purple-950/5">
        <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-[#EAE0F0]">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-purple-700" />
            <h4 className="text-xs sm:text-sm font-bold text-[#2E1537] font-serif-elegant">
              Chọn Bài Hát Chúc Mừng ({playlist.length} bài hát Zing MP3 chuẩn)
            </h4>
          </div>
          <span className="text-[11px] text-purple-700 font-medium hidden sm:inline">
            Bản thu âm chuẩn studio có lời hát tiếng ca chân thực
          </span>
        </div>

        {/* Scrollable / Grid Song Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {playlist.map((song, idx) => {
            const isSelected = song.id === activeSong.id;
            return (
              <button
                key={song.id}
                type="button"
                onClick={() => onSelectSong(song)}
                className={`text-left p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group flex items-center gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-100/95 via-purple-50 to-[#FFF9F0] border-purple-400 shadow-md shadow-purple-500/10 scale-[1.01]'
                    : 'bg-white/80 border-[#EFE5F5] hover:bg-white hover:border-purple-200 text-[#5B3A62]'
                }`}
              >
                {/* Number or Equalizer */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-purple-600 to-violet-500 text-white shadow-sm'
                      : 'bg-purple-100/70 text-purple-800'
                  }`}
                >
                  {isSelected && isPlaying ? (
                    <div className="flex items-end gap-0.5 h-3.5">
                      <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 bg-white rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 bg-white rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isSelected ? 'text-purple-950' : 'text-[#3E1C4D]'
                      }`}
                    >
                      {song.title}
                    </p>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-[#7A5A82] truncate">
                      {song.artist}
                    </span>
                    {song.tag && (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-100 text-purple-800 font-medium shrink-0">
                        {song.tag}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= NOW PLAYING & KARAOKE CARD ================= */}
      <div className="w-full rounded-3xl bg-[#FAF7F2]/95 border border-purple-200/90 p-5 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/10 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#EED8C0]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Header bar: Title, Player buttons, Soundwaves */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE0F0] relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 via-violet-600 to-[#C59B27] flex items-center justify-center text-white shadow-lg shadow-purple-600/30 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '8s' }}
              >
                <Music className="w-7 h-7" />
              </div>
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-semibold mb-1">
                <Sparkles className="w-3 h-3 text-[#B8860B]" />
                <span>Đang phát • Zing MP3</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#2E1537] font-serif-elegant">
                {activeSong.title}
              </h3>
              <p className="text-xs text-purple-800 font-medium">
                {activeSong.artist}
              </p>
            </div>
          </div>

          {/* Action buttons: Prev, Play/Pause, Next, Volume */}
          <div className="flex items-center gap-2 self-center sm:self-auto">
            {/* Previous Song */}
            <button
              type="button"
              onClick={onPrevSong}
              className="p-2.5 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="Bài trước"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={onTogglePlay}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-[#C59B27] text-white shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Tạm dừng' : 'Phát bài hát'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Song */}
            <button
              type="button"
              onClick={onNextSong}
              className="p-2.5 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="Bài tiếp theo"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Mute toggle */}
            <button
              type="button"
              onClick={onToggleMute}
              className="p-2.5 rounded-2xl bg-white border border-[#E8DCF0] text-purple-900 hover:text-purple-950 hover:bg-purple-50 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-purple-600" />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar & Timestamp */}
        <div className="pt-3 pb-2 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-medium text-purple-900 w-9 text-right shrink-0">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration > 0 ? duration : 180}
              step="0.5"
              value={currentTime}
              onChange={handleSliderChange}
              className="flex-1 h-1.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 transition-all"
              aria-label="Tua bài hát"
            />
            <span className="text-[11px] font-mono font-medium text-[#7A5A82] w-9 shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Karaoke / Synchronized Lyrics Display */}
        <div className="mt-4 space-y-3 relative z-10">
          <div className="flex items-center justify-between text-xs text-[#6B4E71] font-semibold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Lời bài hát Zing MP3 chuẩn (Bấm câu hát để nghe đúng đoạn):</span>
            </span>
            <span className="text-[11px] text-purple-700 font-medium">Tự động đồng bộ theo tiếng hát</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {activeSong.lyrics.map((lyric, idx) => {
              const isActive = idx === activeLyricIndex;
              return (
                <motion.div
                  key={lyric.id}
                  onClick={() => onSeek(lyric.timeSec)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-100 via-purple-50 to-[#FFFDF9] border-purple-400 shadow-md shadow-purple-500/10 scale-[1.01]'
                      : 'bg-white/80 border-[#EFE5F5] hover:bg-white text-[#5B3A62] hover:text-[#2E1537]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm sm:text-base font-romantic tracking-wide transition-colors ${
                        isActive ? 'text-purple-950 font-bold text-lg sm:text-xl' : 'text-[#3E1C4D]'
                      }`}
                    >
                      {isActive ? `🎶 ${lyric.text}` : lyric.text}
                    </p>
                    {isActive && (
                      <span className="shrink-0 text-[11px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-sans font-medium shadow-sm animate-pulse">
                        Đang hát
                      </span>
                    )}
                  </div>
                  {lyric.subtext && (
                    <p
                      className={`text-xs mt-1 italic transition-colors font-medium ${
                        isActive ? 'text-purple-800 font-semibold' : 'text-[#7A5A82]'
                      }`}
                    >
                      {lyric.subtext}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
