const btn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (btn && menu) {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const isHidden = menu.classList.contains("hidden");

    // Cambia aria-expanded al valor contrario
    btn.setAttribute("aria-expanded", isHidden ? "true" : "false");

    // Alterna la clase 'hidden' para mostrar/ocultar menú
    menu.classList.toggle("hidden");
  });
}
