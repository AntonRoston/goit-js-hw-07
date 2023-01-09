import { galleryItems } from "./gallery-items.js";
// Change code below this line
// import * as basicLightbox from 'basiclightbox'

console.log(galleryItems);
// console.log(createGalleryMarkup(galleryItems));

const divConteiner = document.querySelector(".js-gallery");
const cardsMarkup = createGalleryMarkup(galleryItems);

divConteiner.insertAdjacentHTML("beforeend", cardsMarkup);

divConteiner.addEventListener("click", onConteinerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return ` 
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>
      `;
    })
    .join("");
}

function onConteinerClick(evt) {
  evt.preventDefault();
  const isImg = evt.target.classList.contains("gallery__image");
  console.log(evt.target);
  if (isImg) {
    console.log(evt.target.dataset.source);
    onShowModal(evt.target.dataset.source);
  }

  // console.log(evt.target);
}

function onShowModal(original) {
  const instance = basicLightbox.create(
    `
  <img width="800" height="600" src="${original}">`,
    {
      onShow: (instance) => {
        divConteiner.addEventListener("keydown", onCloseModal);
      },
      onClose: (instance) => {
        divConteiner.removeEventListener("keydown", onCloseModal);
      },
    }
  );
  instance.show();
  function onCloseModal(evt) {
    console.log("onCloseModal");
    if (evt.key === "Escape") {
      instance.close();
    }
  }
}
