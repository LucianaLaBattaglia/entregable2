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

    // Método que procesará los píxeles, será sobreescrito por las subclases
    processPixels(data) {}
}