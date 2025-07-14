import { scaleValue } from '../scale.js';

export function applyCSSProperties(el, css, excludeKeys = []) {
    Object.entries(css).forEach(([key, value]) => {
        if (excludeKeys.includes(key)) return;

        const scalable = [
            'fontSize',
            'width',
            'height',
            'left',
            'top',
            'padding',
            'margin',
            'borderRadius',
            'borderWidth',
        ];

        if (scalable.includes(key) && typeof value === 'number') {
            el.style[key] = scaleValue(value) + 'px';
        } else if ((key === 'padding' || key === 'margin') && typeof value === 'string') {
            el.style[key] = value.replace(/(\d+)px/g, (_, num) => scaleValue(Number(num)) + 'px');
        } else {
            el.style[key] = value;
        }
    });
}
