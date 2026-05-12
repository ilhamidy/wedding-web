/* =========================
   SCRIPT.JS
========================= */

/* =========================
   AOS ANIMATION
========================= */

/*
  Menjalankan AOS setelah seluruh
  halaman, gambar, dan asset selesai load
  agar animasi lebih stabil
*/

window.addEventListener(
  "load",
  ()=>{

    AOS.init({

      duration:1200,

      once:false

    });

  }
);

/* =========================
   OPENING SCREEN
========================= */

/*
  Mengambil element opening,
  main content, tombol buka,
  dan audio music
*/

const opening =
document.getElementById(
  "opening"
);

const mainContent =
document.getElementById(
  "mainContent"
);

const openInvitation =
document.getElementById(
  "openInvitation"
);

const music =
document.getElementById(
  "music"
);

/* =========================
   OPEN INVITATION
========================= */

/*
  Ketika tombol buka undangan diklik:
  - opening fade out
  - main content muncul
  - music otomatis play
  - refresh AOS
*/

if(openInvitation){

  openInvitation.addEventListener(
  "click",

  async ()=>{

    /* Fade opening */

    opening.style.opacity =
    "0";

    opening.style.pointerEvents =
    "none";

    setTimeout(()=>{

      /* Hide opening */

      opening.style.display =
      "none";

      /* Show main content */

      mainContent.classList.add(
        "show"
      );

      /* Show navbar */

      document.querySelector(
        ".floating-nav"
      )?.classList.add("show");

      document.querySelector(
        ".floating-nav-mobile"
      )?.classList.add("show");

      /* Show music button */

      document.querySelector(
        ".music-btn"
      )?.classList.add("show");

      /* Refresh AOS */

      AOS.refresh();

    },1200);

    /* Play music */

    try{

      await music.play();

    }catch(err){

      console.log(err);

    }

  }
);

}

/* =========================
   MUSIC BUTTON
========================= */

/*
  Toggle play / pause music
  sekaligus mengganti icon
*/

const musicBtn =
document.getElementById(
  "musicBtn"
);

const musicIcon =
document.getElementById(
  "musicIcon"
);

if(musicBtn){

  musicBtn.addEventListener(
    "click",
    ()=>{

      if(music.paused){

        /* Play music */

        music.play();

        /* Change icon */

        musicIcon.classList.remove(
          "fa-volume-xmark"
        );

        musicIcon.classList.add(
          "fa-music"
        );

      }else{

        /* Pause music */

        music.pause();

        /* Change icon */

        musicIcon.classList.remove(
          "fa-music"
        );

        musicIcon.classList.add(
          "fa-volume-xmark"
        );

      }

    }
  );

}

/* =========================
   COUNTDOWN WEDDING
========================= */

/*
  Tanggal target acara
*/

const weddingDate =
new Date(
  "May 28, 2026 00:00:00"
).getTime();

/* =========================
   UPDATE COUNTDOWN
========================= */

function updateCountdown(){

  /* Waktu sekarang */

  const now =
  new Date().getTime();

  /* Selisih waktu */

  const distance =
  weddingDate - now;

  /* Hitungan hari */

  const days =
  Math.floor(
    distance /
    (1000 * 60 * 60 * 24)
  );

  /* Hitungan jam */

  const hours =
  Math.floor(
    (
      distance %
      (1000 * 60 * 60 * 24)
    ) /
    (1000 * 60 * 60)
  );

  /* Hitungan menit */

  const minutes =
  Math.floor(
    (
      distance %
      (1000 * 60 * 60)
    ) /
    (1000 * 60)
  );

  /* Hitungan detik */

  const seconds =
  Math.floor(
    (
      distance %
      (1000 * 60)
    ) / 1000
  );

  /* Update HTML */

  document.getElementById(
    "days"
  ).innerHTML = days;

  document.getElementById(
    "hours"
  ).innerHTML = hours;

  document.getElementById(
    "minutes"
  ).innerHTML = minutes;

  document.getElementById(
    "seconds"
  ).innerHTML = seconds;

  /* Jika countdown selesai */

  if(distance < 0){

    clearInterval(
      countdownInterval
    );

    document.getElementById(
      "days"
    ).innerHTML = "0";

    document.getElementById(
      "hours"
    ).innerHTML = "0";

    document.getElementById(
      "minutes"
    ).innerHTML = "0";

    document.getElementById(
      "seconds"
    ).innerHTML = "0";

  }

}

/* Jalankan pertama */

updateCountdown();

/* Update tiap 1 detik */

const countdownInterval =
setInterval(
  updateCountdown,
  1000
);

/* =========================
   PARTICLE LEAF EFFECT
========================= */

/*
  Canvas particle background
*/

const canvas =
document.getElementById(
  "leafCanvas"
);

/*
  Jalankan hanya jika
  canvas tersedia
*/

if(canvas){

  const ctx =
  canvas.getContext("2d");

  /* Canvas size */

  canvas.width =
  window.innerWidth;

  canvas.height =
  window.innerHeight;

  /* Load image */

  const leafImg =
  new Image();

  leafImg.src =
  "assets/leaf-decor.webp";

  /* Particle array */

  let particles = [];

  /* =========================
     PARTICLE CLASS
  ========================= */

  class Particle{

    constructor(){

      this.x =
      Math.random() *
      canvas.width;

      this.y =
      Math.random() *
      canvas.height;

      this.size =
      Math.random() * 35 + 20;

      this.speedY =
      Math.random() * 1 + 0.5;

      this.speedX =
      Math.random() * 0.8 - 0.4;

      this.rotation =
      Math.random() * 360;

    }

    /* Update movement */

    update(){

      this.y +=
      this.speedY;

      this.x +=
      this.speedX;

      this.rotation += 0.2;

      /* Reset particle */

      if(this.y > canvas.height){

        this.y = -100;

        this.x =
        Math.random() *
        canvas.width;

      }

    }

    /* Draw particle */

    draw(){

      ctx.save();

      ctx.translate(
        this.x,
        this.y
      );

      ctx.rotate(
        this.rotation *
        Math.PI / 180
      );

      ctx.globalAlpha =
      0.08;

      ctx.drawImage(
        leafImg,
        -this.size / 2,
        -this.size / 2,
        this.size,
        this.size
      );

      ctx.restore();

    }

  }

  /* =========================
     CREATE PARTICLES
  ========================= */

  for(let i=0;i<25;i++){

    particles.push(
      new Particle()
    );

  }

  /* =========================
     ANIMATE PARTICLES
  ========================= */

  function animate(){

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(
      (particle)=>{

        particle.update();

        particle.draw();

      }
    );

    requestAnimationFrame(
      animate
    );

  }

  animate();

  /* =========================
     RESIZE CANVAS
  ========================= */

  window.addEventListener(
    "resize",
    ()=>{

      canvas.width =
      window.innerWidth;

      canvas.height =
      window.innerHeight;

    }
  );

}