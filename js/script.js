let headerPrev = document.querySelector("#headerPrev");
let headerNext = document.querySelector("#headerNext");

let headerIndexNum = document.querySelectorAll(".heading-track_item-num");
let headingText = document.querySelectorAll(".heading-text");


let countersContainer = document.querySelector(".stats")
let counters = document.querySelectorAll(".stats-number")

let counterActivated = false;
let counterTargets = [20, 7, 100];


let currentId = 1; // 1,2,3


let headingProjectIds = [0, 4, 3] // id from projects.js array 0-7


const updateHeaderIndexNum = () => {
    headerIndexNum.forEach(headerIndexNumEl => {
        if (headerIndexNumEl.classList.contains("heading-track_item-num_active")) headerIndexNumEl.classList.remove("heading-track_item-num_active");
    })
    headerIndexNum[currentId - 1].classList.add("heading-track_item-num_active");
}

const updateText = () => {
    let newText = projectsJson[headingProjectIds[currentId - 1]]["Name"].split(" ");
    let textSpan = `<span class="text-span">${newText[1]}</span>`;
    newText[1] = textSpan;

    // Promena teksta
    for (let i = 0; i < 3; i++) {
        if (headingText[i]) {
            console.log(headingText[i]);
            // Uklanjanje animacije kako bi je ponovo pokrenuli
            headingText[i].classList.remove(`text-anim${i + 1}`);

            // Moramo da koristimo "reflow" da bi animacija ponovo počela
            void headingText[i].offsetWidth; // Ovo je trik za reflow (resetovanje stila)

            // Dodavanje nove animacije
            headingText[i].classList.add(`text-anim${i + 1}`);

            // Promena sadržaja
            headingText[i].innerHTML = newText[i];
        } else {
            console.log(`Element na poziciji ${i} nije pronađen!`);
        }
    }

    // Promena pozadinske slike
    const headerWrapper = document.querySelector('.header-wrapper');
    const projectImage = projectsJson[headingProjectIds[currentId - 1]]["CoverImage"];  // Pretpostavljam da u JSON-u imaš URL slike

    if (headerWrapper && projectImage) {
        // Dodajemo klasu za animaciju pozadinske slike
        headerWrapper.classList.add('image-change-animation');

        // Menjamo pozadinsku sliku
        headerWrapper.style.backgroundImage = `url(${projectImage})`;
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
    updateText();
})

const setId = (id) => {
    currentId = id;
    updateHeaderIndexNum();
    updateText();
}



window.addEventListener("scroll", () => {
    if (pageYOffset > countersContainer.offsetTop - countersContainer.offsetHeight - 500 && !counterActivated) {
        counters.forEach(counter => {
            //counter.innerText = 0;
            let count = 0;
            let target = parseInt(counter.innerText);
            const updateCount = () => {
                console.log("target: " + target)

                if (count < target) {
                    count++;
                    counter.innerText = count;
                    setTimeout(updateCount, counter>25?125:55);
                } else {
                    count.innerText = target;
                }
            }
            updateCount();
            counterActivated = true;

        })
    }
})