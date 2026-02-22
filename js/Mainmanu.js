#_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
#_/    ◆ カスタムメニューコマンド - KGC_CustomMenuCommand ◆ VX ◆
#_/    ◇ Last update : 2008/08/28 ◇
#_/----------------------------------------------------------------------------
#_/  メニューコマンドを自由に並べ替えます。
#_/============================================================================
#_/  再定義が多いので、できるだけ「素材」の上部に導入してください。
#_/  「レクトールと黒獅子の紋章」おまけスクリプトより下に導入してください。
#_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

#==============================================================================
# ★ カスタマイズ項目 - Customize ★
#==============================================================================

module KGC
module CustomMenuCommand
  # ◆ メニューコマンド一覧
  #  メニュー画面に表示するコマンドを「表示したい順」に記述してください。
  #  使用しないコマンドは書かなくても構いません。
  #   ** 対応表 **
  #  0..アイテム  1..スキル  2..装備  3..ステータス  4..セーブ  5..ゲーム終了
  #
  #   ** 以下は、該当する機能を導入しないと使えません。
  #  10..パーティ編成 (多人数パーティ)
  #  11..AP ビューア  (スキル習得装備)
  #  12..スキル設定   (スキルCP制)
  #  13..難易度設定   (戦闘難易度)
  #  14..パラメータ振り分け (パラメータ振り分け)
  #  15..モンスター図鑑 (モンスター図鑑)
  #
  #   ** 以下は、「レクトールと黒獅子の紋章」おまけスクリプト
  #   ** [ExMenu_CustomCommand] 用です。
  #   ** 「あらすじ」などを追加する場合に使用してください。
  #  100..コマンド 1 個目
  #  101..コマンド 2 個目
  #  102..コマンド 3 個目
  #  (以降 199 まで使用可能)
  MENU_COMMANDS = [0, 1, 5]

  # ◆ メニューコマンドの最大行数
  ROW_MAX = 10
end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

$imported = {} if $imported == nil
$imported["CustomMenuCommand"] = true

module KGC::CustomMenuCommand
  # [ExMenu_CustomCommand] 導入判定
  EXMNU_CTCMD_OK = defined?(EXMNU_CTCMD_COMMANDS)
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# □ KGC::Commands
#==============================================================================

module KGC
module Commands
  module_function
  #--------------------------------------------------------------------------
  # ○ アイテム画面の呼び出し
  #--------------------------------------------------------------------------
  def call_item
    return if $game_temp.in_battle
    $game_temp.next_scene = :menu_item
    $game_temp.next_scene_actor_index = 0
    $game_temp.menu_command_index = {}
  end
  #--------------------------------------------------------------------------
  # ○ スキル画面の呼び出し
  #     actor_index : アクターインデックス
  #--------------------------------------------------------------------------
  def call_skill(actor_index = 0)
    return if $game_temp.in_battle
    $game_temp.next_scene = :menu_skill
    $game_temp.next_scene_actor_index = actor_index
    $game_temp.menu_command_index = {}
  end
  #--------------------------------------------------------------------------
  # ○ 装備画面の呼び出し
  #     actor_index : アクターインデックス
  #--------------------------------------------------------------------------
  def call_equip(actor_index = 0)
    return if $game_temp.in_battle
    $game_temp.next_scene = :menu_equip
    $game_temp.next_scene_actor_index = actor_index
    $game_temp.menu_command_index = {}
  end
  #--------------------------------------------------------------------------
  # ○ ステータス画面の呼び出し
  #     actor_index : アクターインデックス
  #--------------------------------------------------------------------------
  def call_status(actor_index = 0)
    return if $game_temp.in_battle
    $game_temp.next_scene = :menu_status
    $game_temp.next_scene_actor_index = actor_index
    $game_temp.menu_command_index = {}
  end
end
end

class Game_Interpreter
  include KGC::Commands
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Game_Temp
#==============================================================================

