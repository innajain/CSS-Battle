const container = document.querySelector("#container");
const drawing = document.querySelector(".drawing");
const solution = document.querySelector(".solution");
const border = parseFloat(getComputedStyle(container).borderWidth);
const width = parseFloat(getComputedStyle(container).width);
const height = parseFloat(getComputedStyle(container).height);
// const vertical = document.querySelector(".vertical-line");
const body = document.querySelector("body");
body.style.backgroundImage = `url(${container.querySelector("img").src})`;

let isFixed = false;
let entrydirection = "";

container.addEventListener("mouseenter", (event) => {
  const rect = container.getBoundingClientRect();
  const left = Math.abs(event.clientX - rect.left) / width;
  const right = Math.abs(width - (event.clientX - rect.left)) / width;
  const top = Math.abs(event.clientY - rect.top) / height;
  const bottom = Math.abs(height - (event.clientY - rect.top)) / height;

  if (left < 0.1 && top > 0.1 && bottom > 0.1) {
    entrydirection = "left";
    container.style.cursor="col-resize"
  } else if (right < 0.1 && top > 0.1 && bottom > 0.1) {
    entrydirection = "right";
    container.style.cursor="col-resize"
  } else if (top < 0.1 && left > 0.1 && right > 0.1) {
    entrydirection = "top";
    container.style.cursor="row-resize"
  } else if (bottom < 0.1 && left > 0.1 && right > 0.1) {
    entrydirection = "bottom";
    container.style.cursor="row-resize"
  } else if (left < 0.1 && top < 0.1) {
    entrydirection = "left-top";
    container.style.cursor="crosshair"
  } else if (left < 0.1 && bottom < 0.1) {
    entrydirection = "left-bottom";
    container.style.cursor="crosshair"
  } else if (right < 0.1 && top < 0.1) {
    entrydirection = "right-top";
    container.style.cursor="crosshair"
  } else if (right < 0.1 && bottom < 0.1) {
    entrydirection = "right-bottom";
    container.style.cursor="crosshair"
  }
  if (entrydirection.includes("left")) {
    drawing.style.left=0
    solution.style.left=0
  }
  if (entrydirection.includes("right")) {
    drawing.style.right=0
    solution.style.right=0
  }
  if (entrydirection.includes("top")) {
    drawing.style.top=0
    solution.style.top=0
  }
  if (entrydirection.includes("bottom")) {
    drawing.style.bottom=0
    solution.style.bottom=0
  }
  
});

container.addEventListener("mousemove", (event) => {
  if (isFixed) return; // Do nothing if the overlay is fixed
  const mouseX = event.clientX - container.offsetLeft - border;
  const mouseY = event.clientY - container.offsetTop - border;
  if (entrydirection.includes("left")) {
    drawing.style.width = mouseX + "px";
  }
  if (entrydirection.includes("right")) {
    drawing.style.width = width-mouseX + "px";
  }
  if (entrydirection.includes("top")) {
    drawing.style.height = mouseY + "px";
  }
  if (entrydirection.includes("bottom")) {
    drawing.style.height = height-mouseY + "px";
  }
  if (mouseX < width) {
    // vertical.style.display = "inline-block";
  }
});

container.addEventListener("click", (event) => {
  isFixed = !isFixed; // Toggle the fixed state on each click
});

container.addEventListener("mouseleave", () => {
  if (isFixed) return; // Do nothing if the overlay is fixed
  drawing.classList.add("smooth-transition");
  drawing.style.width = "100%";
  drawing.style.height = "100%";
  setTimeout(() => {
    drawing.classList.remove("smooth-transition");
    setTimeout(() => {
        drawing.style.left = "";
        drawing.style.right = "";
        drawing.style.top = "";
        drawing.style.bottom = "";
        solution.style.left = "";
        solution.style.right = "";
        solution.style.top = "";
        solution.style.bottom = "";
    }, 0);
  }, 150);
  // vertical.style.display = "none";

});
