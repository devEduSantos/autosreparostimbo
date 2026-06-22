document.querySelectorAll(".img-box").forEach(container => {
  const before = container.querySelector(".img-before");
  const slider = container.querySelector(".slider");

  let isDragging = false;

  // POSIÇÃO INICIAL
  let start = 50;
  before.style.width = start + "%";
  slider.style.left = start + "%";

  const move = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;

    before.style.width = percent + "%";
    slider.style.left = percent + "%";
  };

  // ===== MOUSE =====
  slider.addEventListener("mousedown", () => {
    isDragging = true;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    move(e.clientX);
  });

  // ===== TOUCH (CORRIGIDO) =====
  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    e.preventDefault(); // 🔥 ESSENCIAL
    move(e.touches[0].clientX);
  }, { passive: false });

});

const track = document.querySelector(".carousel-track");

// DUPLICA OS CARDS PRA LOOP INFINITO
track.innerHTML += track.innerHTML;

// anima entrada suave
const contatoFinal = document.querySelector(".contato-final");

window.addEventListener("scroll", () => {
  const top = contatoFinal.getBoundingClientRect().top;

  if (top < window.innerHeight - 100) {
    contatoFinal.style.opacity = "1";
    contatoFinal.style.transform = "translateY(0)";
  }
});

document.querySelectorAll(".video-card").forEach(card => {
  const video = card.querySelector("video");

  // autoplay no hover
  card.addEventListener("mouseenter", () => {
    video.play();
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  // clique = abrir fullscreen
  card.addEventListener("click", () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  });
}); 