/*:ja
 * @target MZ
 * @plugindesc リージョンのデータベース提供します
 * @author トリアコンタン
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url
 *
 * @param regionList
 * @text リージョンリスト
 * @desc リージョンデータのリストです。
 * @default []
 * @type struct<Record>[]
 *
 * @param terrainTagList
 * @text 地形タグリスト
 * @desc 地形タグデータのリストです。
 * @default []
 * @type struct<Record>[]
 *
 * @help RegionBase.js
 *
 * リージョンおよび地形タグのデータベースを提供します。
 * 仕様はおおよそRPGツクールMV Trinityに準じています。
 * リージョンおよび地形タグをトリガーにして以下の機能を提供します。
 * ・イベント、プレイヤーに対する通行判定(4方向含む)
 * ・梯子、茂み、カウンター、ダメージ床
 * ・コモンイベントの呼び出し(トリガー3種類)
 * ・侵入している間だけONになるスイッチ
 * ・侵入している間だけ有効になる特徴
 * ・メモ欄
 *
 * 以下のスクリプトでデータベースをスクリプトや外部プラグインから参照できます。
 * 未設定もしくは添え字が[0]の場合の中身はundefinedとなるので注意してください。
 *
 * $dataSystem.regions[ID];
 * $dataSystem.terrainTags[ID];
 *

 *~struct~Record:
 *
 * @param id
 * @text ID
 * @desc 対象となるリージョンもしくは地形タグIDです。
 * @default 1
 * @type number
 *
 * @param name
 * @text 名前
 * @desc 管理上の名前です。特に意味はありません。
 * @default
 *
 * @param collisionForPlayer
 * @text プレイヤーとの衝突判定
 * @desc プレイヤーとの衝突判定です。
 * @default []
 * @type select[]
 * @option 通行不可
 * @value collision_all
 * @option 上方向通行不可
 * @value collision_up
 * @option 右方向通行不可
 * @value collision_right
 * @option 下方向通行不可
 * @value collision_down
 * @option 左方向通行不可
 * @value collision_left
 *
 * @param collisionForEvent
 * @text イベントとの衝突判定
 * @desc イベントとの衝突判定です。
 * @default []
 * @type select[]
 * @option 通行不可
 * @value collision_all
 * @option 上方向通行不可
 * @value collision_up
 * @option 右方向通行不可
 * @value collision_right
 * @option 下方向通行不可
 * @value collision_down
 * @option 左方向通行不可
 * @value collision_left
 *
 * @param through
 * @text すり抜け
 * @desc すり抜け設定です。有効になっていると通行不可のタイルを通過できます。衝突判定の方が優先されます。
 * @default false
 * @type boolean
 *
 * @param tileAttribute
 * @text タイル属性
 * @desc タイル属性です。
 * @default []
 * @type select[]
 * @option 梯子
 * @value ladder
 * @option 茂み
 * @value bush
 * @option カウンター
 * @value counter
 * @option ダメージ床
 * @value damage_floor
 *
 * @param commonEvent
 * @text コモンイベント
 * @desc 呼び出されるコモンイベントです。
 * @type struct<CommonEvent>[]
 *
 * @param switchId
 * @text スイッチID
 * @desc 侵入時にONになるスイッチです。離脱するとOFFになります。
 * @type switch
 *
 * @param traitsId
 * @text 特徴
 * @desc プレイヤーが侵入している場合に有効になる特徴です。便宜上、職業からの選択となります。
 * @type class
 *
 * @param note
 * @text メモ
 * @desc メモ欄です。通常のデータベースと同様に、ここからmeta情報が自動生成されます。スクリプトでの使用を想定しています。
 * @type multiline_string
 *

 *~struct~CommonEvent:
 *
 * @param id
 * @text ID
 * @desc コモンイベントIDです。
 * @default 1
 * @type common_event
 *
 * @param trigger
 * @text トリガー
 * @desc コモンイベントの起動トリガーです。
 * @default 0
 * @type select
 * @option エリアに侵入したときに一度だけ実行
 * @value 0
 * @option エリア内にいる間、歩く度に実行
 * @value 1
 * @option エリアから離脱したときに一度だけ実行
 * @value 2
 */