// Liberapp 2019 - Tahiti Katagai
// 3Dボール

class Ball3D extends GameObject{

    x:number;
    y:number;
    z:number;
    radius:number;
    step:number = 0;

    constructor( x:number, y:number, z:number ) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = Util.w( LANE_RADIUS_PER_W );
        this.setDisplay( x, y );
        this.update();
    }

    setDisplay( x:number, y:number ){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChildAt(this.display, 0 );
            // GameObject.gameDisplay.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( OBSTACLE_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
        shape.alpha = 1/60;
    }

    update() {

        let shape:egret.Shape = this.display as egret.Shape;
        if( shape.alpha < 1 ){
            shape.alpha = shape.alpha + 1/60;
        }

        let z = this.z - Player.I.z;
        z = z / Util.w(0.25);

        if( this.step == 0 ){
            if( z > 1 ){
                this.perspective( z );
            }
            else{
                this.step = 1;
                // hit 
                let dx = Player.I.x - this.x;
                let dy = Player.I.y - this.y;
                if( dx**2+dy**2 < this.radius**2+Player.I.radius**2 ){
                    Player.I.setStateMiss();
                    // Todo effect
                }
                this.display.parent.removeChild(this.display);
                GameObject.gameDisplay.addChild(this.display);
            }
        }
        else{
            this.perspective( z );
            if( z <= 0 ){
                this.destroy();
            }
        }
    }

    perspective( z:number ){
        let x = this.x - Util.w(0.5);
        let y = this.y - Util.h(0.3);
        
        const rpcZ = 1/z;
        this.display.x = Util.w(0.5) + x * rpcZ;
        this.display.y = Util.h(0.3) + y * rpcZ;
        this.display.scaleX =
        this.display.scaleY = rpcZ;
    }
}
