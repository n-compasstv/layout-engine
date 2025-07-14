// Get URL query parameters
export function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        eid: urlParams.get('eid'),
        rid: urlParams.get('rid'),
        from: urlParams.get('from'),
        to: urlParams.get('to'),
        count: urlParams.get('count'),
        noCache: urlParams.get('noCache'),
    };
}

// LocalStorage helpers
export const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
};

// Generic DOM helper
export function updateTextById(id, value, maxLength) {
    const el = document.querySelector(`[data-element-id="${id}"]`);
    if (el && value) {
        el.textContent = maxLength ? value.substring(0, maxLength) : value;
    }
}
