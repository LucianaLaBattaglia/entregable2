
class FiltroConvolucion extends Filtro {
    constructor(ctx, width, height) {
        super(ctx, width, height);
        this.kernel = [
            -1, -1, -1,
            -1,  8, -1,
            -1, -1, -1
        ];
    }

    calcularNuevoValorPixel(x, y, data, output) {
        let sumR = 0, sumG = 0, sumB = 0;
        let kernelSize = 3;
        
        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                let offsetX = x + i;
                let offsetY = y + j;
                const index = (offsetY * this.width + offsetX) * 4;
                let weight = this.kernel[(j + 1) * kernelSize + (i + 1)];

                sumR += data[index] * weight;
                sumG += data[index + 1] * weight;
                sumB += data[index + 2] * weight;
            }
        }

        const newIndex = (y * this.width + x) * 4;
        output[newIndex] = Math.min(Math.max(sumR, 0), 255);
        output[newIndex + 1] = Math.min(Math.max(sumG, 0), 255);
        output[newIndex + 2] = Math.min(Math.max(sumB, 0), 255);
        output[newIndex + 3] = 255; // Mantener la opacidad completa
    }
}