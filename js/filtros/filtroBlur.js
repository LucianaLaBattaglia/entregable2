class FiltroBlur extends Filtro {
   
    aplicarFiltro() {
        const width = this.width;
        const height = this.height;
       
        let imageData=ctx.getImageData(0,0,width,height);
        let data= imageData.data;

        let kernel = [];  // Matriz de convolución para el blur


        for(let i=0; i<3; i++){
            kernel[i]=[];
            for(let j=0; j<3;j++){
                kernel[i][j]=1
            }
        }

        let kernelSize=3;
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let sumR = 0, sumG = 0, sumB = 0;
                
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        let offsetX = x + i;
                        let offsetY = y + j;

                        if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
                            const index = (offsetY * width + offsetX) * 4;

                            let value = kernel[j + 1][i + 1];
                            sumR += data[index] * value;
                            sumG += data[index + 1] * value;
                            sumB += data[index + 2] * value;
                        }
                    }
                }

                const newIndex = (y * width + x) * 4;
                data[newIndex] = sumR / 9;
                data[newIndex + 1] = sumG / 9;
                data[newIndex + 2] = sumB / 9;
                data[newIndex + 3] = 255;  // Opacidad completa
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}