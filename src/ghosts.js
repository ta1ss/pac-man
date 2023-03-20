import MovingDirection from "./movingDirections.js"

export default class Ghost {
    constructor(x, y, tileSize, velocity, tileMap) { 
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap

        this.#loadImages()

        this.MovingDirection = Math.floor(Math.random() * 4) 
        this.directionTimerDef = this.#random(1, 5)
        this.directionTimer = this.directionTimerDef

        this.scaredAboutToExpireTimerDefault = 10
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault
    }

    draw(started, pacman) {
        if (!started) {
            this.#move()
            this.#changeDirection()
        }

        this.#setImage(pacman)
        
        if (!this.ghostDiv) {
            this.ghostDiv = document.createElement('div');
            this.ghostDiv.id = 'ghost';
            this.ghostDiv.style.width = `${this.tileSize}px`;
            this.ghostDiv.style.height = `${this.tileSize}px`;
            this.ghostDiv.style.backgroundSize = 'contain';
            this.ghostDiv.style.position = 'absolute';
            document.getElementById('map-container').appendChild(this.ghostDiv);
        }

        this.ghostDiv.style.backgroundImage = `url(${this.image.src})`;
        this.ghostDiv.style.left = `${this.x}px`;
        this.ghostDiv.style.top = `${this.y}px`;

    }

    collideWith(pacman) {
        
        const size = this.tileSize/1.5
        if (this.x < pacman.x + size && 
            this.x + size > pacman.x &&
            this.y < pacman.y + size &&
            this.y + size > pacman.y) {
                return true
            } else {
                return false
            }
    }

    #setImage(pacman) {
        if (pacman.powerDotActive) {
            this.#setImageWhenPowerDotActive(pacman)
        } else {
            this.image = this.normalGhost
        }
    }

    #setImageWhenPowerDotActive(pacman) {
        if(pacman.powerDotAboutToExpire) {
            this.scaredAboutToExpireTimer--
            if (this.scaredAboutToExpireTimer === 0) {
                this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault
                if (this.image === this.scaredGhost) {
                    this.image = this.scaredGhost2
                } else {
                    this.image = this.scaredGhost
                }
            }
        } else {
            this.image = this.scaredGhost
        }
    }

    #move() {
        if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.MovingDirection)) {
            switch(this.MovingDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity
                    break
                case MovingDirection.down:
                    this.y += this.velocity
                    break
                case MovingDirection.left:
                    this.x -= this.velocity
                    break
                case MovingDirection.right:
                    this.x += this.velocity
                    break
            }
        }
    }

    #changeDirection() {
        this.directionTimer--
        let newDirection = null
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDef
            newDirection = Math.floor(Math.random() * 4)
        }

        if (newDirection != null && this.moveDirection != newDirection) {
            if (Number.isInteger(this.x / this.tileSize) && (Number.isInteger(this.y / this.tileSize))) {
                if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, newDirection)) {
                    this.MovingDirection = newDirection
                }
            }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    #loadImages() {
        this.normalGhost = new Image()
        this.normalGhost.src = '/media/ghost.png'

        this.scaredGhost = new Image()
        this.scaredGhost.src = '/media/scaredGhost.png'

        this.scaredGhost2 = new Image()
        this.scaredGhost2.src = '/media/scaredGhost2.png'

        this.image = this.normalGhost
    }
}