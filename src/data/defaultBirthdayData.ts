import { BirthdayConfig } from '../types.ts';

/**
 * ============================================================================
 * 📸 HƯỚNG DẪN THAY ĐỔI ĐƯỜNG DẪN ẢNH KHI TẢI CODE VỀ MÁY:
 * ============================================================================
 * Cách 1: Thay bằng ảnh cá nhân trong máy tính (Khuyên dùng khi chạy local):
 *   - Bỏ ảnh của bạn vào thư mục: "public/images/"
 *   - Đặt ảnh đại diện: avatar.jpg -> chỉ cần đổi url thành: '/images/avatar.jpg'
 *   - Đặt 16 ảnh album: photo1.jpg, photo2.jpg,... -> chỉ cần đổi thành: '/images/photo1.jpg'
 *
 * Cách 2: Thay bằng link ảnh Online (Google Drive direct link, Facebook, Imgur, v.v.):
 *   - Dán trực tiếp đường link ảnh vào trường `url` bên dưới.
 * ============================================================================
 */

export const DEFAULT_BIRTHDAY_DATA: BirthdayConfig = {
  // Tên người nhận sinh nhật
  recipientName: 'Thúy An',
  nickName: 'Thúy An',
  birthDate: '2006-10-25', // Ngày sinh mặc định: 25/10/2006 (Định dạng YYYY-MM-DD)

  // ẢNH ĐẠI DIỆN TRANG ĐĂNG NHẬP:
  // Dùng ảnh có sẵn trong public/images để tránh lỗi hình ảnh khi mở trang đăng nhập.
  loginPhoto: '/images/avatar.jpg',
  loginHint: '',

  senderName: 'Người Luôn Yêu & Ở Cạnh Em ❤️',
  cakeMessage: 'Happy Birthday, Thúy An!',
  letterTitle: 'Gửi Thúy An - Người Con Gái Tuyệt Vời Nhất Của Anh',
  letterSalutation: 'Thúy An yêu dấu của anh,',
  letterBody: [
    'Hôm nay là một ngày vô cùng đặc biệt — ngày mà cả thế giới này được chào đón Thúy An xinh đẹp xuất hiện, mang theo nụ cười toả nắng và sự dịu dàng làm tan chảy trái tim anh.',
    'Cảm ơn Thúy An vì đã đến bên anh, vì những khoảnh khắc cùng nhau cười đùa, những lúc lắng nghe nhau tâm sự và cả những điều giản đơn nhưng ấm áp vô cùng.',
    'Bước sang tuổi mới, anh chúc Thúy An luôn luôn xinh đẹp, rạng rỡ và ngập tràn hạnh phúc. Mong em luôn giữ được nụ cười trong trẻo ấy, luôn mạnh mẽ vượt qua mọi thử thách, và luôn tin rằng dù có bất cứ chuyện gì xảy ra, anh vẫn sẽ luôn ở đây để nắm chặt tay em.',
    'Hãy cứ ước những điều em muốn, vì cả vũ trụ và anh sẽ cùng giúp em biến mọi ước mơ thành hiện thực. Chúc mừng sinh nhật Thúy An của anh! ✨🎂🎉'
  ],
  letterSignOff: 'Mãi yêu Thúy An hơn cả hôm qua, và ít hơn ngày mai!',
  songTitle: 'Hẹn Em Dưới Pháo Hoa',
  songArtist: 'Ân Ngờ x Kphuong (Zing MP3)',
  audioUrl: '/audio/hen-em-duoi-phao-hoa.mp3',
  lyrics: [
    { id: '1', timeSec: 15, text: 'Biết đâu duyên trời em ơi, cách nhau mấy giậu mồng tơi', subtext: 'Để ai ngỏ lời sang chơi, có em bên đời...' },
    { id: '2', timeSec: 23, text: 'Pháo hoa rực rỡ trên trời, người yêu ơi anh đang tới', subtext: 'Có chăng hơi ấm bên đời là do mây mang em với' },
    { id: '3', timeSec: 31, text: 'Câu chúc - hàn huyên, đâu đó tình duyên rơi vào nơi bước chân em đi', subtext: 'Người đi mất, đành thôi cất cớ sao? Mà cớ sao?' },
    { id: '4', timeSec: 47, text: 'Thư trắng từng trao, đêm ước ngày ao, anh chỉ mong thấy em an vui', subtext: 'Người đi có nhớ tôi? Có không một lời?' },
    { id: '5', timeSec: 63, text: 'À ới duyên tình, tình duyên nào chẳng chơi vơi', subtext: 'Anh cố đợi nhưng sao lòng em dường như chẳng đưa đến nơi' },
    { id: '6', timeSec: 78, text: 'Người giấu câu chào, tôi hỏi thăm cỏ cây biết không?', subtext: 'Hoa đã về với mây gió biển khơi, sẽ có ai nói yêu thật lòng' },
    { id: '7', timeSec: 94, text: 'Đâu ai hiểu mấy năm ròng chuyện một khi người đã tương tư', subtext: 'Mong rằng sau này ta giống như nên duyên gọi tiếng vợ chồng' },
    { id: '8', timeSec: 110, text: 'Bao lâu anh vẫn sẽ đợi, trăm ngàn năm dù rất xa xưa', subtext: 'Chúc mừng sinh nhật em - người anh mãi đợi dưới pháo hoa rực rỡ ❤️' },
  ],
  selectedSongId: 'hen-em-duoi-phao-hoa',
  playlist: [
    {
      id: 'hen-em-duoi-phao-hoa',
      title: 'Hẹn Em Dưới Pháo Hoa',
      artist: 'Ân Ngờ x Kphuong',
      audioUrl: '/audio/hen-em-duoi-phao-hoa.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 'h1', timeSec: 15, text: 'Biết đâu duyên trời em ơi, cách nhau mấy giậu mồng tơi', subtext: 'Để ai ngỏ lời sang chơi, có em bên đời...' },
        { id: 'h2', timeSec: 23, text: 'Pháo hoa rực rỡ trên trời, người yêu ơi anh đang tới', subtext: 'Có chăng hơi ấm bên đời là do mây mang em với' },
        { id: 'h3', timeSec: 31, text: 'Câu chúc - hàn huyên, đâu đó tình duyên rơi vào nơi bước chân em đi', subtext: 'Người đi mất, đành thôi cất cớ sao? Mà cớ sao?' },
        { id: 'h4', timeSec: 47, text: 'Thư trắng từng trao, đêm ước ngày ao, anh chỉ mong thấy em an vui', subtext: 'Người đi có nhớ tôi? Có không một lời?' },
        { id: 'h5', timeSec: 63, text: 'À ới duyên tình, tình duyên nào chẳng chơi vơi', subtext: 'Anh cố đợi nhưng sao lòng em dường như chẳng đưa đến nơi' },
        { id: 'h6', timeSec: 78, text: 'Người giấu câu chào, tôi hỏi thăm cỏ cây biết không?', subtext: 'Hoa đã về với mây gió biển khơi, sẽ có ai nói yêu thật lòng' },
        { id: 'h7', timeSec: 94, text: 'Đâu ai hiểu mấy năm ròng chuyện một khi người đã tương tư', subtext: 'Mong rằng sau này ta giống như nên duyên gọi tiếng vợ chồng' },
        { id: 'h8', timeSec: 110, text: 'Bao lâu anh vẫn sẽ đợi, trăm ngàn năm dù rất xa xưa', subtext: 'Chúc mừng sinh nhật em - người anh mãi đợi dưới pháo hoa rực rỡ ❤️' },
      ],
    },
    {
      id: 'xuan-ha-thu-dong',
      title: 'Xuân Hạ Thu Đông Rồi Lại Xuân',
      artist: 'AMEE (Sáng tác: Hứa Kim Tuyền, TDK, Grey-D)',
      audioUrl: '/audio/xuan-ha-thu-dong.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 'x1', timeSec: 14, text: 'Gửi anh người yêu ở nơi xa chẳng gặp...', subtext: 'Chẳng biết phải bao giờ anh mới ghé thăm' },
        { id: 'x2', timeSec: 22, text: 'Cứ thế đêm ngày trôi thấp thoáng mấy năm rồi', subtext: 'Chắc anh giờ đây quen cuộc sống mới' },
        { id: 'x3', timeSec: 30, text: 'Đợi anh mà xuân hạ thu đông cũng tàn', subtext: 'Lại thêm mùa xuân, mùa xuân nữa đã sang' },
        { id: 'x4', timeSec: 38, text: 'Ước muốn được gặp nhau, chẳng biết đến bao giờ', subtext: 'Để em cứ mãi một mình trong bao giấc mơ' },
        { id: 'x5', timeSec: 54, text: 'Chẳng sợ phải đợi anh thật lâu, điều em lo nhất...', subtext: 'Chẳng biết bao lâu, bao lâu, bao lâu, sẽ kéo dài bao lâu' },
        { id: 'x6', timeSec: 70, text: 'Giá như đây chỉ là một giấc mộng', subtext: 'Thức dậy anh vẫn vòng tay ôm chặt, chẳng có cách xa đâu' },
        { id: 'x7', timeSec: 86, text: 'Chẳng sợ phải đợi anh thật lâu người em thương nhất', subtext: 'Chẳng biết bao lâu, bao lâu, thật ra là bao lâu' },
        { id: 'x8', timeSec: 102, text: 'Đến khi chờ đợi là thói quen, dù thời gian đáng ghét', subtext: 'Cũng chẳng nghĩa lý gì, làm yêu chỉ thêm yêu ✨' },
      ],
    },
    {
      id: 'day-toi-cach-yeu',
      title: 'Dạy Tôi Cách Yêu',
      artist: 'tlinh',
      audioUrl: '/audio/day-toi-cach-yeu.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 'd1', timeSec: 10, text: 'Tôi vẫn luôn okay một mình, không phù hợp với đôi ba cuộc tình', subtext: 'Điều gì đến kệ vạn sự tùy duyên, để sở hữu ai tôi vốn đâu có quyền' },
        { id: 'd2', timeSec: 18, text: 'Tôi vẫn luôn okay một mình, không giỏi cho đi, chỉ ích kỷ nên thực tình', subtext: 'Tôi không muốn phải dựa vào ai, và càng không muốn treat someone sai' },
        { id: 'd3', timeSec: 26, text: 'Nên là tình yêu tôi nói không, không thích cảm giác phải nhớ mong', subtext: 'Tôi không muốn trói buộc ai trong một mớ hỗn độn' },
        { id: 'd4', timeSec: 38, text: 'Mà rồi đến cuối tất cả cũng rồi sẽ lộn xộn...', subtext: 'Nên là anh ơi nếu có thích tôi, xin anh rời xa vì lát nữa thôi' },
        { id: 'd5', timeSec: 50, text: "Somebody tell me how to love? I'd be faithful than ever", subtext: "Just tell me how to treat somebody right, I'd be grateful than ever" },
        { id: 'd6', timeSec: 68, text: 'Tình yêu vốn đâu có luật lệ, nhưng nếu tôi có liệu anh có mặc kệ bỏ qua?', subtext: 'Không muốn nghe những hứa hẹn, những lời thề, không muốn chỉ là một người thay thế' },
        { id: 'd7', timeSec: 82, text: 'Xin hãy dạy tôi biết thế nào là yêu...', subtext: 'Đừng lại rời xa để tôi mới biết mình đang yêu ❤️' },
      ],
    },
    {
      id: 'the-gioi-mat-di-nguoi-co-don',
      title: 'Và Thế Giới Đã Mất Đi Một Người Cô Đơn',
      artist: 'Marzuz ft. Gill & Onionn',
      audioUrl: '/audio/the-gioi-mat-di-nguoi-co-don.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 'v1', timeSec: 12, text: 'Nhẹ nhàng một chiếc hôn, vùi mình trong đám mây đang trôi lả lướt...', subtext: 'Nhẹ nhàng đôi mắt anh chìm vào cùng nắng mai đang rơi giọt trên tóc em phiêu bồng' },
        { id: 'v2', timeSec: 24, text: 'Để lại những dấu yêu vấn vương ngày ta đến bên nhau', subtext: 'Nhẹ nhàng những câu ca em dành tặng anh...' },
        { id: 'v3', timeSec: 36, text: 'Và thế giới đã mất đi một người cô đơn!', subtext: 'Vì giờ đã có anh để em được yêu thương nhiều hơn' },
        { id: 'v4', timeSec: 48, text: 'Và thế giới đã mất đi một người cô đơn (cô đơn)...', subtext: 'Giờ đây mất đi hai trái tim lẻ loi' },
        { id: 'v5', timeSec: 60, text: 'Và cứ thế ánh mắt trao nhau, và cứ thế trái đất chầm chậm trôi', subtext: 'Và cứ thế tiếng yêu ngần ngại, trái tim miệt mài thầm nhớ thương hình bóng ai' },
        { id: 'v6', timeSec: 76, text: 'Đã có những lúc cô đơn một mình lang thang giữa bao vô tình...', subtext: 'Và rồi anh đã đến ôm lấy trái tim đơn côi ❤️' },
      ],
    },
    {
      id: 'bao-loi-con-chua-noi',
      title: 'Bao Lời Con Chưa Nói',
      artist: 'Anh Trai Say Hi (Dương Domic, Anh Tú Atus, Song Luân, Quang Trung, Anh Tú)',
      audioUrl: '/audio/bao-loi-con-chua-noi.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 'b0', timeSec: 0, text: 'Ầu ơ ví dầu cầu ván đóng đinh, cầu tre lắt lẻo gập ghềnh khó đi...', subtext: 'Khó đi mẹ dắt con đi, con thi trường học, mẹ thi trường đời...' },
        { id: 'b1', timeSec: 15, text: 'Cỗ máy thời gian đưa con trở về những tháng ngày chưa lo toan bộn bề...', subtext: 'Ngày được nghe tiếng hát du dương từ một người nhỏ bé nhưng phi thường' },
        { id: 'b2', timeSec: 28, text: 'Trưởng thành cùng với những yêu thương, yêu thương khi bên mẹ', subtext: 'Ước ta được ngồi cùng chuyện trò thật lâu, giống hai người bạn để trái tim nhẹ nhàng' },
        { id: 'b3', timeSec: 42, text: 'Nếu không là mẹ con không làm được đâu, chẳng ai bằng mẹ...', subtext: 'Chẳng có, chẳng có ai bằng mẹ...' },
        { id: 'b4', timeSec: 54, text: 'Mình thật là nhỏ bé giữa thế giới bao la, càng thật sự nhỏ bé khi trở về nhà', subtext: 'Mẹ dặn: Mày phải luôn ăn no, tự biết chăm lo, gầy thì đừng về nhà...' },
        { id: 'b5', timeSec: 68, text: 'Bao lời con chưa nói, nhưng thật ra con yêu mẹ nhiều!', subtext: 'Bao lời con chưa nói, xin mang hết đưa vào câu ca' },
        { id: 'b6', timeSec: 82, text: 'Mong thời gian chớ vội để trao cho mẹ bao lời con vẫn còn chưa nói...', subtext: 'Ngàn lời cảm ơn, ngàn lời xin lỗi, xin ngàn lần thứ tha' },
        { id: 'b7', timeSec: 98, text: 'Nếu như thật có những kiếp sống khác, con luôn mơ ước được làm con của mẹ 🌸', subtext: 'Xin được nói: Con yêu mẹ rất nhiều!' },
      ],
    },
    {
      id: 'the-gioi-cua-anh',
      title: 'Thế Giới Của Anh',
      artist: 'buitruonglinh x Dương Domic x CONGB x WEAN',
      audioUrl: '/audio/the-gioi-cua-anh.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 't1', timeSec: 14, text: 'Trở về ngày ôm bao mơ mộng trong tim, thoáng chốc bỗng trở nên lặng im...', subtext: 'Bao ưu phiền, bao vết cắt vẫn hằn sâu' },
        { id: 't2', timeSec: 26, text: 'Để cho anh thấy được lúc ấy, thế giới trong anh tựa như sáng lên...', subtext: 'Khi em vừa đến đây, mang nụ cười dịu dàng sưởi ấm' },
        { id: 't3', timeSec: 40, text: 'Khi anh buông cả thế giới, em mang nụ cười đến với!', subtext: 'Đời anh như mơ, êm đềm như thơ, là em đã sưởi ấm hy vọng trong trái tim anh' },
        { id: 't4', timeSec: 56, text: 'Người ta thường nói khi yêu đời thật nên thơ, vì say màu mắt nhau nên đời đẹp như mơ', subtext: 'Bao muộn phiền ngoài kia cũng xin gác lại sau lưng' },
        { id: 't5', timeSec: 72, text: 'Thế giới của anh nhỏ xinh, và chính là em...', subtext: 'Chúc mừng sinh nhật, cô gái là cả thế giới của anh 💖' },
      ],
    },
    {
      id: 'happy-birthday-acoustic',
      title: 'Khúc Hát Mừng Sinh Nhật',
      artist: 'Phan Đinh Tùng',
      audioUrl: '/audio/happy-birthday-acoustic.mp3',
      tag: 'Bản Chuẩn Zing MP3',
      lyrics: [
        { id: 'hbd1', timeSec: 15, text: 'Ngày hôm nay ta cùng hợp hoan nơi đây...', subtext: 'Ngồi bên nhau ta hát mừng sinh nhật' },
        { id: 'hbd2', timeSec: 23, text: 'Một hai ba ta cùng thổi tắt nến!', subtext: 'Happy birthday, happy birthday to you!' },
        { id: 'hbd3', timeSec: 35, text: 'Ánh nến lung linh thắp sáng bao ước mơ...', subtext: 'Cầu mong tuổi mới của em luôn rạng rỡ niềm vui' },
        { id: 'hbd4', timeSec: 47, text: "On this day all together will be, and we'll all sing for your birthday", subtext: 'One two three we blow up the candles' },
        { id: 'hbd5', timeSec: 63, text: 'Happy birthday, happy birthday to you! Happy birthday, happy birthday to you!', subtext: 'And happy birthday, happy birthday to you! 🎂🎉' },
        { id: 'hbd6', timeSec: 85, text: 'Chúc mừng sinh nhật Thúy An yêu dấu, mãi luôn hạnh phúc và xinh tươi!', subtext: 'Mãi là cô gái đáng yêu và rạng ngời nhất trần gian ❤️' },
      ],
    },
  ],
  questions: [
    {
      id: 'q1',
      question: 'Hôm nay đố Thúy An biết là ngày gì đặc biệt nhất nào?',
      subtitle: 'Chọn câu trả lời trong tim em nhé ✨',
      options: [
        { text: 'Chỉ là một ngày bình thường thôi à?', reaction: 'Ôi sai bét rồi! Hôm nay là ngày siêu trọng đại của Thúy An đó nhen! 😜' },
        { text: 'Ngày sinh nhật của Thúy An - người xinh đẹp nhất quả đất!', reaction: 'Chuẩn 1000 điểm luôn! Chính là sinh nhật của Thúy An đó! 🎉', isSuperSweet: true },
        { text: 'Ngày anh yêu Thúy An nhiều hơn hôm qua', reaction: 'Cũng đúng lắm nè, nhưng còn một điều kỳ diệu hơn nữa! ❤️', isSuperSweet: true }
      ]
    },
    {
      id: 'q2',
      question: 'Ai là người sở hữu nụ cười toả nắng làm tim anh đập rộn ràng nhất?',
      subtitle: 'Nghĩ kỹ xem nào cô nương ơi...',
      options: [
        { text: 'Chính là Thúy An chứ còn ai vào đây nữa!', reaction: 'Chính xác! Nụ cười của Thúy An là ánh sáng của đời anh! 💖', isSuperSweet: true },
        { text: 'Chắc là một hoa hậu phương nào đó?', reaction: 'Hoa hậu cũng phải chào thua nụ cười của Thúy An nha! 🌸' },
        { text: 'Cô gái tên Thúy An đang đọc những dòng này nè', reaction: 'Bingo! Đáng yêu không lối thoát luôn! 🥰', isSuperSweet: true }
      ]
    },
    {
      id: 'q3',
      question: 'Ước nguyện lớn nhất của Thúy An trong tuổi mới này là gì?',
      subtitle: 'Vũ trụ đang lắng nghe tâm tư của em đó...',
      options: [
        { text: 'Luôn luôn bình an, vui vẻ và rực rỡ', reaction: 'Chắc chắn vũ trụ và anh sẽ luôn chở che cho Thúy An! ✨', isSuperSweet: true },
        { text: 'Ăn mãi không mập, shopping thả ga!', reaction: 'Haha duyệt liền! Anh tài trợ tinh thần hết mình! 🛍️' },
        { text: 'Bên nhau thật lâu và cùng đi khắp thế gian', reaction: 'Lời ước này anh xin được thực hiện cả đời cùng Thúy An! 💍', isSuperSweet: true }
      ]
    },
    {
      id: 'q4',
      question: 'Thúy An đã sẵn sàng bước vào thế giới ngập tràn pháo hoa & quà sinh nhật chưa?',
      subtitle: 'Hít một hơi thật sâu nào!',
      options: [
        { text: 'Dạ sẵn sàng 100%! Mở ra ngay đi ạ! 🚀', reaction: 'Đi thôi nào! Cánh cổng sinh nhật chính thức khai mở! 🎆', isSuperSweet: true },
        { text: 'Hồi hộp quá, không biết có bất ngờ gì ta?', reaction: 'Bật mí là ngọt ngào đến tan chảy luôn! Bắt đầu nào! 🎁', isSuperSweet: true }
      ]
    }
  ],

  // ==========================================================================
  // 📸 DANH SÁCH ẢNH KỶ NIỆM (16 ẢNH):
  // Khi bạn tải code về máy tính, chỉ cần thay link bên dưới thành:
  // url: '/images/photo1.jpg', url: '/images/photo2.jpg', v.v...
  // (Nhớ bỏ file ảnh vào thư mục public/images/)
  // ==========================================================================
  photos: [
    { id: 'p1', url: '/images/photo1.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p2', url: '/images/photo2.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p3', url: '/images/photo3.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p4', url: '/images/photo4.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p5', url: '/images/photo5.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p6', url: '/images/photo6.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p7', url: '/images/photo7.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p8', url: '/images/photo8.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p9', url: '/images/photo9.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p10', url: '/images/photo10.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p11', url: '/images/photo11.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p12', url: '/images/photo2.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p13', url: '/images/photo3.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p14', url: '/images/photo4.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p15', url: '/images/photo5.jpg', caption: 'Người yêu xinh của PCT' },
    { id: 'p16', url: '/images/photo6.jpg', caption: 'Người yêu xinh của PCT' },
  ]
};
