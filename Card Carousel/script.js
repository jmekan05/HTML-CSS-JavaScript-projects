const songNames = [
    {name: "I Lay My Love on You", singer: "Westlife"},
    {name: "My Love", singer: "Westlife"},
    {name: "Tell Your Friends", singer: "Liam Payne"},
    {name: "You and I", singer: "One Direction"},
    {name: "Strong", singer: "One Direction"},
    {name: "Remember", singer: "Liam Payne"},
    {name: "One Thing", singer: "One Direction"},
    {name: "Black and White", singer: "Niall Horan"},
    {name: "What Makes You Beautiful", singer: "One Direction"},
    {name: "Drag Me Down", singer: "One Direction"}
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const songName = document.querySelector(".song-name");
const singerName = document.querySelector(".singer-name");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;
        card.className = "card";

        if (offset === 0) card.classList.add("center");
        else if (offset === 1) card.classList.add("right-1");
        else if (offset === 2) card.classList.add("right-2");
        else if (offset === cards.length - 1) card.classList.add("left-1");
        else if (offset === cards.length - 2) card.classList.add("left-2");
        else card.classList.add("hidden");
    });

    dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === currentIndex)
    );

    songName.style.opacity = singerName.style.opacity = "0";
    setTimeout(() => {
        songName.textContent = songNames[currentIndex].name;
        singerName.textContent = songNames[currentIndex].singer;
        songName.style.opacity = singerName.style.opacity = "1";
    }, 300);

    setTimeout(() => (isAnimating = false), 800);
}

[leftArrow, rightArrow].forEach((arrow, idx) => {
    arrow.addEventListener("click", () =>
        updateCarousel(currentIndex + (idx ? 1 : -1))
    );
});

dots.forEach((dot, i) =>
    dot.addEventListener("click", () => updateCarousel(i))
);

cards.forEach((card, i) =>
    card.addEventListener("click", () => updateCarousel(i))
);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
});

let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50)
        updateCarousel(currentIndex + (diff > 0 ? 1 : -1));
});

updateCarousel(0);
