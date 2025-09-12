/* ===== Reviews Data (15 people) ===== */
const reviews = [
  {
    name: "Robin",
    text:
      "The flower I got from this website were absolutely stunning! They were so fresh and beautiful arranged, and you could tell they were put together with care. The delivery was also super quick. I'm so happy with my purchase and will definitely be ordering fron here again.",
    stars: 4,
    img: "/image/Gi.jpg"
  },
  {
    name: "Ton",
    text:
      "I like so much this website because I love the flowers. Then I usually order from this website. The flowers are so fresh and romantic. When I want to give someone for present, I always order from only this website. But this website is a few late for order. ",
    stars: 5,
    img: "/image/Ton.jpg"
  },
  {
    name: "Cursa",
    text:
      "It's very good to buy from this website. The flowers are neatly arranged and the prices are not too high.They care about the customer and the service is good. You can get a variety of flowers from this website and the flowers are fresh.",
    stars: 5,
    img: "/image/Cursa.jpg"
  },
  {
    name: "Be Be",
    text:
      "I am absolutely delighted with the flowers I ordered! They arrived fresh, beautifully arranged, and on time. The vibrant colors and long-lasting quality made my special occasion even more memorable. The delivery was quick, and the customer service was very helpful and polite. ",
    stars: 5,
    img: "/image/Be Be.jpg"
  },
  {
    name: "Iris",
    text:
      "I recently ordered a bouquet from this flower website, and I couldn’t be happier with my experience. The flowers arrived fresh and beautifully arranged, exactly as pictured. The roses had a sweet, delicate fragrance that filled the room, while the lilies added a soft, refreshing scent. ",
    stars: 5,
    img: "/image/Iris.jpg"
  },
  {
    name: "Vivian",
    text:
      "This flower Shop is a true gem, offering a stunning array of fresh flowers and unique arrangements that brighten any occasion. While their selection is top-notch, the prices can be a bit steep, making it a special treat rather than a regular stop. ",
    stars: 4,
    img: "/image/Vivian.jpg"
  },
  {
    name: "Nie",
    text:
      "This flower shop exceeded my expectations! The arrangement was stunning and the flowers were incredibly fresh. I appreciated the attention to detail and the prompt delivery. I will definitely be ordering from here again!",
    stars: 5,
    img: "/image/Nie.jpg"
  },
  
];

/* ===== DOM ===== */
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const starsEl = document.getElementById("stars");
const avatarEl = document.getElementById("avatar");

let index = 0;

/* Render one slide */
function render(i) {
  const r = reviews[i];
  nameEl.textContent = r.name;
  textEl.textContent = r.text;

  // Stars
  starsEl.innerHTML = "";
  for (let k = 0; k < r.stars; k++) {
    const s = document.createElement("span");
    starsEl.appendChild(s);
  }

  // Avatar: Image 
  avatarEl.innerHTML = `<img src="${r.img}" alt="${r.name}">`;
}


/* Helpers */
function initials(fullname){
  return fullname
    .split(" ")
    .filter(Boolean)
    .slice(0,2)
    .map(w => w[0].toUpperCase())
    .join("");
}

/* Nav handlers */
function prev(){ index = (index - 1 + reviews.length) % reviews.length; render(index); }
function next(){ index = (index + 1) % reviews.length; render(index); }

document.querySelector(".prev").addEventListener("click", prev);
document.querySelector(".next").addEventListener("click", next);

/* Keyboard support */
window.addEventListener("keydown", (e)=>{
  if(e.key === "ArrowLeft") prev();
  if(e.key === "ArrowRight") next();
});

/* Init */
render(index);
