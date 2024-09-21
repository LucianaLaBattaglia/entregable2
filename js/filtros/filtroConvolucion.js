
class FiltroConvolucion extends Filtro {
    constructor(ctx, width, height, kernel) {
        super(ctx, width, height);
        this.kernel = kernel; // Matriz de convolución
    }

    processPixels(data) {
        const output = new Uint8ClampedArray(data.length);
        const width = this.width;
        const height = this.height;

        // Recorremos los píxeles excluyendo los bordes
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let r = 0, g = 0, b = 0;

                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        let offsetX = x + i;
                        let offsetY = y + j;
                        let weight = this.kernel[(j + 1) * 3 + (i + 1)];

                        const index = (offsetY * width + offsetX) * 4;
                        r += data[index] * weight;
                        g += data[index + 1] * weight;
                        b += data[index + 2] * weight;
                    }
                }

                const newIndex = (y * width + x) * 4;
                output[newIndex] = Math.min(Math.max(r, 0), 255);
                output[newIndex + 1] = Math.min(Math.max(g, 0), 255);
                output[newIndex + 2] = Math.min(Math.max(b, 0), 255);
                output[newIndex + 3] = 255; // Mantener la opacidad
            }
        }

        // Actualizamos la imagen con el resultado procesado
        for (let i = 0; i < data.length; i++) {
            data[i] = output[i];
        }
    }
}