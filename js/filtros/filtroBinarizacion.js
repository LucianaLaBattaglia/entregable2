
class FiltroBinarizacion extends Filtro {
    constructor(ctx, widht, height) {
        super(ctx, widht, height);
    }

    processPixels(pixels) {
        for (let i = 0; i < pixels.length; i += 4) {
            let avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
            let binValue = avg < 128 ? 0 : 255;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = binValue; // Blanco o negro
        }
    }
}