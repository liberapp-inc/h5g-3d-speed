// Liberapp 2019 - Tahiti Katagai
// 障害物

class Obstacle extends GameObject{

    x:number;
    y:number;
    z:number;
    radius:number;
    step:number = 0;

    ball3d:Ball3D = null;

    constructor( x:number, y:number, z:number ) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = Util.w( OBSTACLE_RADIUS_PER_W );
        this.ball3d = new Ball3D( x, y, z, this.radius, OBSTACLE_COLOR );
        this.ball3d.setAlpha( 1/64 );
    }

    onDestroy(){
        this.ball3d.destroy();
        this.ball3d = null;
    }

    update() {

        if( this.ball3d.sphere.alpha < 1 ){
            this.ball3d.setAlpha( this.ball3d.sphere.alpha + 1/64 );
        }

        let z = this.z - Player.I.z;
        this.ball3d.perspective( this.x, this.y, z );

        if( this.step == 0 ){
            if( z <= Util.w(0.25) ){
                this.step = 1;
                this.ball3d.setShapeFront();
                // check hit
                let dx = Player.I.x - this.x;
                let dy = Player.I.y - this.y;
                if( dx**2+dy**2 < this.radius**2+Player.I.radius**2 ){
                    Player.I.setStateMiss();
                    // Todo effect
                }
            }
        }
        else{
            if( z <= 0 ){
                this.destroy();
            }
        }
    }
}
