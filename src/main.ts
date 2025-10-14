import "./style.css";

const mobileMenuButton = document.getElementById("mobile-menu-button") as HTMLButtonElement;
const mobileMenuDiv = document.getElementById("mobile-menu") as HTMLDivElement;
const mobileOverlay = document.getElementById("mobile-menu-overlay") as HTMLDivElement;

function openMenu() {
  mobileMenuDiv.classList.toggle("hidden");
  document.body.style.overflow = "hidden";
  mobileOverlay.classList.remove("hidden");
  mobileMenuButton.classList.toggle("open");
}

function closeMenu() {
  mobileMenuDiv.classList.toggle("hidden");
  document.body.style.overflow = "";
  mobileOverlay.classList.add("hidden");
  mobileMenuButton.classList.toggle("open");
}

function toggleMenu() {
  if (mobileMenuDiv.classList.contains("hidden")) openMenu();
  else closeMenu();
}

mobileOverlay.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (!mobileMenuDiv.contains(target) && !mobileMenuButton.contains(target)) {
    closeMenu();
  }
});

mobileMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});
