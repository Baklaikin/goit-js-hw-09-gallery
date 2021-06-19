import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.lightbox'),
  link: document.querySelector('.gallery__link'),
  overlay: document.querySelector('.lightbox__overlay'),
  img: document.querySelector('.lightbox__image'),
  lightboxContent: document.querySelector('.lightbox__content'),
  closeLightboxBtn: document.querySelector('.lightbox__button'),
};
const markup = markupConstructor(galleryItems);


export function markupConstructor(galleryItems) {
  return galleryItems.map(({ preview, original, description}, idx) => {
        return `
        <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index-number="${idx}"
      alt="${description}"
    />
  </a>
</li>
`;
    }).join('');   
};

refs.gallery.insertAdjacentHTML('afterbegin', markup);

let modalPicture = refs.img;


const onGalleryClick = (e) => {
  e.preventDefault();

  const imageSource = e.target.dataset.source;
  const imageIndex = Number(e.target.dataset.indexNumber);
  const imageAlt = e.target.alt;
 
  
  modalPicture.src = imageSource;
  modalPicture.alt = imageAlt;
  modalPicture.dataset.indexNumber = imageIndex;
  
  refs.overlay.addEventListener('click', modalClose, { once: true });
  refs.lightBox.classList.toggle('is-open');

  window.addEventListener('keydown', onKeyPress);
  
  
};

// Выход с помощью ESC или нажимая на overlay
   const onKeyPress = (e) => {
    if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
      return;
    };
    if (e.key === "Escape") {
      modalClose();
    };
    
    if (e.key === "ArrowRight") {
      onArrowRightClick();
    };
    if (e.key === "ArrowLeft") {
      onArrowLeftClick();
    };
  };


function onArrowRightClick() {
  let counter = Number(modalPicture.dataset.indexNumber)+1;
   if (counter ===  imageData.length) {
     counter = 0;
  };
   
  let newImage = imageData[`${counter}`];

  modalPicture.src = newImage.dataset.source;
  modalPicture.alt = newImage.alt;
  modalPicture.dataset.indexNumber = newImage.dataset.indexNumber;
  
  return;
};
const imageData = document.querySelectorAll('.gallery__image');
console.log(imageData[1].dataset.source)


refs.gallery.addEventListener('click', onGalleryClick);

const modalClose = (e) => {
  refs.lightBox.classList.remove('is-open');
  
  modalPicture.src = '';
  modalPicture.alt = '';
  modalPicture.dataset.indexNumber = '';
};
refs.overlay.addEventListener('click', modalClose, { once: true });
refs.closeLightboxBtn.addEventListener('click', modalClose);

function onArrowLeftClick() {
let counter = Number(modalPicture.dataset.indexNumber) - 1;
   if (counter < 0) {
     counter = imageData.length-1;
  };
   
  let newImage = imageData[`${counter}`];
  modalPicture.src = newImage.dataset.source;
  modalPicture.alt = newImage.alt;
  modalPicture.dataset.indexNumber = newImage.dataset.indexNumber;
  
  return;

};