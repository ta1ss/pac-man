import MovingDirection from "./movingDirections.js"
export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap

        this.currentMovingDirection = null
        this.requestedMovingDirection = null

        this.pacmanAnimationTimerDefault = 7
        this.pacmanAnimationTimer = null
        this.pacmanRotation = this.Rotation.right

        this.madeFirstMove = false
        this.inputEnabled = true

        this.wakaSound = new Audio('/sounds/waka.wav')
        this.wakaSound.volume = 0.4
        this.powerDotSound = new Audio('/sounds/power_dot.wav')
        this.powerDotSound.volume = 0.4
        this.eatGhostSound = new Audio('/sounds/eat_ghost.wav')
        this.eatGhostSound.volume = 0.4
        this.powerDotActive = false
        this.powerDotAboutToExpire = false
        this.timers = []


        this.eatenGhosts = 0
        document.addEventListener('keydown', this.keydown)

        this.loadPacmanImages()
    }

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3
    }

    draw(started, ghosts) {

        if(!started){
        this.move()
        this.animate()
        }

        this.#eatDot()
        this.#eatPowerDot()
        this.#eatGhost(ghosts)
    
        if (!this.pacmanDiv) {
            this.pacmanDiv = document.createElement('div');
            this.pacmanDiv.id = 'pacman';
            this.pacmanDiv.style.width = `${this.tileSize}px`;
            this.pacmanDiv.style.height = `${this.tileSize}px`;
            this.pacmanDiv.style.backgroundSize = 'contain';
            this.pacmanDiv.style.position = 'absolute';
            document.getElementById('map-container').appendChild(this.pacmanDiv);
        }

        switch (this.currentMovingDirection) {
            case MovingDirection.right:
                this.pacmanRotation = this.Rotation.right;
                break;
            case MovingDirection.down:
                this.pacmanRotation = this.Rotation.down;
                break;
            case MovingDirection.left:
                this.pacmanRotation = this.Rotation.left;
                break;
            case MovingDirection.up:
                this.pacmanRotation = this.Rotation.up;
                break;
            default:
                break;
        }
        
        this.pacmanDiv.style.transform = `rotate(${this.pacmanRotation * 90}deg)`;
        this.pacmanDiv.style.backgroundImage = `url(${this.pacmanImages[this.pacmanImagesIdx].src})`;
        this.pacmanDiv.style.left = `${this.x}px`;
        this.pacmanDiv.style.top = `${this.y}px`;
    }
    
    loadPacmanImages() {
        const pacmanImage1 = new Image()
        pacmanImage1.src = '/media/pac0.png'
        const pacmanImage2 = new Image()
        pacmanImage2.src = '/media/pac1.png'
        const pacmanImage3 = new Image()
        pacmanImage3.src = '/media/pac2.png'
        const pacmanImage4 = new Image()
        pacmanImage4.src = '/media/pac1.png'

        const pacmanRIP = new Image()
        pacmanRIP.src = '/media/rip.png'
        this.pacmanRIP = pacmanRIP

        this.pacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage2]
        this.pacmanImagesIdx = 0
    }

    keydown = (event) => {
        //up arrow
        if(event.keyCode == 38 && this.inputEnabled){
            if(this.currentMovingDirection == MovingDirection.down){
                this.currentMovingDirection = MovingDirection.up;
            }
            this.requestedMovingDirection = MovingDirection.up;
            this.madeFirstMove = true
        }
        //down
        if(event.keyCode == 40 && this.inputEnabled){
            if(this.currentMovingDirection == MovingDirection.up){
                this.currentMovingDirection = MovingDirection.down;
            } 
            this.requestedMovingDirection = MovingDirection.down;
            this.madeFirstMove = true
        }
        //left
        if(event.keyCode == 37 && this.inputEnabled){
            if(this.currentMovingDirection == MovingDirection.right){
                this.currentMovingDirection = MovingDirection.left;
            } 
            this.requestedMovingDirection = MovingDirection.left;
            this.madeFirstMove = true
        }
        //right
        if(event.keyCode == 39 && this.inputEnabled){
            if(this.currentMovingDirection == MovingDirection.left){
                this.currentMovingDirection = MovingDirection.right;
            } 
             this.requestedMovingDirection = MovingDirection.right;
             this.madeFirstMove = true          
        }
    }

    move(){
        if(this.currentMovingDirection !== this.requestedMovingDirection){
            if (Number.isInteger(this.x/this.tileSize) && 
                Number.isInteger(this.y/this.tileSize)
                ){
                    if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.requestedMovingDirection)) {
                        this.currentMovingDirection = this.requestedMovingDirection;
                    }
                
            }
        }
        if (this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
            this.pacmanAnimationTimer = null
            this.pacmanImagesIdx = 1
            return
        } else if (this.currentMovingDirection !== null && this.pacmanAnimationTimer === null) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault
        }

        switch(this.currentMovingDirection){
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left
                break;
            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right
                break;
        }
    } 
    
    
    animate() {
        if (this.pacmanAnimationTimer === null) {
            return
        }
        this.pacmanAnimationTimer--
        if (this.pacmanAnimationTimer === 0) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault
            this.pacmanImagesIdx++
            if (this.pacmanImagesIdx === this.pacmanImages.length) {
                this.pacmanImagesIdx = 0
            }
        }
    }

    animateDeath() {
        const pacmanDeathDiv = document.createElement('div')
        pacmanDeathDiv.id = 'pacman-death'
        pacmanDeathDiv.style.width = `${this.tileSize}px`;
        pacmanDeathDiv.style.height = `${this.tileSize}px`;
        pacmanDeathDiv.style.backgroundSize = 'contain';
        pacmanDeathDiv.style.position = 'absolute';
        pacmanDeathDiv.style.backgroundImage = `url(${this.pacmanRIP.src})`;
        pacmanDeathDiv.style.left = `${this.x}px`;
        pacmanDeathDiv.style.top = `${this.y}px`;
        document.getElementById('map-container').appendChild(pacmanDeathDiv)
    }

    #eatDot() {
        if(this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
            this.wakaSound.play()
        }
    }

    #eatPowerDot() {
        if (this.tileMap.eatPowerDot(this.x, this.y)) {
            this.powerDotSound.play()
            this.powerDotActive = true
            this.powerDotAboutToExpire = false
            this.timers.forEach(timer => clearTimeout(timer))
            this.timers = []

            let powerDotTimer = setTimeout(() => {
                this.powerDotActive = false
                this.powerDotAboutToExpire = false
            }, 1000*6)

            this.timers.push(powerDotTimer)

            let powerDotAboutToExpireTimer = setTimeout(() => {
                this.powerDotAboutToExpire = true
            }, 1000*3)

            this.timers.push(powerDotAboutToExpireTimer)
        }
    }

    #eatGhost(ghosts) {
        if (this.powerDotActive) {
            const collideGhosts = ghosts.filter(ghost => ghost.collideWith(this)) 
            collideGhosts.forEach(ghost => {           
                ghosts.splice(ghosts.indexOf(ghost), 1)
                ghost.ghostDiv.style.visibility = 'hidden'
                this.eatGhostSound.play()
            })    
        }
    }
}
 