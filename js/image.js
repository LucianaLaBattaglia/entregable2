class Imagen{
    constructor (src, width, height, ctx){
        this.ctx=ctx;
        this.height=height;
        this.width=width;
        this.img = new Image();  // Creamos una instancia de imagen
        this.src= src;
        this.cargada=false;
    }

    
    load(callback) {
        this.img.src = this.src;
        this.img.onload = () => {
            console.log('Imagen cargada');

            // Calcular dimensiones manteniendo proporciones
            let aspectRatio = this.img.width / this.img.height;
            let newWidth, newHeight;

            if (this.width / this.height > aspectRatio) {
                // El canvas es más ancho en relación al alto que la imagen
                newHeight = this.height;
                newWidth = this.height * aspectRatio;
            } else {
                // La imagen es más ancha en relación al alto que el canvas
                newWidth = this.width;
                newHeight = this.width / aspectRatio;
            }

            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Dibujar la imagen ajustada en el canvas
            this.ctx.drawImage(
                this.img,
                (this.width - newWidth) / 2,   // Centramos horizontalmente
                (this.height - newHeight) / 2, // Centramos verticalmente
                newWidth,
                newHeight
            );

            // Si se proporciona un callback, llamarlo después de cargar la imagen
            if (callback) {
                callback();
            }
        };
    }
}