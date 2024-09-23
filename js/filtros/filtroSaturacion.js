class FiltroSaturacion extends Filtro {
    constructor(ctx, width, height, factor) {
        super(ctx, width, height);
        this.factor = factor;  // Factor de saturación (1 = sin cambios, >1 = más saturado, <1 = menos saturado)
    }

    processPixels(data) {

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            const avg = (r + g + b) / 3;
            data[i] = avg + (r - avg) * this.factor;
            data[i + 1] = avg + (g - avg) * this.factor;
            data[i + 2] = avg + (b - avg) * this.factor;
        }

    }
}