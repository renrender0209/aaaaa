//=============================================================================
// CustomActorSimpleStatus.js
// ----------------------------------------------------------------------------
// (C) 2019 astral
// This software is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/03/30 初版
/*:
 * 
 * @plugindesc メニュー/スキル画面でのアクター情報の表示・非表示を変更します
 * @author astral
 * 
 * @param enableMenuStatus
 * @text メニュー画面の制御
 * @desc スキル画面での機能の有効化
 * @type boolean
 * @default true
 * 
 * 
 * @param showMenuStatusName
 * @text アクター名表示
 * @desc アクター名の表示を変更します
 * @type boolean
 * @default true
 * @parent enableMenuStatus
 * 
 * @param showMenuStatusLevel
 * @text レベル表示
 * @desc レベルの表示を変更します
 * @type boolean
 * @default true
 * @parent enableMenuStatus
 * 
 * @param showMenuStatusIcons
 * @text アイコン表示
 * @desc アイコンの表示を変更します
 * @type boolean
 * @default true
 * @parent enableMenuStatus
 * 
 * @param showMenuStatusClass
 * @text 職業表示
 * @desc 職業の表示を変更します
 * @type boolean
 * @default true
 * @parent enableMenuStatus
 * 
 * @param showMenuStatusHp
 * @text HP表示
 * @desc HPの表示を変更します
 * @type boolean
 * @default true
 * @parent enableMenuStatus
 * 
 * @param showMenuStatusMp
 * @text MP表示
 * @desc MPの表示を変更します
 * @type boolean
 * @default true
 * @parent enableMenuStatus
 * 
 * 
 * @param enableSkillStatus
 * @text スキル画面の制御
 * @desc スキル画面での機能の有効化
 * @type boolean
 * @default true
 * 
 * @param showSkillStatusName
 * @text アクター名表示
 * @desc アクター名の表示を変更します
 * @type boolean
 * @default true
 * @parent enableSkillStatus
 * 
 * @param showSkillStatusLevel
 * @text レベル表示
 * @desc レベルの表示を変更します
 * @type boolean
 * @default true
 * @parent enableSkillStatus
 * 
 * @param showSkillStatusIcons
 * @text アイコン表示
 * @desc アイコンの表示を変更します
 * @type boolean
 * @default true
 * @parent enableSkillStatus
 * 
 * @param showSkillStatusClass
 * @text 職業表示
 * @desc 職業の表示を変更します
 * @type boolean
 * @default true
 * @parent enableSkillStatus
 * 
 * @param showSkillStatusHp
 * @text HP表示
 * @desc HPの表示を変更します
 * @type boolean
 * @default true
 * @parent enableSkillStatus
 * 
 * @param showSkillStatusMp
 * @text MP表示
 * @desc MPの表示を変更します
 * @type boolean
 * @default true
 * @parent enableSkillStatus
 * 
 * 
 * @help
 * 
 * メニュー画面とスキル画面でのアクター情報の表示・非表示を変更します。
 * 
 * プラグインパラメーターで、
 * 【メニュー/スキル】画面の制御を有効（true）にすることで、
 * アクター名やレベル、HPなどの表示（true）・非表示（false）で切り替える事が出来ます。
 * 
 * 
 * メニュー画面を変更するプラグインと併用した場合に動作しない場合は、
 * プラグイン登録で下に配置してください。
 * 
 * デフォルトのレイアウトを変更するプラグインとは併用可能ですが、
 * 独自にメニュー画面の中で表示させているものは変更する事は出来ません。
 * 
 * 
 * MIT License.
 * 
 */


(function () {
    'use strict';

    var param = (function (parameters){
        var $ = JSON.parse(JSON.stringify(parameters, function(key, value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }));
        return $;
        
    })(PluginManager.parameters('CustomActorSimpleStatus'));

    var _Window_SkillStatus_drawActorSimpleStatus = Window_SkillStatus.prototype.drawActorSimpleStatus;
    Window_SkillStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        if (param.enableSkillStatus) {
            if (!param.showSkillStatusName) this._disableDrawActorName = !param.showSkillStatusName;
            if (!param.showSkillStatusLevel) this._disableDrawActorLevel = !param.showSkillStatusLevel;
            if (!param.showSkillStatusIcons) this._disableDrawActorIcons = !param.showSkillStatusIcons;
            if (!param.showSkillStatusClass) this._disableDrawActorClass = !param.showSkillStatusClass;
            if (!param.showSkillStatusHp) this._disableDrawActorHp = !param.showSkillStatusHp;
            if (!param.showSkillStatusMp) this._disableDrawActorMp = !param.showSkillStatusMp;
        }
        if (_Window_SkillStatus_drawActorSimpleStatus) _Window_MenuStatus_drawActorSimpleStatus.apply(this, arguments);
        else Window_Base.prototype.drawActorSimpleStatus.apply(this, arguments);
    };

    var _Window_MenuStatus_drawActorSimpleStatus = Window_MenuStatus.prototype.drawActorSimpleStatus;
    Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
        if (param.enableMenuStatus) {
            if (!param.showMenuStatusName) this._disableDrawActorName = !param.showMenuStatusName;
            if (!param.showMenuStatusLevel) this._disableDrawActorLevel = !param.showMenuStatusLevel;
            if (!param.showMenuStatusIcons) this._disableDrawActorIcons = !param.showMenuStatusIcons;
            if (!param.showMenuStatusClass) this._disableDrawActorClass = !param.showMenuStatusClass;
            if (!param.showMenuStatusHp) this._disableDrawActorHp = !param.showMenuStatusHp;
            if (!param.showMenuStatusMp) this._disableDrawActorMp = !param.showMenuStatusMp;
        }
        if (_Window_MenuStatus_drawActorSimpleStatus) _Window_MenuStatus_drawActorSimpleStatus.apply(this, arguments);
        else Window_Base.prototype.drawActorSimpleStatus.apply(this, arguments);
    };


    var _Window_Base_drawActorName = Window_Base.prototype.drawActorName;
    Window_Base.prototype.drawActorName = function(actor, x, y, width) {
        if (this._disableDrawActorName) return;
        _Window_Base_drawActorName.apply(this, arguments);
    };
    
    var _Window_Base_drawActorClass = Window_Base.prototype.drawActorClass;
    Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
        if (this._disableDrawActorClass) return;
        _Window_Base_drawActorClass.apply(this, arguments);
    };
    
    var _Window_Base_drawActorLevel = Window_Base.prototype.drawActorLevel;
    Window_Base.prototype.drawActorLevel = function(actor, x, y) {
        if (this._disableDrawActorLevel) return;
        _Window_Base_drawActorLevel.apply(this, arguments);
    };
    
    var _Window_Base_drawActorIcons = Window_Base.prototype.drawActorIcons;
    Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
        if (this._disableDrawActorIcons) return;
        _Window_Base_drawActorIcons.apply(this, arguments);
    };
    
    var _Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
    Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
        if (this._disableDrawActorHp) return;
        _Window_Base_drawActorHp.apply(this, arguments);
    };
    
    var _Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
    Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
        if (this._disableDrawActorMp) return;
        _Window_Base_drawActorMp.apply(this, arguments);
    };

})();