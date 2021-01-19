import gallery from "./gallery.js";

const ref = {
  galleryList: document.querySelector("gallery__list"),
  lightbox: document.querySelector("lightbox"),
  lightboxOverlay: document.querySelector("lightbox__overlay"),
};

gallery.forEach(() => ref.galleryList.createElement("li"));
