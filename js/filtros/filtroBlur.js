class FiltroBlur extends Filtro {
    constructor(ctx, width, height) {
        super(ctx, width, height);
    }

    calcularNuevoValorPixel(x, y, data, output) {
        let sumR = 0, sumG = 0, sumB = 0;
        let kernelSum = 0;
    
        // Kernel de blur (3x3 con todos valores de 1)
        const kernel = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ];
    
        for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
                // Extender bordes para evitar valores fuera de los límites
                let offsetX = Math.min(Math.max(x + i, 0), this.width - 1);
                let offsetY = Math.min(Math.max(y + j, 0), this.height - 1);
    
                const index = (offsetY * this.width + offsetX) * 4;
                let value = kernel[j + 1][i + 1];
    
                sumR += data[index] * value;
                sumG += data[index + 1] * value;
                sumB += data[index + 2] * value;
                kernelSum += value;
            }
        }
    
        const newIndex = (y * this.width + x) * 4;
        output[newIndex] = sumR / kernelSum;
        output[newIndex + 1] = sumG / kernelSum;
        output[newIndex + 2] = sumB / kernelSum;
        output[newIndex + 3] = 255; // Mantener la opacidad completa
    }
}