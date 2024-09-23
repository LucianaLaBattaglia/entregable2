
class FiltroEscalaGrises extends Filtro {
    constructor(ctx, widht, height) {
        super(ctx, widht, height);
        
    }
    processPixels(data) {

    // Recorrer todos los píxeles y aplicar la escala de grises
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calcular el valor de gris (promedio)
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;

        // Asignar el valor de gris a cada canal de color
        data[i] = gray;     // Rojo
        data[i + 1] = gray; // Verde
        data[i + 2] = gray; // Azul
        // data[i + 3] es el canal Alpha y se mantiene igual
    }

}
}