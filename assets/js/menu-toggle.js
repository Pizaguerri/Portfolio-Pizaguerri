const button = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (button && menu) {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const isOpen = button.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    button.setAttribute("aria-expanded", String(nextState));
    button.setAttribute("aria-label", nextState ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("hidden", !nextState);
  });
}
