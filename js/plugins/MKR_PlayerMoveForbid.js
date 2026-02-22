//================================================ ==============================
// MKR_PlayerMoveForbid.js
//================================================ ==============================
// Copyright (c) 2016-2017 マンカインド
// このソフトウェアは MIT ライセンスの下でリリースされています。
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------ ------------------------------
// バージョン
// 1.0.5 2017/12/10 移動禁止の間、決定キーを動作させるかのフラグを追加
///
// 1.0.4 2017/08/27 プラグインパラメータの指定方法を変更
///
// 1.0.3 2017/05/24 メニュー開閉フラグが正常に動作していなかったため修正
///
// 1.0.2 2017/02/19 移動禁止の間、メニュー開閉を許可かのフラグを追加
///
// 1.0.1 2016/09/04 未使用のコードを削除しファイル容量を小さくした。
// 正確な値の設定が不適切だったので修正。
///
// 1.0.0 2016/09/04 初版公開。
// ------------------------------------------------ ------------------------------
// 【ツイッター】https://twitter.com/mankind_games/
// [GitHub] https://github.com/mankindGames/
// 【ブログ】http://mankind-games.blogspot.jp/
//================================================ ==============================

/*:
 *
 * @plugindesc (v1.0.5) プレイヤー移動プラグイン禁止
 * @authorマンカインド
 *
 * @help指定された番号のスイッチがONの間、
 ※プレイヤー操作によるキャラの移動を禁止します。
 *
 * プラグインレジストリ[移動禁止スイッチ]にスイッチ番号を指定します。
 * 登録された番号のスイッチがONになっている間、
 ※プレイヤー操作によるキャラの移動ができなくなります。
 * ([移動ルートの設定] コマンドなどで移動させることは可能です)
 *
 * [メニュー開閉制御]により、[移動禁止スイッチ]がONになっている
 *メニュー開閉を制御できます。
 *
 * [決定キー制御]により、[移動禁止スイッチ]がONになっている
 * 決定キー/タッチ操作による動作(主にイベントの起動)を制御できます。
 *
 *
 * プラグイン コマンド:
 ※ありません。
 *
 *
 * スクリプト コマンド:
 ※ありません。
 *
 *
 * 利用規約:
 * ・作者に無断で本プラグインの修正、再配布が可能です。
 * (ただしヘッダーの著作権表示部分は残してください。)
 *
 * ・利用形態(フリーゲーム、イラストゲーム、R-18作品等)に制限はありません。
 ※ご自由にお使いください。
 *
 * ・本プラグインを使用したことにより発生した問題について作者は一切の責任を
 ※負担しません。
 *
 * ・要望などがある場合、本プラグインのバージョンアップを行う
 *可能性がありますが、
 ※バージョンアップにより本プラグインの仕様が変更される可能性があります。
 ※ご了承ください。
 *
 *
 * @param Default_Move_Flag
 * @text 移動禁止スイッチ
 * @desc ONの間、プレイヤーの移動を禁止するスイッチ番号を指定します。(デフォルト:10)
 * @type スイッチ
 * @デフォルト 10
 *
 * @param Default_Menu_Flag
 * @text メニュー開閉制御
 * @desc プレイヤーの移動を禁止している間、メニューの切り替えを許可するかどうかを設定します。(デフォルト:許可する)
 * @type ブール値
 * @on 許可する
 * @off 許可しない
 * @default true
 *
 * @param エンターフラグ
 * @text 決定キー制御
 * @desc プレイヤーの移動を禁止している間、決定キー/タッチ操作による動作を許可するかどうかを設定します。(デフォルト:許可する)
 * @type ブール値
 * @on 許可する
 * @off 許可しない
 * @default true
 *
*/
（関数 （） {
    '厳密を使用';

    const PN = "MKR_PlayerMoveForbid";

    const CheckParam = function(type, param, def, min, max) {
        let パラメータ、regExp、値;
        パラメータ = PluginManager.parameters(PN);

        if(arguments.length < 4) {
            最小 = -無限;
            最大 = 無限;
        }
        if(arguments.length < 5) {
            最大 = 無限;
        }
        if(パラメーターのパラメーター) {
            値 = 文字列 (パラメーター [param]);
        } それ以外 {
            throw new Error("[CheckParam] プラグインウィジェットがありません: " + param);
        }

        スイッチ(タイプ) {
            ケース "ブール":
                if(値 == "") {
                    値 = (デフォルト)? 真/偽;
                }
                値 = value.toUpperCase() === "オン" || value.toUpperCase() === "真" || value.toUpperCase() === "1";
                壊す;
            ケース「スイッチ」：
                if(値 == "") {
                    値 = (定義 != "")? デフォルト: 値;
                }
                if(!value.match(/^(\d+)$/i)) {
                    throw new Error("[CheckParam] " + param + "の値がスイッチではありません: " + param + " : " + value);
                }
                壊す;
            デフォルト：
                throw new Error("[CheckParam] " + param + "のタイプが不正です: " + type);
                壊す;
        }

        [値、タイプ、定義、最小、最大、パラメーター] を返します。
    }

    const パラメータ = {
        "MoveSwitch" : CheckParam("switch", "Default_Move_Flag", "10"),
        "MenuFlg" : CheckParam("bool", "Default_Menu_Flag", true),
        "EnterFlg" : CheckParam("bool", "エンター フラグ", true),
    };


    //================================================ =========================
    // ゲーム_システム
    // ・メニュー開閉許可処理を再定義します。
    ///
    //================================================ =========================
    const _Game_System_isMenuEnabled = Game_System.prototype.isMenuEnabled;
    Game_System.prototype.isMenuEnabled = function() {
        return _Game_System_isMenuEnabled.call(this)
            && ($gameSwitches.value(Params.MoveSwitch[0]) ? Params.MenuFlg[0] == true : true);
    };


    //================================================ =========================
    // ゲームプレイヤー
    // ・プレイヤーの移動処理を再定義します。
    ///
    //================================================ =========================
    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = 関数(方向) {
        if(!$gameSwitches.value(Params.MoveSwitch[0])) {
            _Game_Player_executeMove.call(これ、方向);
        }
    };

    const _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } それ以外 {
            _Game_Player_triggerButtonAction.call(これ);
        }
        false を返します。
    };

    const _Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } それ以外 {
            _Game_Player_triggerTouchAction.call(これ);
        }
        false を返します。
    };

})();