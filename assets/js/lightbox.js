import PhotoSwipeLightbox from "./photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe/photoswipe.esm.js";
import PhotoSwipeDynamicCaption from "./photoswipe/photoswipe-dynamic-caption-plugin.esm.min.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 0.85,
    pswpModule: PhotoSwipe,
    imageClickAction: "close",
    tapAction: "close",
    bgClickAction: "close",
    pinchClose: "close",
    loop: true,
    padding: {
      top: 25,
      bottom: 25,
      left: 25,
      right: 25,
    },
    allowPanToNext: false,
    closeOnVerticalDrag: false,
    wheelToZoom: false,
    pinchToZoom: false,
    zoomToOpportunityThreshold: 0,
    
    closeTitle: params.closeTitle,
    zoomTitle: params.zoomTitle,
    arrowPrevTitle: params.arrowPrevTitle,
    arrowNextTitle: params.arrowNextTitle,
    errorMsg: params.errorMsg,
  });


  lightbox.on("change", () => {
    const target = lightbox.pswp.currSlide?.data?.element?.dataset["pswpTarget"];
    history.replaceState("", document.title, "#" + target);
  });

  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });

  new PhotoSwipeDynamicCaption(lightbox, {
    type: "below",
    mobileLayoutBreakpoint: 0,
    verticallyCenterImage: true,
  });

  lightbox.init();

  if (window.location.hash.substring(1).length > 1) {
    const target = window.location.hash.substring(1);
    const items = gallery.querySelectorAll("a");
    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset["pswpTarget"] === target) {
        lightbox.loadAndOpen(i, { gallery });
        break;
      }
    }
  }
}

// Prevenir clic derecho y doble click en imágenes del lightbox
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // Deshabilitar menú contextual en imágenes de galería
  gallery.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Prevenir doble click
  gallery.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
});