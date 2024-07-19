const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

var arr = [0.8,0.81,0.82,0.83,0.84,0.85,0.86,0.87,0.88,0.89,0.9,0.91,0.92,0.93,0.94,0.95,0.96,0.97,0.98,0.99,1,1.2,1.3,1.4,1.5,1.6,1.7,1.8]

var random = ()=>{
  var item = document.querySelectorAll(".circle-item");
  item.forEach((i)=>{
    gsap.to(i, {
      scale: arr[Math.floor(Math.random() * arr.length)],
      duration: 0.8,
      ease: "elastic.out(1.2, 0.2)",
    });
  })
}
gsap.to(".circle-img", {
  x: "-63.252%",
  duration: 10,
  repeat: -1,
  ease: "none",
  onRepeat: random,
});
random()