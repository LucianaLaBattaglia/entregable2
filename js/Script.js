let canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
/** @type {HTMLCanvasElement} */

canvas.width = window.innerWidth - 380;
canvas.height = 600;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let canvasColor="white"
ctx.fillStyle = canvasColor;
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

let originalImageData = null;  // Variable para almacenar la imagen original


let pen = new Pen(0, 0, 'black', ctx, { lineWidth: 5 });

// Variable para determinar si se está usando la lapiz
isDrawing = true;
// Variable para determinar si se está usando la goma
let isErasing = false;

let mouseDown = false;
let drawingHistory = [];  // Almacena el historial de dibujos
let currentStep = -1;  // Rastrea el paso actual en el historial

// Guarda el estado inicial del canvas al cargar el script
drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
currentStep++;

// Cambiar color
function change_color(color) {

    if (isDrawing && !isErasing) { 
    pen.changeColor(color);
}
}
// Cambiar ancho de la línea
function change_LineWidth(newWidth) {
    pen.changeLineWidth(newWidth);
}


function RestablecerRangos(){
    pen.changeColor('black');
    pen.changeLineWidth(5);
    document.getElementById("lineWidth").value = 5;  // Valor medio de linea
    document.getElementById("brilloRange").value = 0;  // Valor medio de brillo
    document.getElementById("saturacionRange").value = 100;  // Valor medio de saturación

}



// Función para limpiar el canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);


    drawingHistory = [];  // Limpiamos el historial
    currentStep = -1;
    originalImageData = null;  // Eliminar la imagen original

    drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));  // Guardamos el estado inicial
    currentStep++;

    // Restablecer los rangos 
    
   RestablecerRangos();
    
    // Restablecer el input de archivo para permitir cargar la misma imagen
    document.getElementById('imageInput').value = '';



}

// Función para deshacer la última acción
function undo() {
    
    if (currentStep > 0) {
        currentStep--;
        let previousState = drawingHistory[currentStep];

        if (originalImageData && currentStep === 0) {
            // Restaurar la imagen original en lugar de limpiar el canvas
            ctx.putImageData(originalImageData, 0, 0);
        } else {
            ctx.putImageData(previousState, 0, 0);
        }
    } else if (currentStep === 0 && originalImageData) {
        // Si ya estás en el primer paso y hay una imagen original, restaura esa imagen
        ctx.putImageData(originalImageData, 0, 0);
    }

    RestablecerRangos();
}


// Activar modo lápiz
function activatePen() {
    isDrawing = true;
    isErasing = false;
    pen.changeColor('black');  // Restablece el color del lápiz
    pen.changeLineWidth(5); 
}

// Activar modo goma
function activateEraser() {
    isDrawing = true;
    isErasing = true;
    pen.changeColor(canvasColor);  // Cambia el color al color del canvas
    pen.changeLineWidth(20);  
}

// Event listener para cambiar entre lápiz y goma
document.getElementById('penButton').addEventListener('click', activatePen);
document.getElementById('eraserButton').addEventListener('click', activateEraser);



canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {  // Solo dibuja si el lápiz o la goma están activos
        mouseDown = true;
        let posx = e.clientX - canvas.offsetLeft;
        let posy = e.clientY - canvas.offsetTop;
        pen.startDrawing(posx, posy);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        let posx = e.clientX - canvas.offsetLeft;
        let posy = e.clientY - canvas.offsetTop;
        pen.continueDrawing(posx, posy);
    }
});

document.addEventListener('mouseup', () => {
    if (mouseDown) {
        mouseDown = false;
        pen.stopDrawing();
    }
    // Guarda el estado del canvas solo cuando se termina el trazo
    if (currentStep < drawingHistory.length - 1) {
        drawingHistory.length = currentStep + 1;  // Elimina estados futuros si dibujas luego de deshacer
    }

    drawingHistory.push(ctx.getImageData(0, 0, canvasWidth, canvasHeight));
    currentStep++;
});


document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        let src = URL.createObjectURL(file);
        let image = new Imagen(src, canvasWidth, canvasHeight, ctx);

        // Llamar al método load para cargar y dibujar la imagen en el canvas
        image.load(() => {
            // Después de que la imagen esté completamente cargada
            originalImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);  // Guarda el estado original de la imagen
            drawingHistory = [];  // Limpiamos el historial
            currentStep = -1;

            // Guardar la imagen original en el historial
            drawingHistory.push(originalImageData);
            currentStep++;

          
        });
    }
});

document.getElementById('uploadImageButton').addEventListener('click', function() {
    document.getElementById('imageInput').click();  // Dispara el input de archivo
});






function aplicarFiltroBrillo() {
    
    if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);  // Restablece la imagen original antes de aplicar el filtro
    }
    let brilloValor = document.getElementById("brilloRange").value;
    let filtroBrillo = new FiltroBrillo(ctx, canvasWidth, canvasHeight, parseInt(brilloValor));
    filtroBrillo.aplicarFiltro();
    };

function aplicarFiltroNegativo() {
    console.log('hola');
    let filtroNegativo = new FiltroNegativo(ctx, canvasWidth, canvasHeight);
    filtroNegativo.aplicarFiltro();

};
function aplicarFiltroBinarizacion() {
   let filtroBinarizacion = new FiltroBinarizacion(ctx, canvasWidth, canvasHeight);
    filtroBinarizacion.aplicarFiltro();
};

function aplicarFiltroSepia() {
    let filtroSepia = new FiltroSepia(ctx, canvasWidth, canvasHeight);
    filtroSepia.aplicarFiltro();
};
function aplicarFiltroBlur() {
    let filtroBlur = new FiltroBlur(ctx, canvasWidth, canvasHeight);
    filtroBlur.aplicarFiltro();
};
function aplicarFiltroSaturacion() {
    if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);  // Restablece la imagen original antes de aplicar el filtro
    }
    const saturacionValor = document.getElementById("saturacionRange").value;
    const factor = saturacionValor / 50;
    const filtroSaturacion = new FiltroSaturacion(ctx, canvasWidth, canvasHeight, factor);
    filtroSaturacion.aplicarFiltro();
}

function aplicarFiltroDeteccionBordes() {
    let filtroDeteccionBordes = new FiltroDeteccionBordes(ctx, canvasWidth, canvasHeight);
    filtroDeteccionBordes.aplicarFiltro();
}

// Función para aplicar el filtro de convolución
function aplicarFiltroConvolucion() {
    const kernel = [
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    ];
    const filtroConvolucion = new FiltroConvolucion(ctx, canvasWidth, canvasHeight, kernel);
    filtroConvolucion.aplicarFiltro();
}

document.getElementById('saveButton').addEventListener('click', function() {
    // Convierte el canvas a una imagen en formato PNG
    const imageData = canvas.toDataURL("image/png");
    
    // Crea un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'mi_dibujo.png';  // Nombre del archivo que se descargará
    
    // Simula un clic en el enlace para iniciar la descarga
    link.click();
});


