const classicURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/",
  lolURL = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/",
  classicImgs = [
    "d/d5/Playing_card_heart_2.svg/819px-Playing_card_heart_2",
    "5/59/Playing_card_diamond_2.svg/819px-Playing_card_diamond_2",
    "5/52/Playing_card_spade_3.svg/1200px-Playing_card_spade_3",
    "6/6b/Playing_card_club_3.svg/819px-Playing_card_club_3",
    "a/a2/Playing_card_heart_4.svg/819px-Playing_card_heart_4",
    "2/2c/Playing_card_spade_4.svg/1200px-Playing_card_spade_4",
    "9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5",
    "5/50/Playing_card_club_5.svg/1200px-Playing_card_club_5",
    "8/80/Playing_card_diamond_6.svg/819px-Playing_card_diamond_6",
    "d/d2/Playing_card_spade_6.svg/1200px-Playing_card_spade_6",
    "9/94/Playing_card_heart_7.svg/819px-Playing_card_heart_7",
    "4/4b/Playing_card_club_7.svg/819px-Playing_card_club_7",
    "5/50/Playing_card_heart_8.svg/1200px-Playing_card_heart_8",
    "7/78/Playing_card_diamond_8.svg/1200px-Playing_card_diamond_8",
    "e/e0/Playing_card_spade_9.svg/1200px-Playing_card_spade_9",
    "2/27/Playing_card_club_9.svg/819px-Playing_card_club_9",
    "d/d3/Playing_card_diamond_A.svg/1200px-Playing_card_diamond_A",
    "5/57/Playing_card_heart_A.svg/1200px-Playing_card_heart_A",
  ],
  lolImgs = [
    "Annie",
    "Braum",
    "Corki",
    "Diana",
    "Fizz",
    "Gnar",
    "Heimerdinger",
    "Irelia",
    "Jax",
    "Katarina",
    "Leona",
    "Neeko",
    "Rammus",
    "Syndra",
    "Teemo",
    "Vayne",
    "Yasuo",
    "Zoe",
  ];

export const cardImgs = {
  Classic: {
    front: classicImgs.map((val) => {
      return classicURL + val + ".svg.png";
    }),
    back:
      "https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg",
  },
  "LoL Champions": {
    front: lolImgs.map((val) => {
      return lolURL + val + "_0.jpg";
    }),
    back:
      "https://static.wikia.nocookie.net/leagueoflegends/images/2/2d/LoR_Summoner%27s_Rift_Order_Card_Back.png",
  },
};
