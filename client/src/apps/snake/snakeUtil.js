export function drawGrid(ctx, hSize, vSize, rectSize, width, height) {
    ctx.strokeStyle = '#999999';
    ctx.beginPath();

    for (let x = 1; x < hSize; x++) {
        ctx.moveTo(x * rectSize, 0);
        ctx.lineTo(x * rectSize, height);
    }

    for (let y = 1; y < vSize; y++) {
        ctx.moveTo(0, y * rectSize);
        ctx.lineTo(width, y * rectSize);
    }

    ctx.closePath();
    ctx.stroke();
};

export function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
};

export function drawRect(ctx, x, y, color, rectSize) {
    ctx.fillStyle = color;
    ctx.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 2, rectSize - 2);
};

export function spawnApple(hSize, vSize, tail) {
    let apple = { x: 0, y: 0 };
    do {
        apple.x = Math.floor(Math.random() * hSize);
        apple.y = Math.floor(Math.random() * vSize);
    } while (tail.segments.some(seg => seg.x === apple.x && seg.y === apple.y));
    return apple;
};