class Game_Temp
  #--------------------------------------------------------------------------
  # ● 公開インスタンス変数
  #--------------------------------------------------------------------------
  attr_accessor :menu_command_index       # メニューコマンドのインデックス
  attr_accessor :next_scene_actor_index   # 次のシーンのアクターインデックス
  #--------------------------------------------------------------------------
  # ● オブジェクト初期化
  #--------------------------------------------------------------------------
  alias initialize_KGC_CustomMenuCommand initialize
  def initialize
    initialize_KGC_CustomMenuCommand

    @menu_command_index = {}
    @next_scene_actor_index = 0
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_Map
#==============================================================================

class Scene_Map < Scene_Base
  #--------------------------------------------------------------------------
  # ● 画面切り替えの実行
  #--------------------------------------------------------------------------
  alias update_scene_change_KGC_CustomMenuCommand update_scene_change
  def update_scene_change
    return if $game_player.moving?    # プレイヤーの移動中？

    case $game_temp.next_scene
    when :menu_item
      call_menu_item
    when :menu_skill
      call_menu_skill
    when :menu_equip
      call_menu_equip
    when :menu_status
      call_menu_status
    else
      update_scene_change_KGC_CustomMenuCommand
    end
  end
  #--------------------------------------------------------------------------
  # ○ アイテム画面への切り替え
  #--------------------------------------------------------------------------
  def call_menu_item
    $game_temp.next_scene = nil
    $scene = Scene_Item.new
  end
  #--------------------------------------------------------------------------
  # ○ スキル画面への切り替え
  #--------------------------------------------------------------------------
  def call_menu_skill
    $game_temp.next_scene = nil
    $scene = Scene_Skill.new($game_temp.next_scene_actor_index)
    $game_temp.next_scene_actor_index = 0
  end
  #--------------------------------------------------------------------------
  # ○ 装備画面への切り替え
  #--------------------------------------------------------------------------
  def call_menu_equip
    $game_temp.next_scene = nil
    $scene = Scene_Equip.new($game_temp.next_scene_actor_index)
    $game_temp.next_scene_actor_index = 0
  end
  #--------------------------------------------------------------------------
  # ○ ステータス画面への切り替え
  #--------------------------------------------------------------------------
  def call_menu_status
    $game_temp.next_scene = nil
    $scene = Scene_Status.new($game_temp.next_scene_actor_index)
    $game_temp.next_scene_actor_index = 0
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_Menu
#==============================================================================

