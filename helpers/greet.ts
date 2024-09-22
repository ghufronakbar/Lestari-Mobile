interface Greet {
  time: string;
  first: string;
  second: string;
}

const now = new Date();
let greet: Greet;
if (now.getHours() < 12) {
  greet = {
    time: "Selamat Pagi",
    first: "Semangat Beraktivitas",
    second: "Kawan!",
  };
} else if (now.getHours() < 15) {
  greet = {
    time: "Selamat Siang",
    first: "Waktunya Mendata",
    second: "Satwa!",
  };
} else if (now.getHours() < 18) {
  greet = {
    time: "Selamat Sore",
    first: "Semoga Harimu",
    second: "Menyenangkan!",
  };
} else {
  greet = {
    time: "Selamat Malam",
    first: "Jangan Lupa",
    second: "Istirahat!",
  };
}

export default greet;
