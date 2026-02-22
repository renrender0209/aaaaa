/*:ja
 * @target MZ
 * @plugindesc コードとパラメータを指定してイベントコマンドを実行します。
 * @author トリアコンタン
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url
 *
 * @command execute
 * @text 実行
 * @desc コードを指定してイベントコマンドを実行します。
 *
 * @arg code
 * @text コマンドコード
 * @desc
 * @default 103
 * @type select
 * @option 数値入力の処理
 * @value 103
 * @option アイテム選択の処理
 * @value 104
 * @option ループの中断
 * @value 113
 * @option イベント処理の中断
 * @value 115
 * @option コモンイベント
 * @value 117
 * @option ラベル
 * @value 118
 * @option ラベルジャンプ
 * @value 119
 * @option スイッチの操作
 * @value 121
 * @option 変数の操作
 * @value 122
 * @option セルフスイッチの操作
 * @value 123
 * @option タイマーの操作
 * @value 124
 * @option 所持金の増減
 * @value 125
 * @option アイテムの増減
 * @value 126
 * @option 武器の増減
 * @value 127
 * @option 防具の増減
 * @value 128
 * @option メンバーの入れ替え
 * @value 129
 * @option 戦闘BGMの変更
 * @value 132
 * @option 勝利MEの変更
 * @value 133
 * @option セーブ禁止の変更
 * @value 134
 * @option メニュー禁止の変更
 * @value 135
 * @option エンカウント禁止の変更
 * @value 136
 * @option 並べ替え禁止の変更
 * @value 137
 * @option ウィンドウカラーの変更
 * @value 138
 * @option 敗北MEの変更
 * @value 139
 * @option 乗り物BGMの変更
 * @value 140
 * @option 場所移動
 * @value 201
 * @option 乗り物位置の設定
 * @value 202
 * @option イベント位置の設定
 * @value 203
 * @option マップのスクロール
 * @value 204
 * @option 移動ルートの設定
 * @value 205
 * @option 乗り物の乗降
 * @value 206
 * @option 透明状態の変更
 * @value 211
 * @option アニメーションの表示
 * @value 212
 * @option フキダシアイコンの表示
 * @value 213
 * @option イベントの一時消去
 * @value 214
 * @option 隊列歩行の変更
 * @value 216
 * @option 隊列メンバーの集合
 * @value 217
 * @option 画面のフェードアウト
 * @value 221
 * @option 画面のフェードイン
 * @value 222
 * @option 画面の色調変更
 * @value 223
 * @option 画面のフラッシュ
 * @value 224
 * @option 画面のシェイク
 * @value 225
 * @option ウェイト
 * @value 230
 * @option ピクチャの表示
 * @value 231
 * @option ピクチャの移動
 * @value 232
 * @option ピクチャの回転
 * @value 233
 * @option ピクチャの色調変更
 * @value 234
 * @option ピクチャの消去
 * @value 235
 * @option 天候の設定
 * @value 236
 * @option BGMの設定
 * @value 241
 * @option BGMのフェードアウト
 * @value 242
 * @option BGMの保存
 * @value 243
 * @option BGMの再開
 * @value 244
 * @option BGSの演奏
 * @value 245
 * @option BGSのフェードアウト
 * @value 246
 * @option MEの演奏
 * @value 249
 * @option SEの演奏
 * @value 250
 * @option SEの停止
 * @value 251
 * @option ムービーの再生
 * @value 261
 * @option マップ名表示の変更
 * @value 281
 * @option タイルセットの変更
 * @value 282
 * @option 戦闘背景の変更
 * @value 283
 * @option 遠景の変更
 * @value 284
 * @option 指定位置の情報取得
 * @value 285
 * @option 戦闘の処理
 * @value 301
 * @option 名前入力の処理
 * @value 303
 * @option HPの増減
 * @value 311
 * @option MPの増減
 * @value 312
 * @option TPの増減
 * @value 326
 * @option ステートの変更
 * @value 313
 * @option 全回復
 * @value 314
 * @option 経験値の増減
 * @value 315
 * @option レベルの増減
 * @value 316
 * @option 能力値の増減
 * @value 317
 * @option スキルの増減
 * @value 318
 * @option 装備の変更
 * @value 319
 * @option 名前の変更
 * @value 320
 * @option 職業の変更
 * @value 321
 * @option アクター画像の変更
 * @value 322
 * @option 乗り物画像の変更
 * @value 323
 * @option 二つ名の変更
 * @value 324
 * @option プロフィールの変更
 * @value 325
 * @option 敵キャラのHP増減
 * @value 331
 * @option 敵キャラのMP増減
 * @value 332
 * @option 敵キャラのTP増減
 * @value 342
 * @option 敵キャラのステート変更
 * @value 333
 * @option 敵キャラの全回復
 * @value 334
 * @option 敵キャラの出現
 * @value 335
 * @option 敵キャラの変身
 * @value 336
 * @option 戦闘アニメーションの表示
 * @value 337
 * @option 戦闘行動の強制
 * @value 339
 * @option バトルの中断
 * @value 340
 * @option メニュー画面を開く
 * @value 351
 * @option セーブ画面を開く
 * @value 352
 * @option ゲームオーバー
 * @value 353
 * @option タイトル画面に戻す
 * @value 354
 * @option プラグインコマンド
 * @value 356
 *
 * @arg parameters
 * @text パラメータ
 * @desc コードに指定するパラメータです。各種制御文字を指定できます。
 * @default
 * @type multiline_string[]
 *
 * @help EventCommandByCode.js
 *
 * コードとパラメータを直接指定してイベントコマンドを実行できます。
 * 各コマンドのパラメータに変数(制御文字(※1))が使えたり、
 * 通常のイベントコマンドでは指定できない範囲外の値を無理やり指定できます。
 * なお、想定外の値を設定してコマンドを呼んだ場合の動作は保証できません。
 *
 * ※1
 * v[n] : 変数値
 * s[n] : スイッチ
 * ss[n] : セルフスイッチ
 * js[n] : スクリプト(TextScriptBase.js適用時のみ)
 *
 * イベントエディタ上で複数行になるコマンドおよび
 * ネストが深くなるコマンドは指定できません。
 *
 * 具体的なパラメータの指定方法は、以下が参考になります。
 * https://docs.google.com/spreadsheets/d/1aqY-xzFqT0vnZE-OkfsMYsP9Ud91vWTrBLU-uDkJ-Ls/edit#gid=2095105278
 */