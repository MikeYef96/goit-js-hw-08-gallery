import galleryItems from "./gallery-items.js";

const ref = {
  galleryList: document.querySelector(".gallery"),
  lightbox: document.querySelector(".lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

console.log(ref.append(ref.galleryList.createElement("li")));
