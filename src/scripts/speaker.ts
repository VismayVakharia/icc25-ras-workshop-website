import speakerHTML from "../components/speaker.html?raw";
import panelistHTML from "../components/panelist.html?raw";
import speakerData from "../data/speakers.json";
import type { Speaker } from "./types";

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

document.addEventListener("DOMContentLoaded", () => {
  loadSpeakers();
  setupSpeakerAccordions();
});

function setupSpeakerAccordions() {
  const accordions =
    document.querySelectorAll<HTMLDivElement>(".speaker-accordion");

  accordions.forEach((accordion) => {
    const header =
      accordion.querySelector<HTMLButtonElement>(".accordion-header")!;
    const content =
      accordion.querySelector<HTMLDivElement>(".accordion-content")!;
    const chevron = accordion.querySelector<SVGElement>(".accordion-chevron")!;

    content.style.maxHeight = "0";

    header.addEventListener("click", () =>
      toggleAccordion(accordion, content, chevron)
    );

    let resizeTimeout: number;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (content.style.maxHeight !== "0px") {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }, 150);
    });
  });
}

function toggleAccordion(
  current: HTMLDivElement,
  content: HTMLDivElement,
  chevron: SVGElement
) {
  const all = document.querySelectorAll(".speaker-accordion");

  const isOpen = content.style.maxHeight !== "0px";

  // collapse all others
  all.forEach((other) => {
    if (other === current) return;
    const otherContent =
      other.querySelector<HTMLDivElement>(".accordion-content")!;
    const otherChevron = other.querySelector<SVGElement>(".accordion-chevron")!;
    otherContent.style.maxHeight = "0";
    otherChevron.style.transform = "rotate(0deg)";
  });

  // toggle current one
  if (isOpen) {
    content.style.maxHeight = "0";
    chevron.style.transform = "rotate(0deg)";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    chevron.style.transform = "rotate(180deg)";
    scrollIntoViewIfNeeded(current as HTMLElement);
  }
}

function scrollIntoViewIfNeeded(element: HTMLElement) {
  setTimeout(() => {
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top >= 55 && rect.bottom <= window.innerHeight;

    if (!isInViewport) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, 400);
}

function loadSpeakers() {
  speakerData.forEach((speaker) => {
    const isSpeaker = speaker.role === "speaker";
    isSpeaker
      ? addSpeaker(speaker as Speaker)
      : addPanelist(speaker as Speaker);
  });
}

function addSpeaker(speaker: Speaker) {
  const container = document.getElementById("speaker-container")!;
  const node = document.createElement("div");
  node.innerHTML = speakerHTML;

  const img = node.querySelector<HTMLImageElement>(".object-cover")!;
  img.src = `/images/${speaker.image}`;
  img.alt = speaker.name;

  node.querySelector<HTMLHeadingElement>("h4")!.textContent = speaker.name;
  node.querySelector<HTMLParagraphElement>("#speaker-title")!.textContent =
    speaker.title;
  node.querySelector<HTMLParagraphElement>("#speaker-talk")!.textContent =
    speaker.talk_title!;

  const bioDiv = node.querySelector<HTMLDivElement>(".prose")!;
  speaker.bio.forEach((text) =>
    bioDiv.appendChild(
      createElement("p", "text-gray-700 leading-relaxed mb-3", text)
    )
  );

  container.appendChild(node);
}

function addPanelist(speaker: Speaker) {
  const container = document.getElementById("panelist-container")!;
  const card = document.createElement("div");
  card.className = "lg:col-span-2";
  card.innerHTML = panelistHTML;

  const img = card.querySelector<HTMLImageElement>(".object-cover")!;
  img.src = `/images/${speaker.image}`;
  img.alt = speaker.name;
  card.querySelector<HTMLHeadingElement>("h3")!.textContent = speaker.name;
  card.querySelector<HTMLParagraphElement>("p")!.textContent = speaker.title;

  const bioDiv = document.getElementById("bioContainer")! as HTMLDivElement;
  const bioName = bioDiv.querySelector<HTMLHeadingElement>("#bioName")!;
  const bioText = bioDiv.querySelector<HTMLDivElement>("#bioText")!;
  const closeBtn = bioText.querySelector("button");

  if (speaker.bio.length > 0) {
    card.addEventListener("click", () =>
      togglePanelistBio(bioDiv, bioName, bioText, speaker)
    );
    closeBtn?.addEventListener("click", () => hidePanelistBio(bioDiv));
  }

  container.appendChild(card);
}

function togglePanelistBio(
  bioDiv: HTMLDivElement,
  bioName: HTMLHeadingElement,
  bioText: HTMLDivElement,
  speaker: Speaker
) {
  if (bioDiv.dataset["id"] === speaker.name) return hidePanelistBio(bioDiv);

  bioDiv.dataset["id"] = speaker.name;
  bioName.textContent = speaker.name;
  bioDiv.classList.remove("hidden");

  bioText.querySelectorAll("p").forEach((e) => {
    bioText.removeChild(e);
  });
  speaker.bio.forEach((t) =>
    bioText.appendChild(
      createElement("p", "text-gray-700 leading-relaxed mb-3", t)
    )
  );
  scrollIntoViewIfNeeded(bioDiv as HTMLElement);
}

function hidePanelistBio(bioDiv: HTMLDivElement) {
  bioDiv.classList.add("hidden");
  bioDiv.dataset["id"] = "";
}
