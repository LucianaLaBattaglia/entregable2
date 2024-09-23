class FiltroDeteccionBordes extends Filtro {
    constructor(ctx, width, height) {
        super(ctx, width, height);
        this.sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        this.sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    }

    calcularNuevoValorPixel(x, y, data, output) {
        let pixelX = 0, pixelY = 0;

        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                let offsetX = x + i;
                let offsetY = y + j;
               let index = (offsetY * this.width + offsetX) * 4;

                let gray = 0.3 * data[index] + 0.59 * data[index + 1] + 0.11 * data[index + 2];
                pixelX += gray * this.sobelX[(j + 1) * 3 + (i + 1)];
                pixelY += gray * this.sobelY[(j + 1) * 3 + (i + 1)];
            }
        }

       let magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
       let scaledMagnitude = Math.min(magnitude, 255);

       let newIndex = (y * this.width + x) * 4;
        output[newIndex] = output[newIndex + 1] = output[newIndex + 2] = scaledMagnitude;
        output[newIndex + 3] = 255; // Mantener la opacidad completa
    }
}