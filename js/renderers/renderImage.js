import { scaleValue } from '../scale.js';
import { applyCSSProperties } from './utils.js';

export function renderImage(element, container) {
    const img = document.createElement('img');
    img.className = 'element image-element';

    img.src = element.src?.includes('{{')
        ? 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=1080&fit=crop'
        : element.src;

    img.alt = element.alt || 'Rendered image';
    img.style.position = 'absolute';

    img.style.left = scaleValue(element.x) + 'px';
    img.style.top = scaleValue(element.y) + 'px';

    // Size
    if (element.width !== undefined && element.width !== 'auto') {
        img.style.width = scaleValue(element.width) + 'px';
    }

    if (element.height !== undefined && element.height !== 'auto') {
        img.style.height = scaleValue(element.height) + 'px';
    }

    img.style.opacity = element.opacity;
    img.style.transform = `rotate(${element.rotation}deg)`;
    img.style.zIndex = element.zIndex;
    img.style.borderRadius = scaleValue(element.borderRadius || 0) + 'px';

    if (element.css) {
        applyCSSProperties(img, element.css);
    }

    img.dataset.elementId = element.id;
    container.appendChild(img);
}
