let headerPrev = document.querySelector("#headerPrev");
let headerNext = document.querySelector("#headerNext");


let filterAll = document.querySelector("#filterAll");
let filterBuilding = document.querySelector("#filterBuilding");
let filterInterior = document.querySelector("#filterInterior");
let projectsWrapper = document.querySelector(".latest-project-wrapper");

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
    if (pageYOffset > countersContainer.offsetTop - countersContainer.offsetHeight - 700 && !counterActivated) {
        let count12Counter = 0;
        let counter12Delay = 90;

        function updateCount12() {
            count12Counter++;

            if (count12Counter <= counterTargets[0]) {
                counters[0].innerText = count12Counter;
            } else {
                counters[0].innerText = counterTargets[0];
            }

            if (count12Counter < counterTargets[1]) {
                counters[1].innerText = count12Counter;
            } else {
                counters[1].innerText = counterTargets[1];
            }

            if (count12Counter > 10) counter12Delay = 130;
            if (count12Counter > 16) counter12Delay = 270;


            // Nastavlja se sa setTimeout samo ako brojač nije dostigao ciljeve
            if (count12Counter <= counterTargets[0] || count12Counter < counterTargets[1]) {
                setTimeout(updateCount12, counter12Delay); // Rekurzivni poziv sa delay-em od 100ms
            }
        }

        // Početni poziv za count12Counter
        setTimeout(updateCount12, counter12Delay);


        let count3Counter = 0;
        let delay = 10;

        function updateCounter() {
            count3Counter++;

            if (count3Counter <= counterTargets[2]) {
                counters[2].innerText = count3Counter;
            } else {
                counters[2].innerText = counterTargets[2];
                return; // Prekida rekurziju kada se dostigne cilj
            }

            // Promena delay vrednosti na osnovu broja
            if (count3Counter > 77) delay = 40;
            if (count3Counter > 85) delay = 80;
            if (count3Counter > 93) delay = 110;
            if (count3Counter > 97) delay = 270;

            // Poziva se ponovo sa delay vrednošću
            setTimeout(updateCounter, delay);
        }

        // Pokreće početnu funkciju
        setTimeout(updateCounter, delay);

        counterActivated = true;

    }
})


const updateProjectFilters = (filter) => {
    console.log(filter);

    // Dodavanje ili uklanjanje aktivnih klasa na osnovu filtera
    if (filter === "all") filterAll.classList.add("link-active");
    else filterAll.classList.remove("link-active");

    if (filter === "building") filterBuilding.classList.add("link-active");
    else filterBuilding.classList.remove("link-active");

    if (filter === "interior") filterInterior.classList.add("link-active");
    else filterInterior.classList.remove("link-active");

    // Filtriranje projekata na osnovu filtera
    let filteredProjects = [];
    if (filter === "all") {
        // Ako je filter "all", uzimamo sve projekte
        filteredProjects = projectsJson;
    } else {
        // Filtriramo projekte na osnovu filterId
        filteredProjects = projectsJson.filter(project => project.filterId === filter);
    }

    // Prikazivanje filtriranih projekata (možete ovde dodati logiku za prikazivanje)
    console.log(filteredProjects);

    projectsWrapper.innerHTML = "";

    // Kreiraj HTML za projekte
    let projectDom = "";
    for (let i = 0; i < 4; i++) {
        projectDom += ` 
            <div role="listitem" class="latest-project-item w-dyn-item">
                <a href="/larson/projects/${filteredProjects[i].Slug}" class="latest-project-item w-inline-block">
                    <img src="${filteredProjects[i].Thumbnail}" loading="lazy" alt="" class="latest-project-item-image">
                    <p class="latest-project-item-name">${filteredProjects[i].Name}</p>
                    <div class="latest-project-hover">
                        <h3 class="latest-project-hover-title">${filteredProjects[i].Name}</h3>
                        <p class="latest-project-hover-desc">${filteredProjects[i].Service1Desc}</p>
                        <h3 class="latest-project-hover-see-project">See Project &gt;</h3>
                    </div>
                </a>
            </div>
        `;
    }
    projectsWrapper.innerHTML = projectDom;

    // GSAP stagger animacija
    const projectItems = document.querySelectorAll('.latest-project-item');
    gsap.from(projectItems, {
        opacity: 0,
        y: 20,  // pomeraj sa donje strane
        stagger: 0.1,  // vremenski interval između animacija
        duration: 0.7  // trajanje animacije
    });
};

filterAll.addEventListener("click", () => updateProjectFilters("all"));
filterBuilding.addEventListener("click", () => updateProjectFilters("building"));
filterInterior.addEventListener("click", () => updateProjectFilters("interior"));