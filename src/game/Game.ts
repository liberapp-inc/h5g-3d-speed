// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_SPEED_Z_PER_W = 1/10;
const PLAYER_RADIUS_PER_W = 1/10;
const LANE_RADIUS_PER_W = PLAYER_RADIUS_PER_W;
const LANE_WIDTH_PER_W = LANE_RADIUS_PER_W * 2;

const SAVE_KEY_BESTSCORE = "double-bestScore";

const BACK_COLOR = 0xffffff;    // index.htmlで設定
const FONT_COLOR = 0x505050;
const PLAYER_COLOR = 0x74a4af;
const BLOCK_COLOR = 0xe00000;
const LANE_COLOR = 0xe0e0e0; //0x9a9a9a;//0x74a4af;

class Game {

    static loadSceneGamePlay() {

        Game.speed = 0;
        Game.hard = 0;
        
        new Player();
        new Wave();

        new StartMessage();
        new Score();
    }

    static speed:number;
    static hard:number;
}
