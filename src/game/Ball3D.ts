// Liberapp 2019 - Tahiti Katagai
// 3Dボール

class Ball3D extends GameObject{

    x:number;
    y:number;
    z:number;
    radius:number;

    constructor( x:number, y:number ) {
        super();
    }

    setDisplay( x:number, y:number ){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( PLAYER_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }


    update() {

        let x = this.x - Player.I.x;
        let y = this.y - Player.I.y;
        let z = this.z - Player.I.z;

        if( z > 1 ){
            const rpcZ = 1/z;
            this.display.x = x * rpcZ;
            this.display.y = y * rpcZ;
            this.display.scaleX =
            this.display.scaleY = rpcZ;
        }
        else{
            // hit 
            let dx = Player.I.x - this.x;
            let dy = Player.I.y - this.y;
            if( dx**2+dy**2 < this.radius**2+Player.I.radius**2 ){
                Player.I.setStateMiss();
                // Todo effect
            }
            this.destroy();
        }
    }

    camX:number = 0;
    camY:number = 0;
    camZ:number = 0;
}
