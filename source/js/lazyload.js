'use script';

// https://web.dev/browser-level-image-lazy-loading/


function appendLazysizesScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.0/lazysizes.min.js';
  document.head.append(script);
}


function initLazyload() {
  let nativeLazyloadIsEnabled = false;

  if ('loading' in HTMLImageElement.prototype) {
    // Если поддержка есть - браузер покажет заглушку - dummy.svg
    // надо заменить заглушку на реальные изображения
    const dataSrcsetElements = document.querySelectorAll('[data-srcset]');
    dataSrcsetElements.forEach((dataSrcsetElement) => {
      dataSrcsetElement.srcset = dataSrcsetElement.dataset.srcset;
      delete dataSrcsetElement.dataset.srcset;
    });
    nativeLazyloadIsEnabled = true;
  } else {
    const lazyElements = document.querySelectorAll('[loading="lazy"]');
    lazyElements.forEach((lazyElement) => {
      lazyElement.classList.add('lazyload');
    });
    appendLazysizesScript();
  }

  return { nativeLazyloadIsEnabled };
}


export default initLazyload;


// function initLazyload() {
//   let nativeLazyloadIsEnabled;

//   if ('loading' in HTMLImageElement.prototype) {

//     const srcsetElements = document.querySelectorAll('[data-srcset]');
//     srcsetElements.forEach(srcsetElement => {
//       srcsetElement.setAttribute('srcset', srcsetElement.dataset.srcset);
//       delete srcsetElement.dataset.srcset;
//     });

//     const images = document.querySelectorAll('[data-src]');
//     images.forEach((img) => {
//       img.src = img.dataset.src;
//       delete img.dataset.src;
//     });

//     nativeLazyloadIsEnabled = true;

//   } else {

//     const lazyImages = document.querySelectorAll('[loading = "lazy"]');
//     lazyImages.forEach(lazyImage => {
//       lazyImage.classList.add('lazyload');
//     });

//     const script = document.createElement('script');
//     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.0/lazysizes.min.js';
//     document.head.append(script);

//     nativeLazyloadIsEnabled = false;

//   }

//   return { nativeLazyloadIsEnabled };
// }
