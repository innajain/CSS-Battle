const container = document.querySelector('#container');
const drawing = document.querySelector('.drawing');
const solution = document.querySelector(".solution")
const border = parseFloat(getComputedStyle(container).borderWidth);
const width = parseFloat(getComputedStyle(container).width);
const vertical = document.querySelector(".vertical-line")
const body = document.querySelector("body")
body.style.backgroundImage = `url(${container.querySelector("img").src})`

let isFixed = false;

container.addEventListener("mouseenter", (event)=>{
    
    const mouseX = event.clientX - container.offsetLeft - border;
    if (mouseX < width) {
        setTimeout(() => {
            drawing.classList.remove("smooth-transition")
        }, 400);
        
        drawing.style.width = mouseX + 'px';
        vertical.style.display="inline-block"
    }
})

const move = container.addEventListener('mousemove', (event) => {
    if (isFixed) return; // Do nothing if the overlay is fixed
    
  const mouseX = event.clientX - container.offsetLeft - border;
  if (mouseX < width) {
      drawing.style.width = mouseX + 'px';
      vertical.style.display="inline-block"
    }
});

container.addEventListener('click', (event) => {
    isFixed = !isFixed; // Toggle the fixed state on each click
    
    const mouseX = event.clientX - container.offsetLeft - border;
    drawing.style.width = mouseX + 'px'; // Restore original functionality
    
});

container.addEventListener('mouseleave', () => {
    if (isFixed) return; // Do nothing if the overlay is fixed
    drawing.classList.add("smooth-transition")
    drawing.style.width = '100%';
    setTimeout(() => {
        drawing.classList.remove("smooth-transition")
    }, 400);
    vertical.style.display="none"
});
