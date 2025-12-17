function handleScroll() {
  const header = document.querySelector(".headerBox");

  const scrollThreshold = 100;

  if (window.scrollY > scrollThreshold) {
    if (!header.classList.contains("scrolled")) {
      header.classList.add("scrolled");
    }
  } else {
    if (header.classList.contains("scrolled")) {
      header.classList.remove("scrolled");
    }
  }
}
window.addEventListener("scroll", handleScroll);