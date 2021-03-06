// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    static I:StartMessage = null;
    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        StartMessage.I = this;
        this.texts[0] = Util.newTextField("スピードボール", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        this.texts[1] = Util.newTextField("ボールをタッチでスライド", Util.width / 19, FONT_COLOR, 0.5, 0.3, true, false);
        this.texts[2] = Util.newTextField("障害物を避けながら進もう", Util.width / 19, FONT_COLOR, 0.5, 0.35, true, false);
        this.texts.forEach( text =>{ GameObject.baseDisplay.addChild( text ); });

        GameObject.baseDisplay.once(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    }

    onDestroy(){
        this.texts.forEach( text =>{ text.parent.removeChild( text ); });
        this.texts = null;
        StartMessage.I = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Player.I.setStateRun();
        this.destroy();
    }
}
