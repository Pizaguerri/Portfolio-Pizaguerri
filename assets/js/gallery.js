import justifiedLayout from "./justified-layout.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const items = Array.from(gallery.querySelectorAll(".gallery-item"));

  const getAspectRatios = () =>
    items.map((item) => {
      const img = item.querySelector("img");

      if (!img) {
        return 1;
      }

      const width = Number.parseFloat(img.getAttribute("width"));
      const height = Number.parseFloat(img.getAttribute("height"));

      if (!Number.isFinite(width) || !Number.isFinite(height) || height <= 0) {
        return 1;
      }

      img.style.width = "100%";
      img.style.height = "auto";

      return width / height;
    });

  let containerWidth = 0;

  const updateGallery = () => {
    const width = gallery.getBoundingClientRect().width;

    if (!width || width === containerWidth) {
      return;
    }

    containerWidth = width;

    const aspectRatios = getAspectRatios();

    if (!aspectRatios.length) {
      gallery.style.height = "";
      gallery.style.visibility = "";
      return;
    }

    const layout = justifiedLayout(aspectRatios, {
      rowWidth: width,
      spacing: Number.isInteger(params.boxSpacing) ? params.boxSpacing : 8,
      rowHeight: params.targetRowHeight || 288,
      heightTolerance: Number.isInteger(params.targetRowHeightTolerance)
        ? params.targetRowHeightTolerance
        : 0.25,
    });

    items.forEach((item, index) => {
      const box = layout.boxes[index];

      if (!box) {
        return;
      }

      const { width: boxWidth, height, top, left } = box;

      item.style.position = "absolute";
      item.style.width = `${boxWidth}px`;
      item.style.height = `${height}px`;
      item.style.top = `${top}px`;
      item.style.left = `${left}px`;
      item.style.overflow = "hidden";
    });

    gallery.style.position = "relative";
    gallery.style.height = `${layout.containerHeight}px`;
    gallery.style.visibility = "";
  };

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(updateGallery);
    resizeObserver.observe(gallery);
  } else {
    window.addEventListener("resize", updateGallery);
    window.addEventListener("orientationchange", updateGallery);
  }

  updateGallery();
}
