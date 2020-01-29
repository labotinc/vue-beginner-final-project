const fs = require("fs");
const Spritesmith = require("spritesmith");

// generate spritesheet
const attack1 = [
  __dirname + "/warrior/attack1_1.png",
  __dirname + "/warrior/attack1_2.png",
  __dirname + "/warrior/attack1_3.png",
  __dirname + "/warrior/attack1_4.png",
  __dirname + "/warrior/attack1_5.png",
  __dirname + "/warrior/attack1_6.png"
];

const attack2 = [
  __dirname + "/warrior/attack4_1.png",
  __dirname + "/warrior/attack4_2.png",
  __dirname + "/warrior/attack4_3.png",
  __dirname + "/warrior/attack4_4.png",
  __dirname + "/warrior/attack4_5.png",
  __dirname + "/warrior/attack4_6.png"
];

const fall = [
  __dirname + "/warrior/fall_back_1.png",
  __dirname + "/warrior/fall_back_2.png",
  __dirname + "/warrior/fall_back_3.png",
  __dirname + "/warrior/fall_back_4.png",
  __dirname + "/warrior/fall_back_5.png"
];

const hit = [
  __dirname + "/warrior/hit_1.png",
  __dirname + "/warrior/hit_2.png",
  __dirname + "/warrior/hit_3.png"
];

const stand = [
  __dirname + "/warrior/stand_up_1.png",
  __dirname + "/warrior/stand_up_2.png",
  __dirname + "/warrior/stand_up_3.png",
  __dirname + "/warrior/stand_up_4.png",
  __dirname + "/warrior/stand_up_5.png"
];

const smith = new Spritesmith();

smith.createImages(attack2, (error, images) => {
  if (error) {
    throw error;
  }

  const result = smith.processImages(images, { algorithm: "left-right" });

  result.image.pipe(fs.createWriteStream(__dirname + "/warrior/warrior_attack2_right.png"));
});
