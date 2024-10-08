
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
 * @type {Array.<Number>}
 */
function createArc(startAngle, endAngle, length) {
    let ret = [];
    let steps = 100;
    for (let i = 0; i < 1; i += 1 / steps) {
        ret.push([startAngle * (i - 1) + endAngle * i, length / steps]);
    }
    return ret;
}


/**
 * typedef {[Number, Number]} NumberPair
 */

/**
 * @typedef {Object} Letter
 * @property {Array.<Array.<NumberPair>>} p
 */


let dir = {
    a: 20,
    o: 0,
    e: 90 - 24,
    b: -90 - 16,
    p: 20 + 180,
}

/** @type Array.<Letter> */
let letters = {
    a: {
        p: [
            [dir.a, 20] // 0, Zero is straight right, element 1 is length
        ]
    },
    o: {
        p: [
            [dir.o, 20]
        ]
    },
    e: {
        p: [
            [dir.e, 20]
        ]
    },
    b: {
        p: [
            [dir.b, 20]
        ]
    },
    t: {
        p: [
            ...createArc(dir.a, dir.b, 10),
        ]
    },
    d: {
        p: [
            ...createArc(dir.a, dir.b, 10),
            [dir.b, 20]
        ]
    },
    p: {
        p: [
            ...createArc(dir.p, dir.b, 10),
            [dir.b, 20],
        ]
    },
    h: {
        p: [
            [dir.b, 20],
            ...createArc(dir.b, dir.a, 15),
        ]
    },
};

function doLetter(letter, callback) {
    for (segment of letter.p) {
        let rad = segment[0] / 180 * Math.PI;
        let length = segment[1];
        let sx = Math.cos(rad) * length;
        let sy = -Math.sin(rad) * length;
        // ctx.lineTo(currentPos.x + sx, currentPos.y + sy);
        currentPos.x += sx;
        currentPos.y += sy;
        callback(currentPos.x, currentPos.y);
    }
}

let text = "he taedaboapa";

function doText(text, setup, end, callback) {
    setup();

    for (c of text) {
        let letter = letters[c];
        doLetter(letter, callback);
    }

    end();
}


function drawText(text) {
    function end() {
        ctx.stroke();
        ctx.closePath();
    }

    function setup() {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(currentPos.x, currentPos.y);
    }

    function callback(x, y) {
        ctx.lineTo(x, y);
    }

    let texts = text.split(" ");

    for (let t of texts) {
        currentPos.x += 20;
        currentPos.y = 100;
        doText(t, setup, end, callback);
    }
}

drawText(text);