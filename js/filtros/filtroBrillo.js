class FiltroBrillo extends Filtro {
    constructor(ctx, widht, height, brillo) {
        super(ctx, widht, height);
        this.brillo = brillo;  // Brillo es un valor de ajuste (puede ser positivo o negativo)
    }

    processPixels(pixels) {
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] += this.brillo;     // Red
            pixels[i + 1] += this.brillo; // Green
            pixels[i + 2] += this.brillo; // Blue
        }
    }
}