class Scene_Menu < Scene_Base
  #--------------------------------------------------------------------------
  # ● コマンドウィンドウの作成
  #--------------------------------------------------------------------------
  def create_command_window
    commands = create_command_list
    @command_window = Window_Command.new(160, commands)
    @command_window.height = [@command_window.height,
      KGC::CustomMenuCommand::ROW_MAX * Window_Base::WLH + 32].min
    @command_window.index = [@menu_index, commands.size - 1].min
    set_command_enabled
  end
  #--------------------------------------------------------------------------
  # ○ コマンド一覧の作成
  #   コマンド名の一覧を返す。
  #--------------------------------------------------------------------------
  def create_command_list
    commands = []
    index_list = {}
    @exmenu_command_scene = {}
    @disabled_command_index = []

    KGC::CustomMenuCommand::MENU_COMMANDS.each_with_index { |c, i|
      case c
      when 0         # アイテム
        index_list[:item] = commands.size
        commands << Vocab.item
      when 1         # スキル
        index_list[:skill] = commands.size
        commands << Vocab.skill
      when 2         # 装備
        index_list[:equip] = commands.size
        commands << Vocab.equip
      when 3         # ステータス
        index_list[:status] = commands.size
        commands << Vocab.status
      when 4         # セーブ
        index_list[:save] = commands.size
        commands << Vocab.save
      when 5         # ゲーム終了
        index_list[:game_end] = commands.size
        commands << Vocab.game_end
      when 10        # パーティ編成
        next unless $imported["LargeParty"]
        index_list[:partyform] = commands.size
        @__command_partyform_index = commands.size
        commands << Vocab.partyform
      when 11        # AP ビューア
        next unless $imported["EquipLearnSkill"]
        index_list[:ap_viewer] = commands.size
        @__command_ap_viewer_index = commands.size
        commands << Vocab.ap_viewer
      when 12        # スキル設定
        next unless $imported["SkillCPSystem"]
        index_list[:set_battle_skill] = commands.size
        @__command_set_battle_skill_index = commands.size
        commands << Vocab.set_battle_skill
      when 13        # 戦闘難易度
        next unless $imported["BattleDifficulty"]
        index_list[:set_difficulty] = commands.size
        @__command_set_difficulty_index = commands.size
        commands << KGC::BattleDifficulty.get[:name]
      when 14        # パラメータ振り分け
        next unless $imported["DistributeParameter"]
        index_list[:distribute_parameter] = commands.size
        @__command_distribute_parameter_index = commands.size
        commands << Vocab.distribute_parameter
      when 15        # モンスター図鑑
        next unless $imported["EnemyGuide"]
        index_list[:enemy_guide] = commands.size
        @__command_enemy_guide_index = commands.size
        commands << Vocab.enemy_guide
      when 100..199  # ExMenu_CustomCommand
        next unless KGC::CustomMenuCommand::EXMNU_CTCMD_OK  # 使用不可なら次へ
        excommand = EXMNU_CTCMD_COMMANDS[c - 100]           # コマンドindex取得
        unless command_visible?(excommand) || command_inputable?(excommand)
          next                                              # 不可視なら次へ
        end
        index_list[excommand[2]] = commands.size
        commands << excommand[2]
        @exmenu_command_scene[excommand[2]] = excommand[3]
      end
    }
    $game_temp.menu_command_index = index_list
    return commands
  end
  #--------------------------------------------------------------------------
  # ○ コマンドの有効状態設定
  #--------------------------------------------------------------------------
  def set_command_enabled
    disable_items = []
    # パーティ人数が 0 人の場合
    if $game_party.members.size == 0
      disable_items.push(:item, :skill, :equip, :status, :partyform,
        :ap_viewer, :set_battle_skill, :distribute_parameter)
    end
    # セーブ禁止の場合
    if $game_system.save_disabled
      disable_items.push(:save)
    end

    # パーティ編成禁止の場合
    if $imported["LargeParty"] && !$game_party.partyform_enable?
      disable_items.push(:partyform)
    end

    # [ExMenu_CustomCommand] 判定
    if KGC::CustomMenuCommand::EXMNU_CTCMD_OK
      disable_items += get_exmenu_disable_commands
    end

    # 指定項目を無効化
    disable_items.each { |i|
      if $game_temp.menu_command_index.has_key?(i)
        index = $game_temp.menu_command_index[i]
        @command_window.draw_item(index, false)
        @disabled_command_index << index
      end
    }
  end
  #--------------------------------------------------------------------------
  # ○ [ExMenu_CustomCommand] の無効コマンド取得
  #--------------------------------------------------------------------------
  def get_exmenu_disable_commands
    disable_items = []
    $game_temp.menu_command_index.each { |k, v|
      next unless k.is_a?(String)
      # 該当するコマンドを探す
      command = EXMNU_CTCMD_COMMANDS.find { |c| c[2] == k }
      next if command == nil
      # 有効状態を判定
      unless command_inputable?(command)
        disable_items.push(k)
      end
    }
    return disable_items
  end
  #--------------------------------------------------------------------------
  # ● コマンド選択の更新
  #--------------------------------------------------------------------------
  def update_command_selection
    if Input.trigger?(Input::B)
      Sound.play_cancel
      $scene = Scene_Map.new
    elsif Input.trigger?(Input::C)
      index = @command_window.index
      unless command_enabled?(index)  # コマンドが無効
        Sound.play_buzzer
        return
      end
      Sound.play_decision

      # [ExMenu_CustomCommand]
      excommand = nil
      if KGC::CustomMenuCommand::EXMNU_CTCMD_OK
        excommand = @command_window.commands[index]
      end

      # 遷移シーン判定
      case index
      when $game_temp.menu_command_index[:item]      # アイテム
        $scene = Scene_Item.new
      when $game_temp.menu_command_index[:skill],    # スキル、装備、ステータス
          $game_temp.menu_command_index[:equip],
          $game_temp.menu_command_index[:status]
        start_actor_selection
      when $game_temp.menu_command_index[:save]      # セーブ
        $scene = Scene_File.new(true, false, false)
      when $game_temp.menu_command_index[:game_end]  # ゲーム終了
        $scene = Scene_End.new
      when $game_temp.menu_command_index[excommand]  # [ExMenu_CustomCommand]
        $game_party.last_menu_index = index
        $scene = eval("#{@exmenu_command_scene[excommand]}.new")
      end
    end
  end
  #--------------------------------------------------------------------------
  # ○ コマンド有効判定
  #     index : コマンド index
  #--------------------------------------------------------------------------
  def command_enabled?(index)
    # メニュー
    if $game_system.save_disabled &&
        index == $game_temp.menu_command_index[:save]
      return false
    end

    # [ExMenu_CustomCommand]
    if KGC::CustomMenuCommand::EXMNU_CTCMD_OK
      command = @command_window.commands[index]
      if @disabled_command_index.include?($game_temp.menu_command_index[command])
        return false
      end
    end

    # メンバー 0 人
    if $game_party.members.size == 0 &&
        @disabled_command_index.include?(index)
      return false
    end

    return true
  end
  #--------------------------------------------------------------------------
  # ● アクター選択の更新
  #--------------------------------------------------------------------------
  def update_actor_selection
    if Input.trigger?(Input::B)
      Sound.play_cancel
      end_actor_selection
    elsif Input.trigger?(Input::C)
      $game_party.last_actor_index = @status_window.index
      Sound.play_decision

      case @command_window.index
      when $game_temp.menu_command_index[:skill]   # スキル
        $scene = Scene_Skill.new(@status_window.index)
      when $game_temp.menu_command_index[:equip]   # 装備
        $scene = Scene_Equip.new(@status_window.index)
      when $game_temp.menu_command_index[:status]  # ステータス
        $scene = Scene_Status.new(@status_window.index)
      end
    end
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_Item
#==============================================================================

