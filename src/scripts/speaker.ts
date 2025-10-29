import speakerHTML from "../components/speaker.html?raw";
import speakerData from "../data/speakers.json";

document.addEventListener("DOMContentLoaded", () => {
  loadSpeakers();

  const accordions = document.querySelectorAll(".speaker-accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(
      ".accordion-header"
    ) as HTMLButtonElement;
    const content = accordion.querySelector(
      ".accordion-content"
    ) as HTMLElement;
    const chevron = accordion.querySelector(".accordion-chevron") as SVGElement;

    content.style.maxHeight = "0";

    header.addEventListener("click", () => {
      if (content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0";
        chevron.style.transform = "rotate(0deg)";
      } else {
        accordions.forEach((otherAccordion) => {
          if (otherAccordion !== accordion) {
            const otherContent = otherAccordion.querySelector(
              ".accordion-content"
            ) as HTMLElement;
            const otherChevron = otherAccordion.querySelector(
              ".accordion-chevron"
            ) as SVGElement;
            if (otherContent.style.maxHeight !== "0px") {
              otherContent.style.maxHeight = "0";
              otherChevron.style.transform = "rotate(0deg)";
            }
          }
        });

        content.style.maxHeight = content.scrollHeight + "px";
        chevron.style.transform = "rotate(180deg)";

        setTimeout(() => {
          const rect = accordion.getBoundingClientRect();
          const isInViewport =
            rect.top >= 55 && rect.bottom <= window.innerHeight;

          if (!isInViewport) {
            accordion.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }, 400);
      }
    });

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
});

function loadSpeakers() {
  const speakerContainer = document.getElementById(
    "speaker-container"
  ) as HTMLDivElement;

  for (let i = 0; i < speakerData.length; i++) {
    const accordian = document.createElement("div");
    accordian.innerHTML = speakerHTML;
    const speaker = speakerData[i];

    (
      accordian.querySelector(".object-cover") as HTMLImageElement
    ).src = `/images/${speaker.image}`;

    (accordian.querySelector(".object-cover") as HTMLImageElement).alt =
      speaker.name;

    (
      (accordian.querySelector("button") as HTMLButtonElement).querySelector(
        "h4"
      ) as HTMLHeadingElement
    ).textContent = speaker.name;

    (
      (
        (accordian.querySelector("button") as HTMLButtonElement).querySelector(
          "div"
        ) as HTMLDivElement
      ).querySelector("p") as HTMLParagraphElement
    ).textContent = speaker.title;

    const bioDiv = accordian.querySelector(".prose") as HTMLDivElement;

    speaker.bio.forEach((bioElement) => {
      const p = document.createElement("p");
      p.className = "text-gray-700 leading-relaxed mb-3";
      p.textContent = bioElement;
      bioDiv.appendChild(p);
    });

    speakerContainer.appendChild(accordian);
  }
}
