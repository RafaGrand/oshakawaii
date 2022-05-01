const createRipple = (e) => {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radio = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - btn.offsetLeft - radio}px`;
  circle.style.top = `50%`;
  circle.classList.add("ripple");

  const ripple = btn.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  btn.appendChild(circle);
}

export const eventRipple = () => {
  const btnCallTo = document.querySelectorAll(".panda-btn");
  for (let bb of btnCallTo) {
    bb.addEventListener("click", createRipple);
  }
}
