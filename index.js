const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const h = canvas.height
const w = canvas.width
canvas.style.height = h / 2 + "px"
canvas.style.width = w / 2 + "px"
let simplex = new SimplexNoise()

class Controller {

    constructor(){
        this.time = 0
        this.vectors = []
        this.createVectors()
        this.animate()
    }

    createVectors(a = 0){
        for (let x = 0; x < 1; x+=0.05) {
            for (let y = 0; y < 1; y+=0.05) {
                let vec = new Vecteur(x, y, a)
                this.vectors.push(vec)
            }    
        }
    }

    animate(){
        ctx.clearRect(0,0, h, w)
        this.vectors.forEach((vector) => {
            vector.rotate(simplex.noise3D(vector.position[0], vector.position[1], this.time / 100))
        })
        this.time++;
        requestAnimationFrame(this.animate.bind(this))
    }
}


class Vecteur {

    constructor(x, y, alpha = 0){
        this.position = vec3.fromValues(x, y, alpha)
        this.draw()
    }

    draw(){
        ctx.beginPath()
        ctx.translate(this.position[0] * w, this.position[1] * h)
        ctx.rotate(this.position[2])
        ctx.moveTo(0,0)
        ctx.lineTo(0, 40)
        ctx.stroke()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.closePath()
    }

    rotate(alpha){
        this.position[2] = alpha
        this.draw()
    }

    
}

let controller = new Controller()