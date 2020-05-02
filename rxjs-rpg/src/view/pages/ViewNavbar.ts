import { Page } from "../../util/pages";
import navbarTemplate from "../templates/navbarTemplate";

export default function renderNavbar(
  parent: HTMLElement,
  currentPage: string,
  renderPage: Function
) {
  const div = document.createElement("div");
  div.innerHTML = navbarTemplate();
  parent.appendChild(div);

  Array.from(document.querySelectorAll(".nav-el")).forEach(
    (button: HTMLButtonElement) =>
      (button.onclick = (ev) => handleNavigation(ev, renderPage))
  );
}

function handleNavigation(ev: any, renderPage: Function) {
  renderPage(ev.target.value);
}