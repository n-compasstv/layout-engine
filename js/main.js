import { fetchContentData, fetchElementsTemplate, getCurrentContentIndex } from './data.js';
import { renderElements } from './renderers/index.js';
import { updateElementsWithContentData } from './updateContent.js';
import { initDebugPanel } from './debug.js';

let elementsData = [];
let articlesData = [];
let currentContentIndex = 0;

// Handle window resize
window.addEventListener('resize', () => {
    clearTimeout(window.__resizeTimeout);
    window.__resizeTimeout = setTimeout(() => {
        if (elementsData.length) renderElements(elementsData);
        if (articlesData.length) updateElementsWithContentData(articlesData[currentContentIndex]);
    }, 100);
});

async function init() {
    try {
        const [events, elements] = await Promise.all([fetchContentData(), fetchElementsTemplate()]);

        if (!elements.length) throw new Error('No elements to render');

        elementsData = elements;
        articlesData = events;

        currentContentIndex = getCurrentContentIndex(events);
        const currentEvent = events[currentContentIndex];

        renderElements(elements);
        updateElementsWithContentData(currentEvent);
        initDebugPanel();
    } catch (err) {
        const container = document.getElementById('renderContent');
        container.innerHTML = `
      <div class="loading">
        <div style="text-align:center;">
            <div style="color:#e53e3e;font-size:1.2em;">${err.message}</div>
            <div style="margin-top:10px;font-size:0.9em;color:#666;">Check console for more</div>
        </div
      </div>
    `;
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', init);
