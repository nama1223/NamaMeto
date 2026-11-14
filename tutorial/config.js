window.NAMA_TUTORIAL_CONFIG = {
  appId: 'namameto',
  assetBase: 'tutorial/img/',
  buttonImage: 'tutorial/img/tutorial-button.png',
  bridge: 'NamaMetoTutorialBridge',
  introTitle: 'NamaMetoの使い方',
  introText: 'メトロノームと楽曲モードの使い方を、実際の画面を触りながら案内しナマ。',
  chapters: [
    {
      id: 'intro', page: 'metro', title: 'はじめに', desc: '画面の構成と、この案内の使い方', icon: 'wave', since: 2,
      steps: [
        { pose: 'wave', text: 'やあやあ！我こそは生物[ナマモノ] ナマ。NamaMetoの案内役を仰せつかってナマ。この案内はいつでも✕ボタンでやめられて、やめた後も右下のボタンから見直せナマ。' },
        { target: '.app-tabs', pose: 'point', text: '画面は3つのタブに分かれてナマ。メトロノーム、楽曲モード、設定ナマ。上のタブを押して切り替えナマ。' },
        { target: '#tabBtn-song', pose: 'point', text: '楽曲モードでは「小節群」を並べて、曲を通して再生できナマ。小節群とは、同じテンポや拍子が続く、ひとまとまりの区間のことナマ。Aメロやサビのような単位で分けると分かりやすいナマ。' },
        { target: '#nt-btn', pose: 'thumbs_up', text: 'この案内は、右下のこのボタンからいつでも開き直せナマ。新しい章が増えると赤い印が付きナマ。' }
      ]
    },
    {
      id: 'metro', page: 'metro', title: 'メトロノーム', desc: 'テンポの合わせ方・音色・ビートパターン・プリセット', icon: 'yay', since: 2,
      steps: [
        { page: 'metro', pose: 'wave', text: 'メトロノームの章ナマ。テンポの合わせ方には何通りも手段があるので、順に試していくナマ。この章で変えた内容は、終わったら元に戻りナマ。' },
        { page: 'metro', target: '#bpmSlider', mode: 'free', pose: 'point', text: 'まずは右端のスライダーナマ。上下に動かすとテンポが変わりナマ。試しに動かしてみるナマ。' },
        { page: 'metro', target: '#bpmDial', mode: 'free', pose: 'point', text: '丸いノブでもテンポを変えられナマ。指で円をなぞるように回すと、回した分だけテンポが変わりナマ。' },
        { page: 'metro', target: '#bpmInput', mode: 'free', pose: 'point', text: '数字を直接入れることもできナマ。枠を押して数字を入れてみるナマ。両脇の−と＋でも1ずつ変わりナマ。' },
        { page: 'metro', target: '#bpmCtrl', mode: 'free', pose: 'point', text: 'テンポ表示のまわりは、スクロールやスワイプでも調節できナマ。表示の近くを上下になぞってみるナマ。' },
        { page: 'metro', target: '#tapTempoBtn', mode: 'tap', pose: 'point', text: 'タップテンポナマ。拍の間隔で数回押すと、その速さがそのままテンポになりナマ。試しに押してみるナマ。' },
        { page: 'metro', target: '#headerVolBtn', mode: 'free', pose: 'point', text: '右上のスピーカーボタンナマ。押すと音量のスライダーが出て、ボタンの上を上下にスワイプすると、その場で音量が変わりナマ。試してみるナマ。' },
        { page: 'metro', target: '#soundSelect', mode: 'free', pose: 'point', text: '音色はここで変えられナマ。鳴らす音の種類を選んでみるナマ。自分で登録した音は、Customの欄に出てきナマ。' },
        { page: 'metro', target: '#beatsCtrl', mode: 'free', pose: 'point', text: '拍子はここナマ。−と＋で拍の数を変えられて、スクロールやスワイプでも調節できナマ。' },
        { page: 'metro', target: '#sequencer', mode: 'free', pose: 'point', text: 'ビートパターンナマ。マスを押すたびに、強・中・弱・無が切り替わりナマ。1小節の中で、どの拍をどう鳴らすかを決められナマ。' },
        { page: 'metro', target: ['#lbpmMult2', '#lbpmMult3', '#lbpmMult4'], mode: 'free', pose: 'point', text: '「刻む」にチェックを入れると、拍の合間にも細かく音が入りナマ。×2は2つ、×3は3つ、×4は4つに刻みナマ。' },
        { page: 'metro', target: '#presetSlotGrid', pose: 'point', text: 'プリセットナマ。今の設定を10枠まで保存できて、「ロード」と「セーブ」のボタンで呼び出したり残したりできナマ。枠を長押しすると中身の確認もできナマ。' },
        { page: 'metro', target: '#playBtn', mode: 'tap', pose: 'point', text: '再生と停止は下の大きなボタンからナマ。押してみるナマ。' }
      ]
    },
    {
      id: 'song', page: 'song', title: '楽曲モード', desc: '再生モードで曲を通して鳴らす', icon: 'yay', since: 2,
      steps: [
        { page: 'song', pose: 'wave', text: '楽曲モードのうち、「再生モード」の章ナマ。作った曲を通して鳴らす画面ナマ。曲の読み込みは「作成編集モード」の側からで、ファイルと保存の章で案内しナマ。' },
        { page: 'song', target: '#scoreTrack .score-block', mode: 'tap', pose: 'point', text: '上の小節群は、押すとそこが再生の開始位置になりナマ。途中から鳴らしたい時は、その小節群を押してみるナマ。長押しすると中身の確認もできナマ。' },
        { page: 'song', target: '#songPicker', mode: 'free', pose: 'point', text: '再生開始位置は、このドラムロールでも決められナマ。列を上下に転がして、小節群と小節を選ぶと、そこから再生が始まりナマ。' },
        { page: 'song', target: '#songTimeBar', pose: 'point', text: '枠の下に出ている数字は、進み具合の表示ナマ。再生を始めると、今どこを鳴らしているかと、全体の長さが分かりナマ。' },
        { page: 'song', target: '#playBtn', mode: 'tap', pose: 'point', text: '再生は下の大きなボタンからナマ。選んだ開始位置から、小節群を順に再生しナマ。押してみるナマ。' },
        { page: 'song', target: '#tempoRatioBtn', mode: 'free', pose: 'point', text: '横のボタンはテンポ比率ナマ。小節群のテンポは書き換えずに、鳴らす速さだけを何％にするか変えられナマ。ボタンの上を上下になぞると5％刻みで変わって、押すと数字で細かく決める画面が開きナマ。' },
        { page: 'song', target: ['#ttsToggle', '#precountMode'], pose: 'point', text: '音声読み上げを入れると、小節群の名前を声で知らせナマ。その下はカウントイン（予備拍）の設定で、再生が始まる前に予備の拍を鳴らすものナマ。' },
        { page: 'song', target: '#btnEditTab', pose: 'point', text: '小節群の中身を作ったり変えたりする時は「作成編集モード」に切り替えナマ。次の章で案内しナマ。' }
      ]
    },
    {
      id: 'edit', page: 'song-edit', title: '小節群の編集', desc: '小節群の中身を作る・変える', icon: 'thinking', since: 2,
      steps: [
        { page: 'song-edit', pose: 'wave', text: '小節群の編集の章ナマ。「作成編集モード」の画面で、小節群の中身を1つずつ決めていきナマ。この章で変えた内容は、終わったら元に戻りナマ。' },
        { page: 'song-edit', target: '#scoreTrack .score-block', mode: 'tap', pose: 'point', text: 'これが小節群ナマ。押して選ぶと、下の欄にその中身が出て、直せるようになりナマ。長押しで中身の確認、選んだ小節群の両脇の◀▶で並べ替えもできナマ。' },
        { page: 'song-edit', target: '#editName', mode: 'free', pose: 'point', text: '小節群の名前ナマ。Aメロやサビ、練習記号などを入れておくと見分けが付きやすいナマ。空欄なら小節番号が自動で入りナマ。' },
        { page: 'song-edit', target: '#editBpm', mode: 'free', pose: 'point', text: '選んだ小節群のテンポはここナマ。試しに変えてみるナマ。' },
        { page: 'song-edit', target: ['#editBars', '#editTimeSigNum', '#editTimeSigDen'], mode: 'free', pose: 'point', text: '小節数と拍子ナマ。小節数の分だけ再生したら、次の小節群へ進みナマ。拍子は分数の形で入れナマ。' },
        { page: 'song-edit', target: '#editClick', mode: 'tap', pose: 'point', text: '「細かく刻む」ナマ。入れると、拍の合間に細かいガイド音が追加されて、リズムが取りやすくなりナマ。実際にチェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#editComplexToggle', mode: 'tap', pose: 'point', text: '「複雑な拍子」ナマ。入れると下に専用の欄が開きナマ。まずチェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#complexSigPanel', pose: 'point', text: '複雑な拍子の欄ナマ。3/4＋2/4のように、複数の拍子をつないだ変拍子を作れナマ。下のマスでは拍ごとの強・中・弱・無も決められるので、自分専用のビートパターンを組みたい時にも使いナマ。' },
        { page: 'song-edit', target: '#editCountEnabled', mode: 'tap', pose: 'point', text: '「カウント」ナマ。入れた小節群では、再生中に声で拍を数えナマ。チェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#editRitToggle', mode: 'tap', pose: 'point', text: '「rit. / accel.」ナマ。小節群の中で、だんだん遅くしたり速くしたりする設定ナマ。チェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#editRitPanel', pose: 'point', text: '開いた欄では、着地点のテンポを決められナマ。「次のテンポ」を自動にすると、次の小節群のテンポへ滑らかにつながりナマ。変わり方のカーブも選べナマ。' },
        { page: 'song-edit', target: ['#multiSelBtn', '#repeatBtn', '#copyBtn', '#trashBtn'], pose: 'point', text: '小節群の並びの右にある4つのボタンも大事ナマ。☑は複数選択、𝄆はリピート設定、📄はコピー（貼り付けは上の挿入ボタンから）、🗑️は削除ナマ。' },
        { page: 'song-edit', target: ['#btnInsertBefore', '#btnInsertAdd'], pose: 'point', text: '新しい小節群の挿入はこの2つナマ。「前」は選んでいる小節群の前へ、「末尾」は末尾へ足しナマ。' }
      ]
    },
    {
      id: 'files', page: 'song-edit', title: 'ファイルと保存', desc: '曲の保存・読み込み・書き出し', icon: 'thumbs_up', since: 2,
      steps: [
        { page: 'song-edit', pose: 'wave', text: 'ファイルと保存の章ナマ。作った曲は、編集中は端末の中に下書きとして残りナマ。きちんと保存したり、ファイルに出したりする手順を案内しナマ。' },
        { page: 'song-edit', target: '#songMenuOpenBtn', mode: 'tap', pose: 'point', text: '曲の保存や読み込みは、右下の「≡」からナマ。実際に押してメニューを開いてみるナマ。中身を見たら「閉じる」で戻って、つぎへ進むナマ。' },
        { page: 'song-edit', pose: 'thinking', text: '開いたメニューの中身はこうナマ。「上書き保存」と「名前を付けて保存」で曲を残せて、「読み込み＆ファイル管理」からは保存した曲を呼び戻したり、名前を変えたり、.nm1ファイルへ書き出したりできナマ。書き出したファイルは、他の端末でも読み込めナマ。' },
        { page: 'song-edit', target: '#tabBtn-file', pose: 'point', text: 'アプリ全体の設定は、上の「設定」タブにまとまってナマ。次の章で中身を案内しナマ。' }
      ]
    },
    {
      id: 'settings', page: 'file', title: '設定', desc: 'アプリ全体の細かい調整', icon: 'yay', since: 1,
      steps: [
        { page: 'file', pose: 'wave', text: '設定の章ナマ。設定タブには細かい調整が並んでいて、項目はドラッグで並べ替えもできナマ。代表的なものを順に案内しナマ。' },
        { page: 'file', target: '#themeCtrl', pose: 'point', text: '「テーマカラー」ナマ。アプリ全体の配色を変えられナマ。' },
        { page: 'file', target: '#panel_volume', pose: 'point', text: '「音量調整」ナマ。クリック音や読み上げの声など、音の種類ごとに大きさを決められナマ。' },
        { page: 'file', target: '#panel_flash_vibe', pose: 'point', text: '「フラッシュ / バイブ」ナマ。拍に合わせて画面を光らせたり、本体を振動させたりできナマ。音が出せない場所の練習に便利ナマ。' },
        { page: 'file', target: '#panel_custom_sound', pose: 'point', text: '「オリジナル音色の登録」ナマ。自分の音源ファイルを、クリック音のCustom音色として登録できナマ。' },
        { page: 'file', target: '#panel_tts_settings', pose: 'point', text: '「読み上げの調整」ナマ。小節群の名前やカウントを読み上げる声の速さや高さなどを決められナマ。' },
        { page: 'file', target: '#panel_voice_ctrl', pose: 'point', text: '「外部機器/音声で再生/停止」ナマ。外部機器からの合図や声の合図で、再生と停止を操作する設定ナマ。' },
        { page: 'file', target: '#jumpCustomCtrl', pose: 'point', text: '「テンポ増減ボタンのカスタム」ナマ。メトロノームの±ボタンで、1回にどれだけテンポを変えるかを決められナマ。' },
        { page: 'file', target: '#panel_export', pose: 'point', text: '「データの入出力」ナマ。設定や曲のデータをファイルに書き出して控えを取ったり、読み込んで戻したりできナマ。' },
        { page: 'file', target: '#namaTutorialToggle', pose: 'point', text: '最後に、この案内ボタン自体の表示もここで切り替えられナマ。案内が要らなくなったら、ここで消せナマ。' }
      ]
    }
  ]
};