class Scene_Item < Scene_Base
  #--------------------------------------------------------------------------
  # ● 元の画面へ戻る
  #--------------------------------------------------------------------------
  def return_scene
    if $game_temp.menu_command_index.has_key?(:item)
      $scene = Scene_Menu.new($game_temp.menu_command_index[:item])
    else
      $scene = Scene_Map.new
    end
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_Skill
#==============================================================================

class Scene_Skill < Scene_Base
  #--------------------------------------------------------------------------
  # ● 元の画面へ戻る
  #--------------------------------------------------------------------------
  def return_scene
    if $game_temp.menu_command_index.has_key?(:skill)
      $scene = Scene_Menu.new($game_temp.menu_command_index[:skill])
    else
      $scene = Scene_Map.new
    end
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_Equip
#==============================================================================

class Scene_Equip < Scene_Base
  #--------------------------------------------------------------------------
  # ● 元の画面へ戻る
  #--------------------------------------------------------------------------
  def return_scene
    if $game_temp.menu_command_index.has_key?(:equip)
      $scene = Scene_Menu.new($game_temp.menu_command_index[:equip])
    else
      $scene = Scene_Map.new
    end
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_Status
#==============================================================================

class Scene_Status < Scene_Base
  #--------------------------------------------------------------------------
  # ● 元の画面へ戻る
  #--------------------------------------------------------------------------
  def return_scene
    if $game_temp.menu_command_index.has_key?(:status)
      $scene = Scene_Menu.new($game_temp.menu_command_index[:status])
    else
      $scene = Scene_Map.new
    end
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_File
#==============================================================================

class Scene_File < Scene_Base
  #--------------------------------------------------------------------------
  # ● 元の画面へ戻る
  #--------------------------------------------------------------------------
  alias return_scene_KGC_CustomMenuCommand return_scene
  def return_scene
    if @from_title || @from_event
      return_scene_KGC_CustomMenuCommand
    elsif $game_temp.menu_command_index.has_key?(:save)
      $scene = Scene_Menu.new($game_temp.menu_command_index[:save])
    else
      $scene = Scene_Map.new
    end
  end
end

#★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

#==============================================================================
# ■ Scene_End
#==============================================================================

class Scene_End < Scene_Base
  #--------------------------------------------------------------------------
  # ● 元の画面へ戻る
  #--------------------------------------------------------------------------
  def return_scene
    if $game_temp.menu_command_index.has_key?(:game_end)
      $scene = Scene_Menu.new($game_temp.menu_command_index[:game_end])
    else
      $scene = Scene_Map.new
    end
  end
end