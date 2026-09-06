import * as params from "@params";

const mosaic = document.getElementById("editorial-mosaic");

if (mosaic) {
  let containerWidth = 0;
  const items = mosaic.querySelectorAll(".editorial-mosaic-item");
  const spacing = Number.isInteger(params.boxSpacing) ? params.boxSpacing : 8;

  const aspectRatios = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    img.style.width = "100%";
    img.style.height = "auto";
    return parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"));
  });

  function updateMosaic() {
    if (containerWidth === mosaic.getBoundingClientRect().width) return;
    containerWidth = mosaic.getBoundingClientRect().width;

    const totalSpacing = spacing * (items.length - 1);
    const aspectSum = aspectRatios.reduce((sum, ratio) => sum + ratio, 0);

    // Altura que hace que la suma de anchos (ancho = ratio * altura) llene exactamente el contenedor
    const rowHeight = (containerWidth - totalSpacing) / aspectSum;

    let left = 0;
    items.forEach((item, i) => {
      const width = aspectRatios[i] * rowHeight;
      item.style.position = "absolute";
      item.style.top = "0";
      item.style.left = left + "px";
      item.style.width = width + "px";
      item.style.height = rowHeight + "px";
      item.style.overflow = "hidden";
      left += width + spacing;
    });

    mosaic.style.position = "relative";
    mosaic.style.height = rowHeight + "px";
    mosaic.style.visibility = "visible";
  }

  window.addEventListener("resize", updateMosaic);
  window.addEventListener("orientationchange", updateMosaic);

  updateMosaic();
  updateMosaic();
}