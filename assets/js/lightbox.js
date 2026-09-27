import PhotoSwipeLightbox from "./photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe/photoswipe.esm.js";
import PhotoSwipeDynamicCaption from "./photoswipe/photoswipe-dynamic-caption-plugin.esm.min.js";
import * as params from "@params";

const gallery = document.querySelector("#gallery, #post-gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 0.85,
    pswpModule: PhotoSwipe,

    // Tap/click on the image or background closes the lightbox.
    imageClickAction: "close",
    tapAction: "close",
    bgClickAction: "close",

    pinchClose: "close",
    loop: true,

    padding: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
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
    const target =
      lightbox.pswp?.currSlide?.data?.element?.dataset?.pswpTarget;

    if (target) {
      history.replaceState("", document.title, `#${target}`);
    }
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

  const hash = window.location.hash.substring(1);

  if (hash.length > 1) {
    const items = gallery.querySelectorAll(".gallery-item");

    for (let index = 0; index < items.length; index++) {
      if (items[index].dataset.pswpTarget === hash) {
        lightbox.loadAndOpen(index, { gallery });
        break;
      }
    }
  }
}
