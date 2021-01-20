import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".lightbox"),
  content: document.querySelector(".lightbox__content"),
  image: document.querySelector(".lightbox__image"),
  btnCloseLightbox: document.querySelector(
    "button[data-action='close-lightbox']"
  ),
};

galleryItems.forEach((item) => {
  let imgItem = `<li class='gallery__item'>
    <a class='gallery__link' href=${item.original}>
     <img class="gallery__image"
     src=${item.preview} 
     data-source=${item.original} 
     alt=${item.description}/>
   </a>
 </li>`;
  refs.gallery.insertAdjacentHTML("beforeend", imgItem);
});

let originItemsArr = [];
galleryItems.forEach((item) => originItemsArr.push(item.original));

const closeOverlayContent = (event) => {
  if (event.target !== event.currentTarget) return;
  closeModalWindow();
};

const escapeBtnHandler = (event) => {
  if (event.keyCode !== 27) return;
  closeModalWindow();
};

const scrollingBtnHandler = (event) => {
  let index = originItemsArr.indexOf(refs.image.src);

  if (event.keyCode === 39) {
    if (index < originItemsArr.length - 1) {
      refs.image.setAttribute("src", originItemsArr[index + 1]);
    } else {
      index--;
      refs.image.setAttribute("src", originItemsArr[index + 1]);
    }
  }
  if (event.keyCode === 37) {
    if (index === 0) {
      index = originItemsArr.length;
      refs.image.setAttribute("src", originItemsArr[index - 1]);
    } else refs.image.setAttribute("src", originItemsArr[index - 1]);
  }
};

const openImgItem = (event) => {
  event.preventDefault();
  const imgTarget = event.target;
  if (imgTarget === event.currentTarget) return;

  refs.modalWindow.classList.add("is-open");
  refs.image.alt = imgTarget.alt;
  refs.image.src = imgTarget.dataset.source;

  window.addEventListener("keyup", escapeBtnHandler);
  window.addEventListener("keyup", scrollingBtnHandler);
};

const closeModalWindow = () => {
  refs.modalWindow.classList.remove("is-open");
  refs.image.alt = "";
  refs.image.src = "";

  window.removeEventListener("keyup", escapeBtnHandler);
  window.removeEventListener("keyup", scrollingBtnHandler);
};

refs.gallery.addEventListener("click", openImgItem);
refs.btnCloseLightbox.addEventListener("click", closeModalWindow);
refs.content.addEventListener("click", closeOverlayContent);
