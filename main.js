const header = document.querySelector(".site-header");
const links = [...document.querySelectorAll(".nav a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const syncHeaderOffset = () => {
  if (!header) return;
  const offset = Math.ceil(header.getBoundingClientRect().height) + 8;
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
};

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

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

  const focus = window.innerHeight * 0.35;
  let current = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= focus) {
      current = section;
    }
  }

  const last = sections[sections.length - 1];
  const lastTop = last.getBoundingClientRect().top;
  if (lastTop < window.innerHeight * 0.55) {
    current = last;
  }

  markCurrent(current.id);
};

syncHeaderOffset();
onScroll();
updateCurrent();

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("scroll", updateCurrent, { passive: true });
window.addEventListener("resize", () => {
  syncHeaderOffset();
  updateCurrent();
});

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    syncHeaderOffset();
    updateCurrent();
  });
}

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = id ? document.querySelector(id) : null;
    if (!target) return;

    event.preventDefault();
    syncHeaderOffset();
    const top =
      window.scrollY +
      target.getBoundingClientRect().top -
      (header?.offsetHeight ?? 0) -
      8;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    history.pushState(null, "", id);
  });
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
