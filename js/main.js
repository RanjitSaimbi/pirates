// Create a new masonry container.
let qsRegex;
const isotopeOptions = {
  itemSelector: ".grid-item",
  percentPosition: true,
  masonry: {
    columnWidth: 260,
  },
};
let grid = document.querySelector(".flex-grid");
const container = new Isotope(grid, isotopeOptions);

// Filter based on changed search terms.
document
  .querySelector(".quicksearch")
  .addEventListener("change", function (event) {
    // Only work with inputs.
    if (!matchesSelector(event.target, "input")) {
      return;
    }
    console.log("Filtering by search");
    qsRegex = new RegExp(this.value, "gi");
    container.arrange({
      filter: function (itemElem) {
        var name = itemElem.querySelector(".name").innerText;
        var title = itemElem.querySelector(".title").innerText;

        return qsRegex ? name.match(qsRegex) || title.match(qsRegex) : true;
      },
    });
  });
// Filter based on re-submitted search terms.
document
  .querySelector(".filter-group")
  .addEventListener("click", function (event) {
    // Only work with inputs.
    if (!matchesSelector(event.target, "button.search-button")) {
      return;
    }
    console.log("Filtering by search");
    let searchValue = document.getElementById("quicksearch").value;
    qsRegex = new RegExp(searchValue, "gi");
    container.arrange({
      filter: function (itemElem) {
        var name = itemElem.querySelector(".name").innerText;
        var title = itemElem.querySelector(".title").innerText;

        return qsRegex ? name.match(qsRegex) || title.match(qsRegex) : true;
      },
    });
  });

// Filter based on category.
document
  .querySelector(".filter-group")
  .addEventListener("click", function (event) {
    // Only work with explicitly labelled filter buttons.
    if (!matchesSelector(event.target, "button.filter-button")) {
      return;
    }
    console.log("Filtering by group");
    let filterValue = event.target.getAttribute("data-filter");
    container.arrange({ filter: filterValue });
  });

// Play each audio story.
function playStory(element, e) {
  const planetElements = document.getElementsByClassName("story");
  const audioElements = document.getElementsByTagName("audio");
  const audio = document.getElementById(element);

  const paused = audio.paused;

  // Pause all currently playing audio.
  for (i = 0; i < audioElements.length; i++) {
    if (audio.currentSrc != audioElements[i].currentSrc) {
      audioElements[i].pause();
      audioElements[i].controls = false;
    }
  }

  // Remove the active state from all planets.
  for (i = 0; i < planetElements.length; i++) {
    if (element != planetElements[i]) {
      planetElements[i].classList.remove("active");
    }
  }

  if (paused) {
    audio.currentTime = 0;
    audio.play();
    audio.controls = true;

    e.currentTarget.classList.add("active");
  } else {
    audio.pause();
    audio.controls = false;

    e.currentTarget.classList.remove("active");
  }

  container.reloadItems();
}

// Show each story.
function showStory(element, e) {
  console.log("Showing story");
  const feature = document.getElementById("feature");
  feature.classList.remove("hidden");

  // Hide all feature stories.
  const stories = document.getElementsByClassName("story-item");
  for (i = 0; i < stories.length; i++) {
    stories[i].classList.add("hidden");
  }

  // Show the right story.
  const story = document.getElementById(element);
  story.classList.remove("hidden");

  // Scroll the feature box into view.
  feature.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
}

// Hide each story.
async function hideStory(element, e) {
  console.log("Hiding story");

  const stories = document.getElementById("stories");
  stories.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });

  // Give at least 500ms until hiding the feature story.
  await sleep(500);

  const feature = document.getElementById("feature");
  feature.classList.add("hidden");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let elements = document.getElementsByClassName("story");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener(
    "click",
    (e) => {
      let action = e.currentTarget.getAttribute("data-action");
      let audio = e.currentTarget.getAttribute("data-audio");
      if (action) {
        showStory(action, e);
      } else if (audio) {
        playStory(audio, e);
      }
    },
    false
  );
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].addEventListener(
    "click",
    (e) => {
      let el = e.currentTarget.getAttribute("data-action");
      hideStory(el, e);
    },
    false
  );
}
