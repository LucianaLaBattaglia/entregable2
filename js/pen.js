class Pen{

constructor(posX, posY, fill, ctx, style){
    this.antPosX=posX;
    this.antPosY=posY;
    this.posX=posX;
    this.posY=posY;
    this.fill=fill;
    this.ctx=ctx;
    this.style=style;
}



    // Método para comenzar el trazo
    startDrawing(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.antPosX = posX;
        this.antPosY = posY;
        this.ctx.beginPath();
        this.ctx.moveTo(posX, posY);
    }

    // Método para continuar dibujando
    continueDrawing(newX, newY) {
        this.drawLine(newX, newY);
    }
    
    
    // Método que efectivamente dibuja la línea
    drawLine(newX, newY) {
        this.ctx.strokeStyle = this.fill;
        this.ctx.lineWidth = this.style.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(this.antPosX, this.antPosY);
        this.ctx.lineTo(newX, newY);
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        this.antPosX = newX;
        this.antPosY = newY;
    }

    // Método para detener el trazo
    stopDrawing() {
        this.ctx.closePath();
    }

    // Cambiar color del lápiz
    changeColor(newColor) {
        this.fill = newColor;
    }

    // Cambiar grosor del lápiz
    changeLineWidth(newWidth) {
        this.style.lineWidth = newWidth;
    }
    }










