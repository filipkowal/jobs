import "client-only";

export function scrollToElement(element: Element | null) {
  const headerHeight = window && window.innerWidth >= 640 ? 60 : 0;

  if (element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + scrollTop - headerHeight;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}
