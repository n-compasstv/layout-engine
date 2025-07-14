import { scaleValue } from '../scale.js';
import { applyCSSProperties } from './utils.js';

export function renderShape(element, container) {
    const useDiv = element.css?.background?.includes('gradient') || element.shapeType === 'slantedRectangle';

    if (useDiv) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.left = scaleValue(element.x) + 'px';
        wrapper.style.top = scaleValue(element.y) + 'px';
        wrapper.style.width = scaleValue(element.width) + 'px';
        wrapper.style.height = scaleValue(element.height) + 'px';
        wrapper.style.opacity = element.opacity;
        wrapper.style.zIndex = element.zIndex;
        wrapper.style.transform = `rotate(${element.rotation}deg)`;

        // Create soft fake shadow if requested
        if (element.css?.clipPath && element.css?.boxShadow) {
            const shadow = document.createElement('div');
            shadow.style.position = 'absolute';
            shadow.style.left = '0px'; // no offset = evenly spread shadow
            shadow.style.top = '0px';
            shadow.style.width = '100%';
            shadow.style.height = '100%';
            shadow.style.background = 'rgba(0, 0, 0, 1)';
            shadow.style.clipPath = element.css.clipPath;
            shadow.style.zIndex = 0;
            shadow.style.transform = 'translate(5px, 5px)';
            wrapper.appendChild(shadow);
        }

        // Create actual slanted div
        const div = document.createElement('div');
        div.className = 'element';
        div.style.position = 'absolute';
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.background = element.css.background;
        div.style.clipPath = element.css.clipPath;
        div.style.zIndex = 1;

        applyCSSProperties(div, element.css, ['background', 'clipPath', 'boxShadow']);

        div.dataset.elementId = element.id;
        wrapper.appendChild(div);
        container.appendChild(wrapper);
        return;
    }

    // Else use canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'element';
    canvas.style.position = 'absolute';

    const width = scaleValue(element.width);
    const height = scaleValue(element.height);
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.style.left = scaleValue(element.x) + 'px';
    canvas.style.top = scaleValue(element.y) + 'px';
    canvas.style.opacity = element.opacity;
    canvas.style.zIndex = element.zIndex;
    canvas.style.transform = `rotate(${element.rotation}deg)`;

    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = element.color || '#000';
    ctx.globalAlpha = element.opacity;

    const shape = element.shapeType || 'rectangle';
    const radius = scaleValue(element.borderRadius || 0);

    switch (shape) {
        case 'rectangle':
            if (radius) {
                ctx.beginPath();
                ctx.roundRect(0, 0, width, height, radius);
                ctx.fill();
            } else {
                ctx.fillRect(0, 0, width, height);
            }
            break;

        case 'circle':
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
            ctx.fill();
            break;

        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(0, height);
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
            break;

        case 'roundedRectangle':
            ctx.beginPath();
            ctx.roundRect(0, 0, width, height, radius);
            ctx.fill();
            break;
    }

    canvas.dataset.elementId = element.id;
    container.appendChild(canvas);
}
