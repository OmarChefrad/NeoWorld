class ViewPort {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx= canvas.getContext("2d");

        this.zoom = 1;

        this.drag = {
            start: new Point(0,0),
            end: new Point(0,0),
            offset: new Point(0,0),
            active: false,

        }

        this.#addEventListeners();
    }

    getMouse(evt){
        return new Point(
            evt.offsetX*this.zoom,
            evt.effsetY*this.zoom,
        );
    }

    #addEventListeners(){
        this.canvas.addEventListeners("mousedown",this.#handleMouseDown.bind(this));
        this.canvas.addEventListeners("mousemove",this.#handleMouseMove.bind(this));
        this.canvas.addEventListeners("mouseup",this.#handleMouseUp.bind(this));
        this.canvas.addEventListeners("mousewheel",this.#handleMouseWheel.bind(this));
    }


    #handleMouseDown(evt){
        if(evt.button == 1){ // middle Mouse
            this.drake.start = this.getMouse(evt);
            this.drag.active = true; 
        }
    }

    #handleMouseMove(evt){
        if(this.drag.active){
            this.drag.end = this.getMouse(evt);
            this.drag.offset = substract(this.drag.end,this.drag.start);
        }
    }

    #handleMouseUp(evt){
        if(this.drag.active){
            this.offset = add(this.offset,this.drag.offset);
            this.drag = {
                start: new Point(0,0),
                end: new Point(0,0),
                offset: new Point(0,0),
                active: false

            }
        }
    }

    #handleMouseWheel(evt){
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
        console.log(evt.deltaY);
    }
}