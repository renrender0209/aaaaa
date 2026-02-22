/*
EraseGoldWindow.js

2016/11/11 version 1.0

  利用規約
  ・MITライセンス
  ・商用・非商用問わず使えます。
　・改変公開可能
*/


/*:ja
 * @plugindesc ゴールド表示ウインドウを削除
 * @author さうと
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function () {

//rpg_windows.js
	Window_Gold.prototype.initialize = function(x, y) {
	    var width = 0;
	    var height = 0;
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	    this.refresh();
	};

})();