// Liberapp 2019 - Tahiti Katagai
// プレイヤー ボール

class Player extends GameObject{

    static I:Player = null;

    get x():number { return this.display.x; }
    get y():number { return this.display.y; }
    set x( x:number ){ this.display.x = x; }
    set y( y:number ){ this.display.y = y; }

    radius:number;
    z:number;
    vz:number;
    buttonOffsetX:number;

    button:Button;
    state:()=>void = this.stateNone;

    constructor() {
        super();

        Player.I = this;
        
        let x = Util.w(0.5);
        let y = Util.h(0.5) + Util.w(0.3);
        
        this.radius = Util.w(PLAYER_RADIUS_PER_W);
        this.z = 0;
        this.vz = Util.w(PLAYER_SPEED_Z_PER_W);

        this.setDisplay( x, y );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
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

    update(){
        this.state();
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateRun(){
        this.state = this.stateRun;
    }
    stateRun() {
        // controll x
        if( this.button.press ){
            this.buttonOffsetX = this.x - this.button.x;
        }
        else{
            const rate = 1.25;
            let vx = this.button.x + this.buttonOffsetX - this.x;
            this.x = Util.clamp( this.x + vx * rate, this.radius, Util.width  - this.radius );
            this.buttonOffsetX = this.x - this.button.x;
        }

        // progress z
        const maxSpeed = Util.w(PLAYER_SPEED_Z_PER_W);
        const delta = maxSpeed / 60;
        this.vz += Util.clamp( maxSpeed - this.vz, -delta, +delta );
        this.z += this.vz;
    }

    setStateMiss(){
        if( this.state == this.stateMiss )
            return;
        new GameOver();
        this.state = this.stateMiss;
    }
    stateMiss(){
    }
}