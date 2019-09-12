// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    mileage:number=0;
    milestone:number=0;

    constructor() {
        super();
    }

    update() {
        if( GameOver.I || StartMessage.I ){
            Game.speed = 0;
            return;
        }

        Game.speed = Util.lerp( Util.w(1/150), Util.w(1/60), Game.hard );
        Game.hard = Util.clamp( this.mileage / Util.w( 50 ), 0, 1 );

        this.mileage += Game.speed;
        
        if( this.milestone <= this.mileage ){
            this.milestone += Util.w(0.5);
            Score.I.addPoint();
            
            new Ball3D(  );
        }
    }
}

