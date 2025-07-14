import { scaleValue } from '../scale.js';
import { applyCSSProperties } from './utils.js';

export function renderTextContainer(element, container) {
    const box = document.createElement('div');
    box.className = 'element text-container';
    box.style.position = 'absolute';
    box.style.opacity = element.opacity;
    box.style.transform = `rotate(${element.rotation}deg)`;
    box.style.zIndex = element.zIndex;

    // Position
    const left = scaleValue(element.x);
    if (element.y !== undefined) {
        box.style.top = scaleValue(element.y) + 'px';
    } else {
        const pos = element.containerPosition || 'bottom';
        if (pos === 'bottom') box.style.bottom = '30px';
        if (pos === 'top') box.style.top = '0px';
    }

    box.style.left = left + 'px';

    // Width
    if (element.width === '100%') {
        box.style.width = '100vw';
        box.style.left = '0px';
    } else if (typeof element.width === 'string' && element.width.includes('%')) {
        box.style.width = element.width;
    } else {
        box.style.width = scaleValue(element.width) + 'px';
    }

    if (element.containerPadding) {
        box.style.padding = element.containerPadding;
    }

    // Headline
    if (element.headline) {
        const h = document.createElement('div');
        h.className = 'headline';
        h.textContent = element.headline.content.includes('{{') ? 'Loading headline...' : element.headline.content;
        h.style.color = element.headline.color;
        h.style.fontSize = scaleValue(element.headline.fontSize) + 'px';
        h.style.fontWeight = element.headline.fontWeight || 'normal';
        h.style.fontFamily = element.headline.fontFamily || 'inherit';
        h.style.marginBottom = scaleValue(element.headlineSpacing || 16) + 'px';
        if (element.headline.lineHeight) h.style.lineHeight = element.headline.lineHeight;
        if (element.headline.css) applyCSSProperties(h, element.headline.css);
        box.appendChild(h);
    }

    // Subtitle
    if (element.subtitle) {
        const s = document.createElement('div');
        s.className = 'subtitle';
        s.textContent = element.subtitle.content.includes('{{') ? 'Loading subtitle...' : element.subtitle.content;
        s.style.color = element.subtitle.color;
        s.style.fontSize = scaleValue(element.subtitle.fontSize) + 'px';
        s.style.fontWeight = element.subtitle.fontWeight || 'normal';
        s.style.fontFamily = element.subtitle.fontFamily || 'inherit';
        if (element.subtitle.lineHeight) s.style.lineHeight = element.subtitle.lineHeight;
        if (element.subtitle.css) applyCSSProperties(s, element.subtitle.css);
        box.appendChild(s);
    }

    box.dataset.elementId = element.id;
    container.appendChild(box);
}
