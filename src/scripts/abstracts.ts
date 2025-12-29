import abstractHTML from "../components/abstract.html?raw";
import abstractsData from "../data/abstracts.json";
import type { Abstract } from "./types";

function displayAbstracts() {
  const container = document.querySelector(".abstracts-list");
  const loadingPlaceholders = document.querySelectorAll(".loading-placeholder");
  const emptyState = document.querySelector(".empty-state");

  if (!container) return;

  loadingPlaceholders.forEach((placeholder) => placeholder.remove());

  if (!abstractsData || abstractsData.length === 0) {
    showEmptyState();
    return;
  }

  emptyState?.classList.add("hidden");

  container.innerHTML = "";

  abstractsData.forEach((abstract, index) => {
    const abstractElement = createAbstractElement(abstract, index);
    container.appendChild(abstractElement);
  });
}

function createAbstractElement(abstract: Abstract, index: number): HTMLElement {
  const article = document.createElement("article");
  article.className =
    "abstract-item bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:border-sky-300 transition-all duration-300 cursor-pointer";
  article.style.animationDelay = `${index * 0.05}s`;

  const authorsText = formatAuthors(abstract.authors);

  article.innerHTML = abstractHTML;

  if (abstract.pdf) {
    const pdf_badge: HTMLSpanElement = article.querySelector("#pdf_badge")!;
    pdf_badge.classList.remove("hidden");
    pdf_badge.classList.add("inline-flex");
  }

  article.querySelector("h3")!.innerText = abstract.title;
  (article.querySelector("#index") as HTMLSpanElement).innerText = `${
    index + 1
  }`;
  article.querySelector("p")!.innerText = authorsText;

  if (abstract.pdf) {
    article.addEventListener("click", () => {
      window.open(abstract.pdf, "_blank");
    });
    article.classList.add("hover:bg-sky-50");
  }

  return article;
}

function formatAuthors(authors: string[]): string {
  if (!authors || authors.length === 0) return "Anonymous";

  if (authors.length === 1) return authors[0];

  if (authors.length === 2) return authors.join(" and ");

  const lastAuthor = authors[authors.length - 1];
  const otherAuthors = authors.slice(0, -1).join(", ");
  return `${otherAuthors}, and ${lastAuthor}`;
}

function showEmptyState() {
  const emptyState = document.querySelector(".empty-state");
  const loadingPlaceholders = document.querySelectorAll(".loading-placeholder");

  loadingPlaceholders.forEach((placeholder) => placeholder.remove());
  emptyState?.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", displayAbstracts);
