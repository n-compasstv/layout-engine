export const REFERENCE_WIDTH = 1920;
export const REFERENCE_HEIGHT = 1080;

let scale = 1;
let scaleX = 1;
let scaleY = 1;

export function calculateScale() {
    const container = document.getElementById('renderContent');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    scaleX = containerWidth / REFERENCE_WIDTH;
    scaleY = containerHeight / REFERENCE_HEIGHT;
    scale = Math.min(scaleX, scaleY);
}

export function scaleValue(value) {
    return value * scale;
}

export function getScale() {
    return scale;
}
