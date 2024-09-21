
class FiltroNegativo extends Filtro {
    processPixels(data) {
    
        for (let i = 0; i < data.length; i += 4) {
            // Invertir los valores de R, G y B
            data[i] = 255 - data[i];       // Rojo
            data[i + 1] = 255 - data[i + 1]; // Verde
            data[i + 2] = 255 - data[i + 2]; // Azul
            // data[i + 3] se mantiene igual (opacidad)
        }
    }
}