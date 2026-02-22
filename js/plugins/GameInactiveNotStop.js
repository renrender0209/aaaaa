//=============================================================================
// GameInactiveNotStop.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ゲームウィンドウが非アクティブでもゲームを止めない。
 * @author 加藤マリン
 *
 * @help プラグインをオンにすると、ゲームウィンドウが非アクティブでも
 * ゲームが裏で動き続けるようになります。
 * 
 * 万が一、ゲームの途中で非アクティブ時の停止をオンにしたい場合は
 * $gameSystem.SetGameInactiveStop(true);
 * をスクリプトで実行してください。
 * 
 * 【更新】
 * 2022/01/20 コアスクリプトの更新でエラーが出る不具合を修正しました。
 * 
 */

(() => {

    let GameInactiveStop = false;

    Game_System.prototype.SetGameInactiveStop = function (bool) {

        GameInactiveStop = bool;

    }

    SceneManager.isGameActive = function () {

        if (GameInactiveStop) {
            try {
                return window.top.document.hasFocus();
            } catch (e) {
                return true;
            }
        } else {
            return true;
        }

    };


})();
