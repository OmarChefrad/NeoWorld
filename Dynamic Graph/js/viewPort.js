class ViewPort {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx= canvas.getContext("2d");

        this.zoom = 1;

        this.#addEventListeners();
    }

    getMouse(evt){
        return new Point(
            evt.offsetX*this.zoom,
            evt.effsetY*this.zoom,
        );
    }

    #addEventListeners(){
        this.canvas.addEventListeners("mousewheel",this.#handleMouseWheel.bind(this));
    }

    #handleMouseWheel(evt){
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
        console.log(evt.deltaY);
    }
}