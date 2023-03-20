import Pacman from './pacman.js'
import MovingDirection from './movingDirections.js'
import Ghost from './ghosts.js'


export default class TileMap {
    constructor(tileSize, campaign) {
        this.tileSize = tileSize
        this.score = -10;
        this.yellowDot = new Image()
        this.yellowDot.src = "/media/yellowDot.png"

        this.pinkDot = new Image()
        this.pinkDot.src = "/media/pinkDot.png"

        this.blackSquare = new Image()
        this.blackSquare.src = "/media/blacksquare.png" 

        this.wall = new Image()
        this.wall.src = "/media/wallblue.png"

        this.powerDot = this.pinkDot
        this.powerDotAnimationDefault = 30
        this.PowerDotAnimation = this.powerDotAnimationDefault

        this.pacmanStart = []
        this.ghostStart = []
        this.powerDotStart = []
        
        this.campaign = campaign

        this.ghostCount = 0
        this.allMaps = []

        this.campaignMaps = [ 
            // // level 1
            [   
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7],
                [7, 7, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 7, 7, 7],
                [7, 7, 1, 1, 4, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 7, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 7, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], 
            ],

            // level 2
            [
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 1, 1, 2, 0, 0, 0, 0, 1, 0, 0, 4, 0, 6, 1, 1, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],

            // level 3
            [
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 6, 1, 1, 0, 0, 0, 6, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 2, 0, 1, 0, 0, 0, 6, 2, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 4, 1, 1, 0, 0, 6, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
            ],

            // level 4
            [
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [1, 1, 1, 1, 1, 7, 7, 7, 1, 1, 1, 7, 7, 7, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 0, 6, 0, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
                [1, 2, 0, 6, 1, 1, 0, 0, 0, 2, 0, 0, 0, 1, 1, 6, 0, 2, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 6, 0, 0, 2, 0, 4, 0, 2, 0, 0, 6, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 1, 7, 7, 7, 7, 1, 0, 1, 0, 1, 7, 7, 7, 7, 1, 0, 1],
                [1, 6, 1, 7, 7, 7, 7, 1, 6, 0, 6, 1, 7, 7, 7, 7, 1, 6, 1],
                [7, 1, 7, 7, 7, 7, 7, 7, 1, 1, 1, 7, 7, 7, 7, 7, 7, 1, 7],
            ],

            // level 5
            [
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 1, 1, 4, 1, 1, 1, 1, 6, 1, 1, 1, 1, 2, 1, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 1, 5, 0, 5, 1, 7, 7],
                [7, 7, 1, 1, 6, 1, 1, 1, 1, 2, 1, 1, 1, 1, 6, 1, 1, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ],
            
            // level 6
            [
                [1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1],
                [1, 6, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 6, 1],
                [1, 0, 0, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 0, 0, 1],
                [1, 1, 0, 0, 0, 1, 7, 7, 7, 7, 7, 7, 7, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 7, 7, 7, 1, 1, 0, 0, 1, 1, 1, 1],
                [1, 6, 0, 0, 1, 0, 0, 6, 1, 7, 1, 6, 0, 0, 1, 0, 0, 6, 1],
                [1, 0, 1, 0, 2, 0, 1, 0, 1, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 0, 4, 0, 1, 1, 1, 1, 0, 1, 1, 1],
                [7, 7, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 7, 7],
                [7, 7, 1, 6, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 6, 1, 7, 7],
                [7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ],
            // level 7
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1],
                [1, 1, 0, 1, 0, 1, 1, 1, 0, 6, 1, 1, 1, 6, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                [1, 0, 1, 1, 0, 6, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                [1, 6, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 1, 1],
                [1, 0, 1, 1, 1, 2, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 1, 0, 0, 0, 1, 1, 6, 1, 6, 0, 0, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 6, 0, 1],
                [1, 1, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
                [1, 1, 0, 1, 6, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 1, 2, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 2, 0, 1],
                [1, 4, 0, 1, 1, 1, 2, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],

            // level 8
            [   
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 2, 1],
                [1, 1, 6, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                [1, 1, 0, 1, 1, 1, 0, 0, 6, 1, 1, 0, 1, 0, 1, 6, 1, 0, 1],
                [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 6, 1],
                [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
                [1, 2, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1, 6, 0, 0, 1, 6, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 6, 0, 1, 0, 1, 1, 2, 0, 0, 1, 0, 0, 2, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 2, 0, 0, 0, 0, 6, 1, 1, 6, 0, 0, 0, 0, 0, 0, 0, 4, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
        ]

        this.regularMaps = [
            [
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 6, 1, 1, 0, 6, 0, 1, 2, 1, 0, 0, 0, 6, 6, 4, 2, 1],
                [1, 1, 0, 2, 0, 0, 1, 0, 6, 0, 0, 6, 1, 6, 1, 1, 1, 1, 1],
                [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 6, 1, 0, 0, 6, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ],
            [   
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
                [7, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 6, 0, 0, 0, 1, 2, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 1, 2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 0, 1, 2, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 4, 1, 1, 6, 0, 6, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 0, 1, 2, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 7],
                [7, 1, 0, 0, 0, 0, 0, 1, 2, 0, 1, 6, 0, 0, 0, 1, 6, 1, 7],
                [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ],
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 1, 2, 1, 0, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 1],
                [1, 2, 1, 1, 0, 1, 1, 0, 6, 1, 6, 0, 1, 1, 1, 0, 6, 2, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 6, 1, 0, 1],
                [1, 6, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 6, 0, 1],
                [1, 0, 1, 1, 0, 1, 6, 0, 6, 2, 6, 0, 6, 1, 2, 1, 1, 0, 1],
                [1, 6, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 6, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
                [1, 6, 1, 1, 0, 1, 6, 0, 1, 1, 1, 0, 6, 1, 0, 1, 6, 0, 1],
                [1, 0, 1, 6, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 6, 1, 0, 1],
                [1, 2, 1, 1, 0, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 0, 6, 2, 1],
                [1, 6, 0, 0, 0, 0, 0, 2, 1, 6, 1, 1, 1, 1, 1, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
            [   
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 0, 1],
                [1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1],
                [1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1],
                [1, 5, 1, 6, 5, 5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 6, 1, 5, 1],
                [1, 5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 1, 5, 1],
                [1, 5, 1, 5, 5, 6, 1, 1, 1, 1, 1, 1, 1, 6, 5, 5, 1, 5, 1],
                [1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 1],
                [1, 5, 1, 5, 5, 5, 1, 1, 1, 4, 1, 1, 1, 5, 5, 5, 1, 5, 1],
                [1, 5, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 5, 1],
                [1, 5, 1, 5, 5, 5, 1, 1, 1, 5, 1, 1, 1, 5, 5, 5, 1, 5, 1],
                [1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1],
                [1, 0, 1, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
            [   
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                [7, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 7],
                [7, 1, 6, 0, 0, 6, 1, 7, 7, 7, 7, 7, 1, 6, 0, 0, 6, 1, 7],
                [7, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 7],
                [7, 1, 0, 6, 6, 0, 1, 7, 7, 7, 7, 7, 1, 0, 6, 6, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 1, 7, 7, 7, 7, 7, 1, 0, 1, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 1, 7],
                [7, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 7],
                [7, 1, 4, 0, 0, 0, 1, 7, 7, 7, 7, 7, 1, 6, 0, 0, 6, 1, 7],
                [7, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 7],
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            ],
            [   
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 4, 1, 5, 5, 5, 5, 5, 5, 5, 5, 6, 5, 2, 5, 5, 5, 6, 1],
                [1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
                [1, 5, 1, 2, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 5, 1],
                [1, 5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 5, 1],
                [1, 5, 1, 5, 1, 6, 0, 0, 0, 0, 0, 0, 0, 6, 1, 5, 1, 5, 1],
                [1, 5, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 2, 1],
                [1, 5, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 5, 1],
                [1, 2, 1, 5, 1, 6, 0, 0, 0, 0, 0, 0, 0, 6, 1, 5, 1, 5, 1],
                [1, 5, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 5, 1],
                [1, 5, 1, 5, 5, 5, 5, 2, 5, 5, 5, 5, 6, 5, 5, 5, 1, 5, 1],
                [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
                [1, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 6, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
            [   
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 6, 0, 0, 0, 2, 0, 0, 0, 6, 1, 1, 1, 6, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 6, 1, 0, 0, 1, 0, 0, 1, 1, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
                [1, 0, 1, 1, 0, 2, 0, 1, 1, 0, 1, 1, 1, 6, 1, 1, 0, 0, 1],
                [1, 6, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 6, 1, 1, 0, 0, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
                [1, 6, 0, 0, 0, 2, 0, 0, 0, 6, 1, 0, 0, 1, 0, 0, 1, 1, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                [1, 6, 0, 0, 0, 2, 0, 0, 0, 6, 1, 6, 0, 0, 0, 6, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
            [
                [7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 1, 6, 0, 0, 0, 6, 1, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 1, 0, 1, 0, 1, 0, 1, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 1, 0, 1, 2, 1, 0, 1, 7, 7, 7, 7, 7, 7],
                [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 6, 0, 6, 0, 0, 6, 0, 0, 4, 0, 0, 6, 0, 0, 6, 0, 6, 1],
                [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
                [1, 6, 0, 6, 0, 0, 6, 0, 0, 2, 0, 0, 6, 0, 0, 6, 0, 6, 1],
                [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
                [7, 7, 7, 7, 7, 7, 1, 0, 1, 2, 1, 0, 1, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 1, 0, 1, 0, 1, 0, 1, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 1, 6, 0, 0, 0, 6, 1, 7, 7, 7, 7, 7, 7],
                [7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 7],
            ],
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 6, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 5, 1, 1, 0, 0, 1],
                [1, 1, 1, 0, 0, 1, 5, 1, 0, 0, 0, 1, 5, 5, 5, 5, 1, 0, 1],
                [1, 1, 0, 0, 1, 5, 5, 5, 1, 0, 0, 1, 5, 5, 5, 5, 1, 0, 1],
                [1, 6, 6, 1, 5, 5, 5, 5, 5, 1, 6, 0, 1, 1, 1, 1, 0, 0, 1],
                [1, 6, 6, 1, 5, 5, 5, 5, 5, 1, 6, 2, 0, 0, 0, 0, 0, 4, 1],
                [1, 1, 0, 0, 1, 5, 5, 5, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
                [1, 1, 1, 0, 0, 1, 5, 1, 0, 0, 1, 1, 5, 5, 5, 5, 1, 0, 1],
                [1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5, 5, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 6, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
        ]

        this.campaignPages = [
            "Enter your name and name of someone you don't like",
            "You are transported back to a simpler time, a time when arcades ruled the world and the only thing that mattered was getting the high score on your favourite game. You are 12 years old, and you are the high score holder of your local Pac-Man arcade. You've spent countless hours perfecting your skills, memorizing the patterns and mastering the art of dodging ghosts.",
            "One day, as you're walking past your beloved Pac-Man machine, you glance over at the high score table and your heart sinks. Someone has beaten your score, shattering your dreams of being the top dog in your arcade. You feel a sense of terror wash over you as you realize that your reign as the Pac-Man champion may be over...",
            "Your heart races as you stare at the high score table in disbelief. Your name, once perched atop the leaderboard like a king on his throne, has been dethroned by some unknown challenger. Sweat beads on your forehead as you frantically rummage through your pockets, searching for any sign of a quarter. Your hands shake as you finally find one, and with a trembling hand, you insert it into the machine. The screen flickers to life, and with a deep breath, you begin your quest to reclaim your crown.",
        ]
        this.currentCampaignPage = 0

        if(this.campaign){
            this.allMaps = [];
            this.allMaps = JSON.parse(JSON.stringify(this.campaignMaps));
        } else {
            this.allMaps = [];
            this.allMaps = JSON.parse(JSON.stringify(this.regularMaps));
            this.allMaps = this.shuffleMaps(this.allMaps);
        }

        this.currentLevel = 0
        this.mapsLenght = this.allMaps.length
        this.map = this.allMaps[this.currentLevel]

    }

    getPacman(velocity) {
        for (let row=0; row < this.map.length; row++) {
            for (let col=0; col < this.map[row].length; col++) {
                if (this.map[row][col] === 4) {
                    this.ghostCount++
                    this.pacmanStart.push([row, col])
                    this.map[row][col] = 0
                    return new Pacman(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this)
                }
            }
        }
    }

    getGhost(velocity) {
        const ghosts = []
        for (let row=0; row < this.map.length; row++) {
            for (let col=0; col < this.map[row].length; col++) {
                const tile = this.map[row][col]
                if (tile === 6) {
                    this.ghostStart.push([row, col])
                    this.map[row][col] = 0
                    ghosts.push(new Ghost(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this))
                }
            }
        }
        return ghosts
    }

    getPowerDotStart(){
        for (let row=0; row < this.map.length; row++) {
            for (let col=0; col < this.map[row].length; col++) {
                const tile = this.map[row][col]
                if (tile === 2) {
                    this.powerDotStart.push([row, col])
                }
            }
        }
    }

    shuffleMaps(maps) {
        const shuffledMaps = maps.slice();
      
        for (let i = shuffledMaps.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledMaps[i], shuffledMaps[j]] = [shuffledMaps[j], shuffledMaps[i]];
        }
        return shuffledMaps;
    }

    reviveGhost(ghosts, velocity) {
        ghosts.push(new Ghost(0 * this.tileSize, 0 * this.tileSize, this.tileSize, velocity, this))
        return ghosts
    }


    initializeMap() {
    const container = document.getElementById('map-container');    
    container.style.width = `${this.map[0].length * this.tileSize}px`;
    container.style.height = `${this.map.length * this.tileSize}px`;
    }

    prevMap = [];
    draw() {
        const container = document.getElementById('map-container');  
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if(this.prevMap.length > 0){
                    if(this.prevMap[y][x] !== this.map[y][x]) {
                        const tile = document.getElementById(`${y}-${x}`);
                        const tileImg = tile.getElementsByTagName('img')[0];
                        if (tile) {
                            if(this.map[y][x] === 0) {  
                                tileImg.src = this.yellowDot.src
                            }
                            if(this.map[y][x] === 1) {
                                tileImg.src = this.wall.src
                            }
                            if(this.map[y][x] === 5) {
                                tileImg.src = this.blackSquare.src
                            }
                            if(this.map[y][x] === 2) {
                                tileImg.src = this.pinkDot.src
                            }
                    
                        } else {
                            const tile = document.createElement('div');
                            tile.id = `${y}-${x}`;
                            tile.style.left = `${x * this.tileSize}px`;
                            tile.style.top = `${y * this.tileSize}px`;
                            tile.className = 'tile' 
                            if(this.map[y][x] === 0) {
                                tile.src = this.yellowDot.src
                            } else if(this.map[y][x] === 1) {
                                tile.src = this.wall.src
                            } 
                            container.appendChild(tile);
                        }
                    }
                } else {
                    const tile = document.createElement('div');
                    const tileImg = document.createElement('img');
                    tile.id = `${y}-${x}`;
                    tile.style.left = `${x * this.tileSize}px`;
                    tile.style.top = `${y * this.tileSize}px`;
                    tile.className = 'tile' 
                    if(this.map[y][x] === 0) {
                        tileImg.src = this.yellowDot.src
                    } 
                    if(this.map[y][x] === 1) {
                        tileImg.src = this.wall.src
                    } 
                    if (this.map[y][x] === 2) {
                        this.powerDotStart.push([y, x])
                        tileImg.src = this.pinkDot.src
                    }
                    if (this.map[y][x] === 5) {
                        tileImg.src = this.blackSquare.src
                    }
                    tile.appendChild(tileImg);
                    container.appendChild(tile);
                }
                
            }
            
        }
        this.prevMap = this.map.map(innerArr => innerArr.slice());
    } 

    resetMap() {
        const container = document.getElementById('map-container'); 
        container.innerHTML = ''
        this.powerDotStart = []
        this.prevMap = []
        this.ghostStart = []

        if (this.campaign) {
            this.map = this.allMaps[this.currentLevel]
        } else {
            this.map = this.regularMaps[this.currentLevel]
        }
    }  

    didWin() {
        return this.map.flat().filter(tile => tile === 0).length === 0;
    }
      
    didCollideWithEnvironment(x, y, direction) {

        if (direction == null) {
            return
        }

        if (Number.isInteger(x / this.tileSize) && (Number.isInteger(y / this.tileSize))) {
            let col = 0
            let row = 0
            let nextCol = 0
            let nextRow = 0

            switch (direction) {
                case MovingDirection.right:
                    nextCol = x + this.tileSize
                    col = nextCol / this.tileSize
                    row = y / this.tileSize
                    break
                
                case MovingDirection.left:
                    nextCol = x - this.tileSize
                    col = nextCol / this.tileSize
                    row = y / this.tileSize
                    break
                
                case MovingDirection.up:
                    nextRow = y - this.tileSize
                    col = x / this.tileSize
                    row = nextRow / this.tileSize
                    break
                
                case MovingDirection.down:
                    nextRow = y + this.tileSize
                    col = x / this.tileSize
                    row = nextRow / this.tileSize
                    break
            }
            const tile = this.map[row][col]
            if (tile === 1) {
                return true
            }
        }
        return false
    }

    eatDot(x, y) {
        const col = x / this.tileSize
        const row = y / this.tileSize
        if (Number.isInteger(col) && Number.isInteger(row)){
            if(this.map[row][col] === 0) {
                this.score += 10
                this.map[row][col] = 5
                return true
            }
        }
        return false
    }

    eatPowerDot(x, y) {
        const col = x / this.tileSize
        const row = y / this.tileSize

        if (Number.isInteger(col) && Number.isInteger(row)){
            const tile = this.map[row][col]
            if (tile === 2) {
                this.map[row][col] = 5
                return true
            }
        }
        return false
    }
}