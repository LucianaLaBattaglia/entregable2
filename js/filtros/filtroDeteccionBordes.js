class FiltroDeteccionBordes extends Filtro {
    aplicarFiltro() {
        const width = this.width;
        const height = this.height;
        const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
        
        let imageData=this.ctx.getImageData(0,0,width,height);
        let data= imageData.data;

        let kernel = [];  // Matriz de convolución para el blur

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let pixelX = 0, pixelY = 0;

                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {

                        let offsetX = x + i;
                        let offsetY = y + j;

                        if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
                            const index = (offsetY * width + offsetX) * 4;

                            const gray = 0.3 * data[index] + 0.59 * data[index + 1] + 0.11 * data[index + 2];
                            pixelX += gray * sobelX[(j + 1) * 3 + (i + 1)];
                            pixelY += gray * sobelY[(j + 1) * 3 + (i + 1)];
                    }
                }
                const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
                const scaledMagnitude = Math.min(magnitude, 255);

                const newIndex = (y * width + x) * 4;
                data[newIndex] = data[newIndex + 1] = data[newIndex + 2] = magnitude;
               data[newIndex + 3] = 255;  // Opacidad completa
            }
        }

       
        this.ctx.putImageData(imageData, 0, 0);

    }
}
}