let qsRegex;
const isotopeOptions = {
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
        columnWidth: 260
    }
};
let grid = document.querySelector('.flex-grid');
const container = new Isotope(grid, isotopeOptions);

// Filter based on changed search terms.
document.querySelector('.quicksearch').addEventListener( 'change', function( event ) {
    // Only work with inputs.
    if ( !matchesSelector( event.target, 'input' ) ) {
        return;
    }
    console.log('Filtering by search');
    qsRegex = new RegExp( this.value, 'gi' );
    container.arrange({
        filter: function( index, itemElem ) {
            var name = itemElem.querySelector('.name').innerText;
            var title = itemElem.querySelector('.title').innerText;

            return qsRegex ? name.match(qsRegex) || title.match(qsRegex) : true;
        }
    });
});
// Filter based on re-submitted search terms.
document.querySelector('.filter-group').addEventListener( 'click', function( event ) {
    // Only work with inputs.
    if ( !matchesSelector( event.target, 'button.search-button' ) ) {
        return;
    }
    console.log('Filtering by search');
    let searchValue = document.getElementById('quicksearch').value;
    qsRegex = new RegExp( searchValue, 'gi' );
    container.arrange({
        filter: function( index, itemElem ) {
            var name = itemElem.querySelector('.name').innerText;
            var title = itemElem.querySelector('.title').innerText;

            return qsRegex ? name.match(qsRegex) || title.match(qsRegex) : true;
        }
    });
});

// Filter based on category.
document.querySelector('.filter-group').addEventListener( 'click', function( event ) {
    // Only work with explicitly labelled filter buttons.
    if ( !matchesSelector( event.target, 'button.filter-button' ) ) {
        return;
    }
    console.log('Filtering by group');
    let filterValue = event.target.getAttribute('data-filter');
    container.arrange({ filter: filterValue });
});


function playStory(element, e) {
    const planetElements = document.getElementsByClassName('building');
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

let elements = document.getElementsByClassName("building");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (e) => {
        let el = e.currentTarget.getAttribute('data-action')
        playStory(el, e)
    }, false);
}
