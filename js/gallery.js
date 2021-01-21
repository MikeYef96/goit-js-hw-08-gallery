import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  modalOpen: document.querySelector(".lightbox"),
  modalContent: document.querySelector(".lightbox__content"),
  modalImage: document.querySelector(".lightbox__image"),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

let galleryListItems = document.createDocumentFragment();

galleryItems.forEach((item) => {
  galleryListItems = `<li class="gallery__item">
  <a
      class="gallery__link"
      href=${item.original}
    >
    <img
      class="gallery__image"
      src=${item.preview}
      data-source=${item.original}
      alt=${item.description}
    />
  </a>
</li>`;
  refs.gallery.insertAdjacentHTML("beforeend", galleryListItems);
});

let originalItems = [];
galleryItems.forEach((item) => {
  originalItems.push(item.original);
});

function scrollingBtns(event) {
  let index = originalItems.indexOf(refs.modalImage.src);

  if (event.code === "ArrowRight") {
    if (index < originalItems.length - 1) {
      refs.modalImage.setAttribute("src", originalItems[index + 1]);
    } else {
      index -= 1;
      refs.modalImage.setAttribute("src", originalItems[index + 1]);
    }
  }

  if (event.code === "ArrowLeft") {
    if (index === 0) {
      index = originalItems.length;
      refs.modalImage.setAttribute("src", originalItems[index - 1]);
    } else {
      refs.modalImage.setAttribute("src", originalItems[index - 1]);
    }
  }
}

const closeModalOverlay = (event) => {
  if (event.target !== event.currentTarget) return;
  closeModalBtn();
};

const closeByEsc = (event) => {
  if (event.code !== "Escape") return;
  closeModalBtn();
};

const openImgModal = (event) => {
  event.preventDefault();
  if (event.target === event.currentTarget) return;

  refs.modalOpen.classList.add("is-open");
  refs.modalImage.alt = event.target.alt;
  refs.modalImage.src = event.target.dataset.source;

  window.addEventListener("keyup", closeByEsc);
  window.addEventListener("keydown", scrollingBtns);
};

const closeModalBtn = () => {
  refs.modalOpen.classList.remove("is-open");
  refs.modalImage.alt = "";
  refs.modalImage.src = "";
  window.removeEventListener("keyup", closeByEsc);
  window.removeEventListener("keydown", scrollingBtns);
};

refs.gallery.addEventListener("click", openImgModal);
refs.modalCloseBtn.addEventListener("click", closeModalBtn);
refs.modalContent.addEventListener("click", closeModalOverlay);
