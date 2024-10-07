
/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");


let currentPos = {
    x: 100,
    y: 100
};


/**
 * @returns 
 * @type {Array}
 */
function createArc(startAngle, endAngle, length) {
    let ret = [];
    let steps = 100;
    for (let i = 0; i < 1; i += 1 / steps) {
        ret.push([startAngle * (i - 1) + endAngle * i, length / steps]);
    }
    return ret;
}


let letters = {
    a: {
        p: [
            [20, 20] // 0, Zero is straight right, element 1 is length
        ]
    },
    o: {
        p: [
            [0, 20]
        ]
    },
    e: {
        p: [
            [90 - 24, 20]
        ]
    },
    b: {
        p: [
            [-90 - 16, 20]
        ]
    },
    t: {
        p: [
            ...createArc(0, -90 - 16, 10),
        ]
    },
    d: {
        p: [
            ...createArc(0, -90 - 16, 10),
            [-90 - 16, 20]
        ]
    },
};

function drawLetter(letter) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(currentPos.x, currentPos.y);


    for (segment of letter.p) {
        let rad = segment[0] / 180 * Math.PI;
        let length = segment[1];
        let sx = Math.cos(rad) * length;
        let sy = -Math.sin(rad) * length;
        ctx.lineTo(currentPos.x + sx, currentPos.y + sy);
        currentPos.x += sx;
        currentPos.y += sy;
    }
    ctx.stroke();
    ctx.closePath();
}

let text = "taedabo";

for (c of text) {
    let letter = letters[c];
    drawLetter(letter);
}