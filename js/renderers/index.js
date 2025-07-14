import { renderText } from './renderText.js';
import { renderImage } from './renderImage.js';
import { renderShape } from './renderShape.js';
import { renderTextContainer } from './renderTextContainer.js';
import { calculateScale } from '../scale.js';
import { setDebugElements } from '../debug.js';

export function renderElements(elements) {
    const container = document.getElementById('renderContent');
    container.innerHTML = '';

    // Save for debug panel
    setDebugElements(elements);

    calculateScale();

    for (const element of elements) {
        switch (element.type) {
            case 'text':
                renderText(element, container);
                break;
            case 'image':
                renderImage(element, container);
                break;
            case 'shape':
                renderShape(element, container);
                break;
            case 'text-container':
                renderTextContainer(element, container);
                break;
        }
    }
}
