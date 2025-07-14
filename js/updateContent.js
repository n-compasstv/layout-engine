import { updateTextById } from './utils.js';

export function updateElementsWithContentData(article) {
    if (!article) return;

    const mainImage = document.querySelector('[data-element-id="main-image"]');
    if (mainImage && article.image) {
        const cleanImageUrl = article.image.split('?')[0];
        mainImage.src = cleanImageUrl;
        mainImage.classList.add('main-image');

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.classList.add('main-image-wrapper');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.width = mainImage.style.width || '100%';
        wrapper.style.height = mainImage.style.height || '100%';

        // Insert wrapper in place of mainImage
        mainImage.parentElement.insertBefore(wrapper, mainImage);
        wrapper.appendChild(mainImage);

        // Create blurred duplicate
        const blurred = mainImage.cloneNode();
        blurred.classList.add('main-image-blur');
        blurred.style.position = 'absolute';
        blurred.style.left = '0';
        blurred.style.top = '0';
        blurred.style.width = '150%';
        blurred.style.height = '100%';
        blurred.style.zIndex = '0';
        blurred.style.filter = 'blur(8px) brightness(0.8)';
        blurred.style.objectFit = 'cover';
        blurred.style.pointerEvents = 'none';
        blurred.dataset.elementId = 'main-image-blur';

        wrapper.insertBefore(blurred, mainImage);
    }

    // Update headline (title)
    const headlineEl = document.querySelector('[data-element-id="text-container"] .headline');
    if (headlineEl && article.title) {
        headlineEl.textContent = article.title;
    }

    // Update subtitle (summary)
    const subtitleEl = document.querySelector('[data-element-id="text-container"] .subtitle');
    if (subtitleEl && article.summary) {
        subtitleEl.textContent = article.summary;
    }
}
