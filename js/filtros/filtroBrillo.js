class FiltroBrillo extends Filtro {
    constructor(ctx, widht, height, brillo) {
        super(ctx, widht, height);
        this.brillo = brillo;  // Brillo es un valor de ajuste (puede ser positivo o negativo)
    }

    processPixels(data) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] += this.brillo;     // Red
            data[i + 1] += this.brillo; // Green
            data[i + 2] += this.brillo; // Blue
        }
    }
}