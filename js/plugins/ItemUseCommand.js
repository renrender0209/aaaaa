/*=============================================== =============================
 アイテム使用コマンド.js
-------------------------------------------------- ------------------------
 (C)2022 トリアコンタン
 このソフトウェアは MIT ライセンスに基づいてリリースされています。
 http://opensource.org/licenses/mit-license.php
-------------------------------------------------- ------------------------
 バージョン
 1.0.1 2022/03/31 効果範囲が「味方」以外のアイテムが使用できない問題を修正
 1.0.0 2022/01/15 初版
-------------------------------------------------- ------------------------
 【ブログ】：https://triacontane.blogspot.jp/
 【Twitter】：https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
================================================= ===========================*/

/*:
 * @plugindesc アイテム使用コマンドプラグイン
 * @ターゲットMZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/ItemUseCommand.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param unusableSwitch
 * @text 使用不可トリガー
 * @desc アイテムを使用できなかった場合にONになるスイッチです。
 * @デフォルト0
 * @type スイッチ
 *
 * @param playSe
 * @text 効果音演奏
 * @desc アイテムを使用時に効果音を演奏します。
 * @デフォルト true
 * @type ブール値
 *
 * @コマンド ITEM_USE
 * @text アイテム使用
 * @desc 指定した対象にアイテムを使用します。
 *
 * @arg itemId
 * @text アイテムID
 * @desc 使用するアイテムのIDです。
 * @デフォルト1
 * @type項目
 *
 * @arg itemIdVariable
 * @text アイテムID(変数から取得)
 * @desc 使用するアイテムのIDを変数値から取得する場合はこちらを指定します。
 * @デフォルト0
 * @type変数
 *
 * @arg targetIndex
 * @text利用対象
 * @desc アイテムを使用する対象のインデックス(並び順)です。1が先頭です。味方全体のアイテムなどでは指定不要です。
 * @デフォルト1
 * @タイプ番号
 *
 * @arg targetActor
 * @text 使用対象(直接指定)
 * @desc アイテムを使用する対象をアクターから直接指定する場合に選択します。パーティにいないアクターの場合は無視されます。
 * @デフォルト0
 * @type アクター
 *
 * @helpItemUseCommand.js
 *
 ※指定したIDのアイテムを使用するコマンドが提供されます。
 *コマンド実行後は必要に応じてアイテムを消費し、
 * またアイテムが必要な場合は使用できません。
 *
 ※メニュー画面で使用可能なアイテムのみが対象で戦闘用の
 ※アイテムは使用できず、敵キャラは効果の適用外です。
 *
 *利用規約：
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 ※についても制限はありません。
 * このプラグインはもうあなたのものです。
 */

(()=> {
    '厳密を使用';
    const スクリプト = document.currentScript;
    const param = PluginManagerEx.createParameter(スクリプト);

    PluginManagerEx.registerCommand(script, 'ITEM_USE', args => {
        const itemId = args.itemIdVariable ? $gameVariables.value(args.itemIdVariable) : args.itemId;
        let target = $gameParty.members().findIndex(actor =>actor.actorId() === args.targetActor);
        if (ターゲット < 0) {
            ターゲット = args.targetIndex - 1;
        }
        $gameTemp.callItemUse(itemId, target);
    });

    Game_Temp.prototype.callItemUse = function(itemId, targetIndex) {
        const item = $dataItems[itemId];
        if (アイテム) {
            const itemUse = new Game_ItemUse(item, targetIndex);
            itemUse.execute();
        }
    };

    /**
     * Game_ItemUse
     */
    class Game_ItemUse {
        コンストラクター(アイテム、ターゲットインデックス) {
            this._user = this.findUser();
            this._item = アイテム;
            this._targetIndex = ターゲットインデックス || 0;
            this._action = 新しい Game_Action(this._user);
            this._action.setItemObject(アイテム);
        }

        使える（） {
            return this._user.canUse(this._item) && this.isEffectsValid();
        }

        実行する（） {
            if (!this.canUse()) {
                if (param.unusableSwitch) {
                    $gameSwitches.setValue(param.unusableSwitch, true);
                }
                戻る;
            }
            if (param.playSe) {
                SoundManager.playUseItem();
            }
            this._user.consumeItem(this._item);
            const アクション = this._action;
            this.findTarget().forEach(target => {
                const 繰り返し = action.numRepeats();
                for (let i = 0; i < 繰り返し; i++) {
                    アクション.適用(ターゲット);
                }
            });
            action.applyGlobal();
        }

        isEffectsValid() {
            const アクション = this._action;
            if (!action.isForFriend()) {
                true を返します。
            }
            return this.findTarget().some(target => action.testApply(target));
        }

        目標を見つける（） {
            const アクション = this._action;
            if (!action.isForFriend()) {
                戻る [];
            else if (action.isForAll()) {
                $gameParty.members() を返します。
            } それ以外 {
                return [$gameParty.members()[this._targetIndex]];
            }
        }

        findUser() {
            const members = $gameParty.movableMembers();
            const bestPha = Math.max(...members.map(member => member.pha));
            return members.find(member => member.pha === bestPha);
        }
    }
})();