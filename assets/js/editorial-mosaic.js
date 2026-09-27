// El mosaico justificado está desactivado.
// El carrusel/editorial mosaic se controla mediante custom.css.
// Solo hacemos visible el contenedor cuando el DOM ya existe.

const mosaic = document.getElementById("editorial-mosaic");

if (mosaic) {
  mosaic.style.visibility = "visible";
}
