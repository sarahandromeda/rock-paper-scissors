// Intro animation with stop
const intro = document.querySelector(".intro");

const hideIntro = function () {
    intro.classList.toggle("hide");
};

intro.addEventListener("click", hideIntro);

intro.addEventListener("transitionend", () => {
    intro.removeEventListener("click", hideIntro);
    }
);