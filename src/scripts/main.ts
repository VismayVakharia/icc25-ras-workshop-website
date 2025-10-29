import "./style.css";

const mobileMenuButton = document.getElementById(
  "mobile-menu-button"
) as HTMLButtonElement;
const mobileMenuDiv = document.getElementById("mobile-menu") as HTMLDivElement;
const mobileOverlay = document.getElementById(
  "mobile-menu-overlay"
) as HTMLDivElement;

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

const emailButtons = document.getElementsByClassName("email");
const copiedMsg = document.getElementById("copy-popup") as HTMLSpanElement;

for (let index = 0; index < emailButtons.length; index++) {
  const emailButton = emailButtons[index] as HTMLButtonElement;
  emailButton.addEventListener("click", async () => {
    const email = emailButton.innerText;
    try {
      await navigator.clipboard.writeText(email);
      copiedMsg.classList.remove("hidden");
      copiedMsg.classList.remove("opacity-0");
      copiedMsg.classList.add("opacity-100");
      setTimeout(() => {
        copiedMsg.classList.add("hidden");
        copiedMsg.classList.remove("opacity-100");
        copiedMsg.classList.add("opacity-0");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  });
}
