let elementsData = [];

export function setDebugElements(elements) {
    elementsData = elements;
}

export function initDebugPanel() {
    const debugButton = document.getElementById('debugButton');
    const debugPanel = document.getElementById('debugPanel');
    const closeDebug = document.getElementById('closeDebug');
    const renderArea = document.getElementById('renderArea');

    debugButton.addEventListener('click', () => {
        debugPanel.classList.add('open');
        renderArea.classList.add('debug-open');
        populateDebugPanel();
    });

    closeDebug.addEventListener('click', () => {
        debugPanel.classList.remove('open');
        renderArea.classList.remove('debug-open');
        removeHighlights();
    });

    document.addEventListener('click', (e) => {
        if (
            !debugPanel.contains(e.target) &&
            !debugButton.contains(e.target) &&
            !document.getElementById('debugTrigger').contains(e.target)
        ) {
            debugPanel.classList.remove('open');
            renderArea.classList.remove('debug-open');
            removeHighlights();
        }
    });
}

function highlightElement(elementId) {
    document.querySelectorAll('.element').forEach((el) => {
        el.classList.remove('highlight');
    });

    const target = document.querySelector(`[data-element-id="${elementId}"]`);
    if (target) {
        target.classList.add('highlight');
    }
}

function removeHighlights() {
    document.querySelectorAll('.element').forEach((el) => {
        el.classList.remove('highlight');
    });
}

function populateDebugPanel() {
    const debugContent = document.getElementById('debugContent');
    debugContent.innerHTML = '';

    elementsData.forEach((element, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'element-item';

        wrapper.innerHTML = `
      <div class="element-header">
        ${element.type.toUpperCase()} #${index + 1} - ID: ${element.id}
      </div>
      <div class="element-data">
        <pre>${JSON.stringify(element, null, 2)}</pre>
      </div>
    `;

        wrapper.addEventListener('mouseenter', () => highlightElement(element.id));
        wrapper.addEventListener('mouseleave', removeHighlights);

        debugContent.appendChild(wrapper);
    });
}
