var languageName = 'Арабский';

var features = {
  direction: 'right',
  begin: true,
  middle: true,
  end: true
};

var letters = [
  {selfName: 'أَلِف‎', name: '’алиф', single: '1_s.gif', begin: '1_b.gif', middle: '1_m.gif', end: '1_e.gif', sound: '1.mp3', transcription: '/ʔ/ / /aː/ (/u/, /i/)'},
  {selfName: 'بَاء‎', name: 'ба̄’', single: '2_s.gif', begin: '2_b.gif', middle: '2_m.gif', end: '2_e.gif', sound: '2.mp3', transcription: '/b/'},
  {selfName: 'تَاء‎', name: 'та̄’', single: '3_s.gif', begin: '3_b.gif', middle: '3_m.gif', end: '3_e.gif', sound: '3.mp3', transcription: '/t/'},
  {selfName: 'ثَاء‎', name: 'с̱а̄’', single: '4_s.gif', begin: '4_b.gif', middle: '4_m.gif', end: '4_e.gif', sound: '4.mp3', transcription: '/θ/'},
  {selfName: 'جِيم‎', name: 'джӣм', single: '5_s.gif', begin: '5_b.gif', middle: '5_m.gif', end: '5_e.gif', sound: '5.mp3', transcription: '/d͡ʒ/'},
  {selfName: 'حَاء‎', name: 'х̣а̄’', single: '6_s.gif', begin: '6_b.gif', middle: '6_m.gif', end: '6_e.gif', sound: '6.mp3', transcription: '/ħ/'},
  {selfName: 'خَاء‎', name: 'х̮а̄’', single: '7_s.gif', begin: '7_b.gif', middle: '7_m.gif', end: '7_e.gif', sound: '7.mp3', transcription: '/χ/'},
  {selfName: 'دَال‎', name: 'да̄ль', single: '8_s.gif', begin: '8_b.gif', middle: '8_m.gif', end: '8_e.gif', sound: '8.mp3', transcription: '/d/'},
  {selfName: 'ذَال‎', name: 'з̱а̄ль', single: '9_s.gif', begin: '9_b.gif', middle: '9_m.gif', end: '9_e.gif', sound: '9.mp3', transcription: '/ð/'},
  {selfName: 'رَاء‎', name: 'ра̄’', single: '10_s.gif', begin: '10_b.gif', middle: '10_m.gif', end: '10_e.gif', sound: '10.mp3', transcription: '/r/'},
  {selfName: 'زَاي‎', name: 'за̄й', single: '11_s.gif', begin: '11_b.gif', middle: '11_m.gif', end: '11_e.gif', sound: '11.mp3', transcription: '/z/'},
  {selfName: 'سِين‎', name: 'сӣн', single: '12_s.gif', begin: '12_b.gif', middle: '12_m.gif', end: '12_e.gif', sound: '12.mp3', transcription: '/s/'},
  {selfName: 'شِين‎', name: 'шӣн', single: '13_s.gif', begin: '13_b.gif', middle: '13_m.gif', end: '13_e.gif', sound: '13.mp3', transcription: '/ʃ/'},
  {selfName: 'صَاد‎', name: 'с̣а̄д', single: '14_s.gif', begin: '14_b.gif', middle: '14_m.gif', end: '14_e.gif', sound: '14.mp3', transcription: '/sˁ/'},
  {selfName: 'ضَاد‎', name: 'д̣а̄д', single: '15_s.gif', begin: '15_b.gif', middle: '15_m.gif', end: '15_e.gif', sound: '15.mp3', transcription: '/dˁ/'},
  {selfName: 'طَاء‎', name: 'т̣а̄’', single: '16_s.gif', begin: '16_b.gif', middle: '16_m.gif', end: '16_e.gif', sound: '16.mp3', transcription: '/tˁ/'},
  {selfName: 'ظَاء‎', name: 'з̣а̄’', single: '17_s.gif', begin: '17_b.gif', middle: '17_m.gif', end: '17_e.gif', sound: '17.mp3', transcription: '/ðˁ/'},
  {selfName: 'عَيْن‎', name: '‘айн', single: '18_s.gif', begin: '18_b.gif', middle: '18_m.gif', end: '18_e.gif', sound: '18.mp3', transcription: '/ʕ/'},
  {selfName: 'غَيْن‎', name: 'гайн', single: '19_s.gif', begin: '19_b.gif', middle: '19_m.gif', end: '19_e.gif', sound: '19.mp3', transcription: '/ʁ/'},
  {selfName: 'فَاء‎', name: 'фа̄’', single: '20_s.gif', begin: '20_b.gif', middle: '20_m.gif', end: '20_e.gif', sound: '20.mp3', transcription: '/f/'},
  {selfName: 'قَاف‎', name: 'к̣а̄ф', single: '21_s.gif', begin: '21_b.gif', middle: '21_m.gif', end: '21_e.gif', sound: '21.mp3', transcription: '/q/'},
  {selfName: 'كَاف‎', name: 'ка̄ф', single: '22_s.gif', begin: '22_b.gif', middle: '22_m.gif', end: '22_e.gif', sound: '22.mp3', transcription: '/k/'},
  {selfName: 'لاَم‎', name: 'ля̄м', single: '23_s.gif', begin: '23_b.gif', middle: '23_m.gif', end: '23_e.gif', sound: '23.mp3', transcription: '/l/'},
  {selfName: 'مِيم‎', name: 'мӣм', single: '24_s.gif', begin: '24_b.gif', middle: '24_m.gif', end: '24_e.gif', sound: '24.mp3', transcription: '/m/'},
  {selfName: 'نُون‎', name: 'нӯн', single: '25_s.gif', begin: '25_b.gif', middle: '25_m.gif', end: '25_e.gif', sound: '25.mp3', transcription: '/n/'},
  {selfName: 'هَاء‎', name: 'ха̄’', single: '26_s.gif', begin: '26_b.gif', middle: '26_m.gif', end: '26_e.gif', sound: '26.mp3', transcription: '/h/'},
  {selfName: 'وَاو‎', name: 'ва̄в', single: '27_s.gif', begin: '27_b.gif', middle: '27_m.gif', end: '27_e.gif', sound: '27.mp3', transcription: '/w/ / /uː/'},
  {selfName: 'يَاء‎', name: 'йа̄’', single: '28_s.gif', begin: '28_b.gif', middle: '28_m.gif', end: '28_e.gif', sound: '28.mp3', transcription: '/j/ / /iː/'},
];