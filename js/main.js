const isotopeOptions = {
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
        columnWidth: 260
    }
};
let grid = document.querySelector('.flex-grid');
const container = new Isotope(grid, isotopeOptions);

function playStory(element, e) {
    const planetElements = document.getElementsByClassName('planet');
    const audioElements = document.getElementsByTagName('audio');
    const audio = document.getElementById(element);

    const paused = audio.paused;

    // Pause all currently playing audio.
    for(i=0; i<audioElements.length; i++) {
        if (audio.currentSrc != audioElements[i].currentSrc) {
            audioElements[i].pause();
            audioElements[i].controls = false;
        }
    }

    // Remove the active state from all planets.
    for(i=0; i<planetElements.length; i++) {
        if (element != planetElements[i]) {
            planetElements[i].classList.remove("active");
        }
    }

    if (paused) {
        audio.currentTime = 0;
        audio.play()
        audio.controls = true;

        e.currentTarget.classList.add("active");
    }
    else {
        audio.pause()
        audio.controls = false;

        e.currentTarget.classList.remove("active");
    }

    container.reloadItems()
}

let elements = document.getElementsByClassName("planet");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (e) => {
        let el = e.currentTarget.getAttribute('data-action')
        playStory(el, e)
    }, false);
}
