
/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");


let currentPos = {
    x: 100,
    y: 100
};


let letters = {
    a: {
        p: [
            [20, 20] // 0, Zero is straight right, element 1 is length
        ]
    }
};

function drawLetter(letter) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(currentPos.x, currentPos.y);


    for (segment of letter.p) {
        let rad = segment[0] / 180 * Math.PI;
        let length = segment[1];
        let sx = Math.cos(rad);
        let sy = -Math.sin(rad);
        ctx.lineTo(currentPos.x + sx * length, currentPos.y + sy * length);
        currentPos.x += sx;
        currentPos.y += sy;
    }
    ctx.stroke();
    ctx.closePath();
}

drawLetter(letters.a);