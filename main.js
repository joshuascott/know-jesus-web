const header = document.querySelector(".site-header");
const links = [...document.querySelectorAll(".nav a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const markCurrent = (id) => {
  links.forEach((link) => {
    if (link.getAttribute("href") === `#${id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateCurrent = () => {
  if (!sections.length) return;

  const focus = (header?.offsetHeight ?? 0) + window.innerHeight * 0.22;
  let current = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= focus) {
      current = section;
    }
  }

  const doc = document.documentElement;
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
    current = sections[sections.length - 1];
  }

  markCurrent(current.id);
};

updateCurrent();
window.addEventListener("scroll", updateCurrent, { passive: true });
window.addEventListener("resize", updateCurrent);

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
