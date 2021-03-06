import navbarTemplate from "../templates/navbarTemplate";

export default function renderNavbar(
  parent: HTMLElement,
  renderPage: Function
) {
  parent.innerHTML = navbarTemplate();

  Array.from(document.querySelectorAll(".nav-el")).forEach(
    (button: HTMLButtonElement) =>
      (button.onclick = (ev) => handleNavigation(ev, renderPage))
  );
}

function handleNavigation(ev: any, renderPage: Function) {
  renderPage(ev.target.value);
}
