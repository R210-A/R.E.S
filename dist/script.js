const text = "Lingkungan bersih dimulai dari kebiasaan kecil.";
let i = 0;

function typing(){
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing,60);
  }
}
typing();

/* ANIMATION */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
});
document.querySelectorAll(".hidden").forEach(el=>observer.observe(el));

const statSection = document.querySelector("#statistik");

const statObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){

      document.querySelector(".fill1").style.width = "41%";
      document.querySelector(".fill2").style.width = "35%";
      document.querySelector(".fill3").style.width = "52%";

    }
  });
});

if(statSection){
  statObserver.observe(statSection);
}
const intro = document.querySelector("#pengantar");

const introObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelector(".intro-box").style.opacity = "1";
      entry.target.querySelector(".intro-box").style.transform = "translateY(0)";
    }
  });
});

if(intro){
  introObserver.observe(intro);
}
/* DIAGRAM */
const tren = document.querySelector("#tren");

const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){

      document.querySelectorAll(".bar").forEach(bar=>{
        const value = parseFloat(bar.dataset.h);

        // data range kita: 67 - 75
        const min = 67;
        const max = 75;

        // normalisasi ke 0–100%
        const percent = ((value - min) / (max - min)) * 100;

        // biar tidak mentok penuh dan tetap enak dilihat
        const height = 20 + (percent * 2.2);

        bar.style.height = height + "px";
      });

    }
  });
});

if(tren){
  obs.observe(tren);
}
const dampakCards = document.querySelectorAll("#dampak .card");

const dampakObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

dampakCards.forEach(card=>{
  dampakObserver.observe(card);
});
/* QUIZ */

window.addEventListener("load", () => {

const questions = [
{
q: "Apa dampak utama membuang sampah sembarangan?",
options: ["Lingkungan bersih", "Banjir dan penyakit", "Tanah subur", "Udara segar"],
answer: 1
},
{
q: "Sampah organik contohnya adalah...",
options: ["Botol plastik", "Kulit pisang", "Kaleng", "Kaca"],
answer: 1
},
{
q: "UU pengelolaan sampah di Indonesia adalah...",
options: ["UU No. 18 Tahun 2008", "UU No. 5 Tahun 1990", "UU No. 1 Tahun 1945", "UU No. 20 Tahun 2003"],
answer: 0
},
{
q: "Sampah anorganik adalah...",
options: ["Sisa makanan", "Daun kering", "Plastik", "Kulit buah"],
answer: 2
},
{
q: "Tujuan pengelolaan sampah adalah...",
options: ["Mencemari lingkungan", "Menjaga kebersihan", "Menambah sampah", "Mengabaikan aturan"],
answer: 1
}
];

let index = 0;
let score = 0;

const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");

function load(){

const q = questions[index];

progress.innerText = `Soal ${index+1} / ${questions.length}`;

qEl.innerText = q.q;
optEl.innerHTML = "";
feedback.innerText = "";
nextBtn.style.display = "none";

q.options.forEach((opt,i)=>{

const btn = document.createElement("button");
btn.innerText = opt;

btn.onclick = () => {

if(i === q.answer){
feedback.innerText = "✔ Benar!";
score++;
}else{
feedback.innerText = "✖ Salah!";
}

document.getElementById("quizScore").innerText = score;
nextBtn.style.display = "inline-block";

};

optEl.appendChild(btn);

});

}

nextBtn.onclick = () => {

index++;

if(index < questions.length){
load();
}else{
qEl.innerText = "Quiz selesai!";
optEl.innerHTML = "";
feedback.innerText = `Skor akhir: ${score}/${questions.length}`;
nextBtn.style.display = "none";
progress.innerText = "";
}

};

load();

});


/* POLLUTION */
const monitorSection = document.querySelector("#monitor");

const monitorObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){

      const target = 89;
      const duration = 1400;

      const fill = document.querySelector(".monitor-fill");
      const value = document.querySelector("#monitorValue");

      let start = null;

      function animate(t){

        if(!start) start = t;

        const progress = (t - start) / duration;
        const eased = Math.min(progress, 1);

        const current = Math.floor(eased * target);

        // penting: update hanya saat berubah
        if(fill){
          fill.style.width = current + "%";
        }

        if(value){
          value.innerText = current + "%";
        }

        if(eased < 1){
          requestAnimationFrame(animate);
        }

      }

      requestAnimationFrame(animate);

    }
  });
}, { threshold: 0.4 });

if(monitorSection){
  monitorObserver.observe(monitorSection);
}
/* GAME */

const trashItems = document.querySelectorAll(".trash");
const organikBin = document.getElementById("organikBin");
const anorganikBin = document.getElementById("anorganikBin");

let score = 0;

// ======================
// SCORE UPDATE
// ======================
function updateScore(value){
  score += value;
  document.getElementById("score").innerText = score;
}

// ======================
// DRAG START
// ======================
trashItems.forEach(item => {

  item.setAttribute("draggable", true);

  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.className);
    window.draggedItem = item;
  });

});

// ======================
// DROP ENABLE
// ======================
[organikBin, anorganikBin].forEach(bin => {

  bin.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  bin.addEventListener("drop", (e) => {
    e.preventDefault();

    const item = window.draggedItem;
    if(!item) return;

    const isOrganik = item.classList.contains("organik");
    const isAnorganik = item.classList.contains("anorganik");

    if(
      (bin.id === "organikBin" && isOrganik) ||
      (bin.id === "anorganikBin" && isAnorganik)
    ){
      updateScore(1);
    } else {
      updateScore(-1);
    }

    item.remove();
    window.draggedItem = null;

  });

});
/* =========================
   TEAM STAGGER ANIMATION
========================= */

const teamCards = document.querySelectorAll("#inventor .inventor-card");

const teamObserver = new IntersectionObserver((entries)=>{
  entries.forEach((entry, index)=>{

    if(entry.isIntersecting){

      setTimeout(()=>{
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 120);

    }

  });
});

teamCards.forEach(card=>{
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "0.6s ease";
  teamObserver.observe(card);
});


const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

timelineItems.forEach(item=>{
  timelineObserver.observe(item);
});

document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el=>{
    if(el) observer.observe(el);
  });

});


document.addEventListener("DOMContentLoaded", () => {

  const layers = {
    awareness: document.querySelector(".bg-awareness"),
    realization: document.querySelector(".bg-realization"),
    crisis: document.querySelector(".bg-crisis"),
    action: document.querySelector(".bg-action")
  };

  const sections = document.querySelectorAll("section");

  function reset(){
    Object.values(layers).forEach(l => l.classList.remove("active"));
  }

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){

        reset();

        const id = entry.target.id;

        if(id === "data" || id === "comparison"){
          layers.awareness.classList.add("active");
        }

        else if(id === "dampak" || id === "penyebab"){
          layers.realization.classList.add("active");
        }

        else if(id === "timeline" || id === "tren"){
          layers.crisis.classList.add("active");
        }

        else if(id === "aksi"){
          layers.action.classList.add("active");
        }

      }
    });
  },{
    threshold:0.5
  });

  sections.forEach(sec => observer.observe(sec));

});

const brandHeader = document.querySelector(".brand-header");

const brandObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("animate");
    }
  });
},{ threshold:0.3 });

if(brandHeader){
  brandObserver.observe(brandHeader);
}


/* =========================
   DEVICE DETECTION (SAFE)
========================= */
function detectDevice(){
  const width = window.innerWidth;

  let device = "desktop";

  if(width <= 480){
    device = "mobile";
  } 
  else if(width <= 820){
    device = "tablet";
  } 
  else if(width <= 1024){
    device = "small-laptop";
  }

  document.body.setAttribute("data-device", device);
}

window.addEventListener("load", detectDevice);
window.addEventListener("resize", detectDevice);

/* =========================
   SAFE BRAND ANIMATION
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const brandHeader = document.querySelector(".brand-header");

  // kalau tidak ada → STOP (biar tidak error)
  if(!brandHeader) return;

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        brandHeader.classList.add("animate");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(brandHeader);
});