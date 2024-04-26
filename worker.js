onmessage = function(msg){
    const params = msg.data.params;
    if(params.type == "interlaced"){
        const row = msg.data.row;
        postMessage(calculateRow(params.width, params.height, params.widthHeightRatio, params.radius, params.offsetX, params.offsetY, params.iterations, row));
    }
    else if(params.type == "blocks"){
        postMessage(calculateMultipleRows(params.start, params.end, params.width, params.height, params.widthHeightRatio, params.radius, params.offsetX, params.offsetY, params.iterations));
    }
}

function pointIsInMandelbrot(x, y, iterations) {
    let real = x;
    let imag = y;
    for (let i = 0; i < iterations; i++) {
        const realTemp = real * real - imag * imag + x;
        const imagTemp = 2 * real * imag + y;
        if (realTemp * realTemp + imagTemp * imagTemp > 4) {
            return false;
        }
        real = realTemp;
        imag = imagTemp;
    }
    return true;
}

function calculateRow(width, height, widthHeightRatio, radius, offsetX, offsetY, iterations, r){
    let output = [];
    let n = 0;

    for (let i = 0; i < width; i++) {
        const x = -radius * widthHeightRatio + i * radius * widthHeightRatio * 2 / width + offsetX;
        const y =  radius - r * radius * 2 / height  + offsetY;

        if(this.pointIsInMandelbrot(x,y, iterations)){
            output[n] = {x: i, y: r};
            n++;
        }
    }
    return output;
}

function calculateMultipleRows(start, end, width, height, widthHeightRatio, radius, offsetX, offsetY, iterations){
    let output = [];

    for(let i = start; i<=end; i++){
        output = output.concat(calculateRow(width, height, widthHeightRatio, radius, offsetX, offsetY, iterations, i));
    }

    return output;
}