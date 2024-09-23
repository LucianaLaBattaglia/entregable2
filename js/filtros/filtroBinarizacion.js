
class FiltroBinarizacion extends Filtro {
    constructor(ctx, widht, height) {
        super(ctx, widht, height);
    }

    processPixels(data) {
        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            let binValue = avg < 128 ? 0 : 255;
            data[i] = data[i + 1] = data[i + 2] = binValue; // Blanco o negro
        }
    }
}