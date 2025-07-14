import { scaleValue } from '../scale.js';
import { applyCSSProperties } from './utils.js';

export function renderText(element, container) {
    const el = document.createElement('div');
    el.className = 'element text-element';
    el.textContent = element.content;

    el.style.position = 'absolute';

    // Handle horizontal and vertical alignment
    let transforms = [];

    if (element.horizontalAlign === 'center') {
        el.style.left = '50%';
        transforms.push('translateX(-50%)');
    } else {
        el.style.left = scaleValue(element.x) + 'px';
    }

    if (element.verticalAlign === 'center') {
        el.style.top = '50%';
        transforms.push('translateY(-50%)');
    } else {
        el.style.top = scaleValue(element.y) + 'px';
    }

    if (element.rotation) {
        transforms.push(`rotate(${element.rotation}deg)`);
    }

    if (transforms.length > 0) {
        el.style.transform = transforms.join(' ');
    }

    // Basic styles
    el.style.color = element.color;
    el.style.fontSize = scaleValue(element.fontSize) + 'px';
    el.style.fontWeight = element.fontWeight || 'normal';
    el.style.fontStyle = element.fontStyle || 'normal';
    el.style.fontFamily = element.fontFamily || 'inherit';
    el.style.opacity = element.opacity;
    el.style.zIndex = element.zIndex;
    el.style.backgroundColor = element.backgroundColor || 'transparent';

    if (element.textAlign) el.style.textAlign = element.textAlign;
    if (element.textShadow) el.style.textShadow = element.textShadow;
    if (element.background) el.style.background = element.background;
    if (element.borderRadius) el.style.borderRadius = scaleValue(element.borderRadius) + 'px';
    if (element.border) el.style.border = element.border;
    if (element.width) el.style.width = scaleValue(element.width) + 'px';
    if (element.height) el.style.height = scaleValue(element.height) + 'px';

    // Padding support
    const paddingX = element.paddingX !== undefined ? scaleValue(element.paddingX) : 0;
    const paddingY = element.paddingY !== undefined ? scaleValue(element.paddingY) : 0;
    if (paddingX || paddingY) {
        el.style.padding = `${paddingY}px ${paddingX}px`;
    }

    if (element.css) {
        applyCSSProperties(el, element.css);
    }

    el.dataset.elementId = element.id;
    container.appendChild(el);
}
