// Liberapp 2019 - Tahiti Katagai
// 地形生成

class Wave extends GameObject{

    milestone:number=0;

    constructor() {
        super();
    }

    update() {
        if( GameOver.I || StartMessage.I ){
            Game.speed = 0;
            return;
        }

        Game.speed = Util.lerp( Util.w(PLAYER_SPEED_Z_PER_W), Util.w(PLAYER_SPEED_Z_PER_W), Game.hard );
        Game.hard = Util.clamp( Player.I.z / Util.w( 50 ), 0, 1 );

        if( this.milestone <= Player.I.z ){
            this.milestone += Util.w(0.5);
            Score.I.addPoint();
            
            new Ball3D( randF( 0, Util.w(1) ), Util.h(0.5) + Util.w(0.3), Player.I.z + Util.w(4) );
        }
    }
}

