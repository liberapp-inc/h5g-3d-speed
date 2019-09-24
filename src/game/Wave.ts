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

        Game.speed = Util.lerp( PLAYER_SPEED_Z_PER_W, PLAYER_MAX_SPEED_Z_PER_W, Game.hard ) * Util.width;
        Game.hard = Util.clamp( Player.I.z / Util.w( 50 ), 0, 1 );

        if( this.milestone <= Player.I.z ){
            this.milestone += Util.lerp( 1.0, 0.5, Game.hard ) * Util.width;
            Score.I.addPoint();
            
            const maxLane = Math.floor( LANES/2 );
            const minLane = -maxLane;

            const lane = randI( minLane, maxLane+1 );
            new Obstacle( randI( 0, ObsType.Total ), Util.w(0.5) + lane*Util.w(LANE_WIDTH_PER_W), Util.h(0.5) + Util.w(0.3), Player.I.z + Util.w(4) );

            // if( randBool( Util.lerp( 0.1, 0.5, Game.hard ) ) ){ 
            // const lane2 = randI( minLane, maxLane+1 );
            // if( lane2 != lane )
            //     new Obstacle( ObsType.SlideR, Util.w(0.5) + lane2*Util.w(LANE_WIDTH_PER_W), Util.h(0.5) + Util.w(0.3), Player.I.z + Util.w(4) );
            // }
        }
    }
}

