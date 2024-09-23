class Filtro {
    constructor(ctx,width, height) {
        this.ctx = ctx;
        this.width=width;
        this.height=height;
    }


    // Método genérico para aplicar filtro
    aplicarFiltro() {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        this.processPixels(imageData.data);  
        this.ctx.putImageData(imageData, 0, 0);
    }

    aplicarFiltroComplejo() {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let data = imageData.data;
    
        // Crear un buffer temporal para almacenar los píxeles procesados
        let output = [];
    
        for (let y = 0; y < this.height; y++) {  // Iniciar en 0 para incluir los bordes
            for (let x = 0; x < this.width; x++) {  // Iniciar en 0 para incluir los bordes
                // Llamamos al método específico que calcula el nuevo valor del píxel
                this.calcularNuevoValorPixel(x, y, data, output);
            }
        }
    
        // Actualizamos los datos originales con el resultado del filtro
        for (let i = 0; i < data.length; i++) {
            data[i] = output[i];
        }
    
        this.ctx.putImageData(imageData, 0, 0);
    }

    // Método que debe ser sobrescrito en las subclases para aplicar el cálculo de cada filtro
    calcularNuevoValorPixel(x, y, data, output) {
        // Este método será implementado por cada filtro específico
    }

    // Método que procesará los píxeles, será sobreescrito por las subclases
    processPixels(data) {}
}