class FiltroSepia extends Filtro {
   
    processPixels(data) {
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b =data[i + 2];
            
            data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);  // Red
            data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);  // Green
            data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);  // Blue
        }
    }
}