let headerPrev = document.querySelector("#headerPrev");
let headerNext = document.querySelector("#headerNext");

let headerIndexNum = document.querySelectorAll(".heading-track_item-num");
let headingText = document.querySelectorAll(".heading-text");


let textStyle = "transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); opacity: 1; transform-style: preserve-3d;"
let currentId = 1; // 1,2,3

const updateHeaderIndexNum = () => {
    headerIndexNum.forEach(headerIndexNumEl => {
        if (headerIndexNumEl.classList.contains("heading-track_item-num_active")) headerIndexNumEl.classList.remove("heading-track_item-num_active");
    })
    headerIndexNum[currentId - 1].classList.add("heading-track_item-num_active");
}

const updateText = () => {
    letNewText = ["Seaside", `<span class="text-span">Horizon</span>`, "Vila"];
    for (let i = 0; i <= 3; i++) {
        headingText[i].style = "";
        if (headingText[i].classList.contains("text-anim")) headingText[i].classList.remove("text-anim");
        headingText[i].classList.add(`text-anim${i+1}`);
        headingText[i].innerHTML = letNewText[i];

    }
}

headerNext.addEventListener("click", () => {
    if (currentId >= 3) currentId = 1;
    else currentId++;
    updateHeaderIndexNum();
    updateText();
})

headerPrev.addEventListener("click", () => {
    if (currentId <= 1) currentId = 3;
    else currentId--;
    updateHeaderIndexNum();
})

