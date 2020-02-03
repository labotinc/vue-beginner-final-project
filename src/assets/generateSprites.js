const fs = require("fs");
const Spritesmith = require("spritesmith");

// generate spritesheet

const fall = [
  __dirname + "/monster/fall_back_1.png",
  __dirname + "/monster/fall_back_2.png",
  __dirname + "/monster/fall_back_3.png",
  __dirname + "/monster/fall_back_4.png",
  __dirname + "/monster/fall_back_5.png"
];

const hit = [
  __dirname + "/monster/hit_1.png",
  __dirname + "/monster/hit_2.png",
  __dirname + "/monster/hit_3.png"
];

const stand = [
  __dirname + "/monster/stand_up_1.png",
  __dirname + "/monster/stand_up_2.png",
  __dirname + "/monster/stand_up_3.png",
  __dirname + "/monster/stand_up_4.png",
  __dirname + "/monster/stand_up_5.png"
];

const smith = new Spritesmith();

smith.createImages(fall, (error, images) => {
  if (error) {
    throw error;
  }

  const result = smith.processImages(images, { algorithm: "left-right" });

  result.image.pipe(fs.createWriteStream(__dirname + "/monster/monster_fall.png"));
});
