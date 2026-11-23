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
        { pose: 'wave', text: 'やあやあ！我こそは生物[ナマモノ] ナマ。NamaMetoの案内役を仰せつかってナマ。この案内はいつでも✕ボタンでやめられて、やめた後も{{btnPos}}のボタンから見直せナマ。' },
        { target: '.app-tabs', pose: 'point', text: '画面は3つのタブに分かれてナマ。メトロノーム、楽曲モード、設定ナマ。上のタブを押して切り替えナマ。' },
        { target: '#tabBtn-song', pose: 'point', text: '楽曲モードでは「小節群」を並べて、曲を通して再生できナマ。小節群とは、同じテンポや拍子が続く、ひとまとまりの区間のことナマ。Aメロやサビのような単位で分けると分かりやすいナマ。' },
        { target: '#nt-btn', pose: 'thumbs_up', text: 'この案内は、{{btnPos}}のこのボタンからいつでも開き直せナマ。新しい章が増えると赤い印が付きナマ。' }
      ]
    },
    {
      id: 'metro', page: 'metro', title: 'メトロノーム', desc: 'テンポの合わせ方・音色・ビートパターン・プリセット', icon: 'yay', since: 3,
      steps: [
        { page: 'metro', pose: 'wave', text: 'メトロノームの章ナマ。テンポの合わせ方には何通りも手段があるので、順に試していくナマ。この章で変えた内容は、終わったら元に戻りナマ。' },
        { page: 'metro', target: '#bpmSlider', mode: 'free', pose: 'point', text: 'まずは右端のスライダーナマ。上下に動かすとテンポが変わりナマ。試しに動かしてみるナマ。' },
        { page: 'metro', target: '#bpmDial', mode: 'free', pose: 'point', text: '丸いノブでもテンポを変えられナマ。指で円をなぞるように回すと、回した分だけテンポが変わりナマ。' },
        { page: 'metro', target: '#bpmInput', mode: 'free', pose: 'point', text: '数字を直接入れることもできナマ。枠を押して数字を入れてみるナマ。両脇の−と＋でも1ずつ変わりナマ。' },
        { page: 'metro', target: '#bpmCtrl', mode: 'free', pose: 'point', text: 'テンポ表示のまわりは、スクロールやスワイプでも調節できナマ。表示の近くを上下になぞってみるナマ。' },
        { page: 'metro', target: '#tapTempoBtn', mode: 'tap', pose: 'point', text: 'タップテンポナマ。拍の間隔で数回押すと、その速さがそのままテンポになりナマ。試しに押してみるナマ。' },
        { page: 'metro', target: '#headerVolBtn', mode: 'free', pose: 'point', bubblePos: 'bottom', text: '右上のスピーカーボタンナマ。押すと音量のスライダーが出て、ボタンの上を上下にスワイプすると、その場で音量が変わりナマ。試してみるナマ。' },
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
      id: 'edit', page: 'song-edit', title: '小節群の編集', desc: '小節群の中身を作る・変える', icon: 'thinking', since: 6,
      steps: [
        { page: 'song-edit', pose: 'wave', text: '小節群の編集の章ナマ。「作成編集モード」の画面で、小節群の中身を1つずつ決めていきナマ。この章で変えた内容は、終わったら元に戻りナマ。' },
        { page: 'song-edit', target: '#scoreTrack .score-block', mode: 'tap', pose: 'point', text: 'これが小節群ナマ。押して選ぶと、下の欄にその中身が出て、直せるようになりナマ。長押しで中身の確認、選んだ小節群の両脇の◀▶で並べ替えもできナマ。' },
        { page: 'song-edit', target: '#editName', mode: 'free', pose: 'point', text: '小節群の名前ナマ。Aメロやサビ、練習記号などを入れておくと見分けが付きやすいナマ。空欄なら小節番号が自動で入りナマ。' },
        { page: 'song-edit', target: '#editBpm', mode: 'free', pose: 'point', text: '選んだ小節群のテンポはここナマ。試しに変えてみるナマ。' },
        { page: 'song-edit', target: ['#editBars', '#editTimeSigNum', '#editTimeSigDen'], mode: 'free', pose: 'point', text: '小節数と拍子ナマ。小節数の分だけ再生したら、次の小節群へ進みナマ。拍子は分数の形で入れナマ。' },
        { page: 'song-edit', target: '#editClick', mode: 'tap', pose: 'point', text: '「細かく刻む」ナマ。入れると、拍の合間に細かいガイド音が追加されて、リズムが取りやすくなりナマ。実際にチェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#editComplexToggle', mode: 'tap', pose: 'point', text: '「複雑な拍子」ナマ。入れると下に専用の欄が開きナマ。まずチェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#complexSigPanel', mode: 'free', pose: 'point', text: '複雑な拍子の欄ナマ。3/4＋2/4のように、複数の拍子をつないだ変拍子を作れナマ。\n下のマスでは拍ごとの強・中・弱・無も決められるので、自分専用のビートパターンを組みたい時にも使いナマ。\n試しに数字を変えたり、マスを押したりしてみるナマ。' },
        { page: 'song-edit', target: '#editCountEnabled', mode: 'tap', pose: 'point', text: '「カウント」ナマ。入れた小節群では、再生中に声で拍を数えナマ。チェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#editRitToggle', mode: 'tap', pose: 'point', text: '「rit. / accel.」ナマ。小節群の中で、だんだん遅くしたり速くしたりする設定ナマ。チェックを入れてみるナマ。' },
        { page: 'song-edit', target: '#editRitPanel', mode: 'free', pose: 'point', prepare: 'prepareRitPanel', text: '開いた欄では、着地点のテンポを決められナマ。\n「次のテンポ」を自動にすると、次の小節群のテンポへ滑らかにつながりナマ。変わり方のカーブも選べナマ。\n試しに、到着BPMの数字やカーブを変えてみるナマ。' },
        { page: 'song-edit', target: ['#multiSelBtn', '#repeatBtn', '#copyBtn', '#trashBtn'], pose: 'point', text: '小節群の並びの右にある4つのボタンも大事ナマ。☑は複数選択、𝄆はリピート設定、📄はコピー（貼り付けは上の挿入ボタンから）、🗑️は削除ナマ。' },
        { page: 'song-edit', target: ['#btnInsertBefore', '#btnInsertAdd'], pose: 'point', text: '新しい小節群の挿入はこの2つナマ。「前」は選んでいる小節群の前へ、「末尾」は末尾へ足しナマ。' },
        { page: 'song-edit', pose: 'sparkle', prepare: 'copyAppUrlForAi', text: '最後に応用編ナマ。小節群を1つずつ手で作る代わりに、AIに作ってもらう手もありナマ。\n楽譜の写真や、曲の構成メモ（どこから何小節で、何拍子で、テンポはいくつか、という全体像が分かるもの）を、Meta社のAI「Muse」に見せると、小節群のデータを自動で作ってもらえナマ。\nその時に、このアプリのURLも一緒に渡すのがコツナマ。このアプリは1つのファイルでできていて、URLを開けば中身が全部読めるので、Museがデータの形式を読み取れナマ。\nURLは、この案内を開いた時に自動でコピーしてあるので、そのまま貼り付けられナマ（コピーできていない時は、下のURLを長押しなどでコピーするナマ）。\nhttps://nama1223.com/NamaMeto/NamaMeto.html' },
        { page: 'song-edit', pose: 'thumbs_up', text: 'Museからは、取り込める形のファイル（.nm1）になって返ってきナマ。\n返ってきたファイルを端末に保存したら、設定タブの「データの入出力」にある「インポート」から取り込めナマ。\nあとは、この章で覚えた直し方で仕上げるナマ。' }
      ]
    },
    {
      id: 'files', page: 'song-edit', title: 'ファイルと保存', desc: '曲の保存・読み込み・書き出し', icon: 'thumbs_up', since: 4,
      steps: [
        { page: 'song-edit', pose: 'wave', text: 'ファイルと保存の章ナマ。作った曲は、編集中は端末の中に下書きとして残りナマ。きちんと保存したり、ファイルに出したりする手順を案内しナマ。' },
        { page: 'song-edit', target: '#songMenuOpenBtn', mode: 'tap', pose: 'point', text: '曲の保存や読み込みは、右下の「≡」からナマ。実際に押してメニューを開いてみるナマ。中身を見たら「閉じる」で戻って、つぎへ進むナマ。' },
        { page: 'song-edit', pose: 'thinking', text: '開いたメニューの中身はこうナマ。「上書き保存」と「別名保存」で曲を残せて、「読み込み＆ファイル管理」からは保存した曲を呼び戻したり、名前を変えたりできナマ。下のほうには、ファイルの出入り口が並んでナマ。「[外部入力]単曲インポート(.nm1)」でファイルから曲を取り込めて、「[外部出力]単曲エクスポート(.nm1)」では今の曲をそのままファイルに書き出せナマ。書き出したファイルは、他の端末でも読み込めナマ。' },
        { page: 'song-edit', target: '#tabBtn-file', pose: 'point', text: 'アプリ全体の設定は、上の「設定」タブにまとまってナマ。次の章で中身を案内しナマ。' }
      ]
    },
    {
      id: 'settings', page: 'file', title: '設定', desc: 'アプリ全体の細かい調整', icon: 'yay', since: 3, keepChanges: true,
      steps: [
        { page: 'file', pose: 'wave', text: '設定の章ナマ。設定タブには細かい調整が並んでいて、項目はドラッグで並べ替えもできナマ。代表的なものを順に案内しナマ。' },
        { page: 'file', target: '#themeCtrl', mode: 'free', pose: 'point', text: '「テーマカラー」ナマ。アプリ全体の配色を変えられナマ。' },
        { page: 'file', target: '#panel_volume', mode: 'free', pose: 'point', text: '「音量調整」ナマ。クリック音や読み上げの声など、音の種類ごとに大きさを決められナマ。' },
        { page: 'file', target: '#panel_flash_vibe', mode: 'free', pose: 'point', text: '「フラッシュ / バイブ」ナマ。拍に合わせて画面を光らせたり、本体を振動させたりできナマ。音が出せない場所の練習に便利ナマ。' },
        { page: 'file', target: '#panel_custom_sound', mode: 'free', pose: 'point', text: '「オリジナル音色の登録」ナマ。自分の音源ファイルを、クリック音のCustom音色として登録できナマ。この欄にある「音色セット例のダウンロード (Google Drive)」というリンクの先には、カスタム枠に読み込むための音色セットが置かれてナマ。自分で音源を用意しなくても、そこから落として読み込めば、そのまま使えナマ。' },
        { page: 'file', target: '#panel_tts_settings', mode: 'free', pose: 'point', text: '「読み上げの調整」ナマ。小節群の名前やカウントを読み上げる声の速さや高さなどを決められナマ。' },
        { page: 'file', target: '#panel_voice_ctrl', mode: 'free', pose: 'point', text: '「外部機器/音声で再生/停止」ナマ。外部機器からの合図や声の合図で、再生と停止を操作する設定ナマ。' },
        { page: 'file', target: '#jumpCustomCtrl', mode: 'free', pose: 'point', text: '「テンポ増減ボタンのカスタム」ナマ。メトロノームの±ボタンで、1回にどれだけテンポを変えるかを決められナマ。' },
        { page: 'file', target: '#panel_export', mode: 'free', pose: 'point', text: '「データの入出力」ナマ。設定や曲のデータをファイルに書き出して控えを取ったり、読み込んで戻したりできナマ。' },
        { page: 'file', target: '#namaTutorialToggle', mode: 'free', pose: 'point', text: '最後に、この案内ボタン自体の表示もここで切り替えられナマ。案内が要らなくなったら、ここで消せナマ。' }
      ]
    }
  ],
  en: {
    introTitle: 'How to use NamaMetro',
    introText: 'I will show you how the metronome and Song Mode work, on the real screen, nama.',
    chapters: [
      {
        id: 'intro', page: 'metro', title: 'Getting started', desc: 'The screen layout, and how this guide works', icon: 'wave', since: 2,
        steps: [
          { pose: 'wave', text: 'Well met! I am Nama, the creature [Namamono], nama. I will be your guide for NamaMetro, nama. You can quit this guide anytime with the ✕ button, and open it again from the button at the {{btnPos}}, nama.' },
          { target: '.app-tabs', pose: 'point', text: 'The screen has three tabs, nama: Metronome, Song Mode, and Settings. Tap a tab at the top to switch, nama.' },
          { target: '#tabBtn-song', pose: 'point', text: 'In Song Mode, you line up "measure groups" and play through a whole song, nama. A measure group is a stretch where the same tempo and time signature continue — one chunk, like a verse or a chorus, nama.' },
          { target: '#nt-btn', pose: 'thumbs_up', text: 'You can reopen this guide anytime from this button at the {{btnPos}}, nama. When new chapters are added, it gets a red badge, nama.' }
        ]
      },
      {
        id: 'metro', page: 'metro', title: 'Metronome', desc: 'Tempo, sounds, beat patterns, and presets', icon: 'yay', since: 3,
        steps: [
          { page: 'metro', pose: 'wave', text: 'The Metronome chapter, nama. There are many ways to set the tempo, so we will try them one by one, nama. Anything you change in this chapter goes back to how it was at the end, nama.' },
          { page: 'metro', target: '#bpmSlider', mode: 'free', pose: 'point', text: 'First, the slider at the right edge, nama. Move it up or down and the tempo changes, nama. Try sliding it, nama.' },
          { page: 'metro', target: '#bpmDial', mode: 'free', pose: 'point', text: 'The round knob changes the tempo too, nama. Trace a circle with your finger, and the tempo follows how far you turned, nama.' },
          { page: 'metro', target: '#bpmInput', mode: 'free', pose: 'point', text: 'You can also type the number directly, nama. Tap the box and enter a tempo, nama. The − and + on both sides change it one by one, nama.' },
          { page: 'metro', target: '#bpmCtrl', mode: 'free', pose: 'point', text: 'Around the tempo display, scrolling and swiping work too, nama. Try stroking up and down near the display, nama.' },
          { page: 'metro', target: '#tapTempoBtn', mode: 'tap', pose: 'point', text: 'Tap tempo, nama. Tap a few times at the beat interval, and that speed becomes the tempo, nama. Try tapping, nama.' },
          { page: 'metro', target: '#headerVolBtn', mode: 'free', pose: 'point', bubblePos: 'bottom', text: 'The speaker button at the top right, nama. Tap it and a volume slider appears; swipe up or down on the button and the volume changes on the spot, nama. Try it, nama.' },
          { page: 'metro', target: '#soundSelect', mode: 'free', pose: 'point', text: 'Change the sound here, nama. Pick the kind of click, nama. Sounds you registered yourself appear under Custom, nama.' },
          { page: 'metro', target: '#beatsCtrl', mode: 'free', pose: 'point', text: 'The time signature is here, nama. The − and + change the number of beats, and scrolling or swiping works too, nama.' },
          { page: 'metro', target: '#sequencer', mode: 'free', pose: 'point', text: 'The beat pattern, nama. Each tap on a cell cycles strong, medium, weak, and off, nama. You decide how each beat in the bar sounds, nama.' },
          { page: 'metro', target: ['#lbpmMult2', '#lbpmMult3', '#lbpmMult4'], mode: 'free', pose: 'point', text: 'Check "Click" and extra notes fill in between the beats, nama. ×2 splits a beat into 2, ×3 into 3, ×4 into 4, nama.' },
          { page: 'metro', target: '#presetSlotGrid', pose: 'point', text: 'Presets, nama. You can save the current settings in up to 10 slots, and call them back or store them with the Load and Save buttons, nama. Long-press a slot to check what is inside, nama.' },
          { page: 'metro', target: '#playBtn', mode: 'tap', pose: 'point', text: 'Play and stop are on the big button at the bottom, nama. Try pressing it, nama.' }
        ]
      },
      {
        id: 'song', page: 'song', title: 'Song Mode', desc: 'Play through a song in Play Mode', icon: 'yay', since: 2,
        steps: [
          { page: 'song', pose: 'wave', text: 'This is the "Play Mode" chapter of Song Mode, nama — the screen for playing through a song you made, nama. Loading songs happens on the Create/Edit side, and I will guide you through it in the Files and saving chapter, nama.' },
          { page: 'song', target: '#scoreTrack .score-block', mode: 'tap', pose: 'point', text: 'Tap a measure group at the top, and that becomes the playback start position, nama. When you want to start in the middle, tap that measure group, nama. Long-press to check what is inside, nama.' },
          { page: 'song', target: '#songPicker', mode: 'free', pose: 'point', text: 'The start position can also be set with this drum roll, nama. Roll the columns up and down to pick a measure group and a measure, and playback starts there, nama.' },
          { page: 'song', target: '#songTimeBar', pose: 'point', text: 'The numbers under the frame show your progress, nama. Once playback starts, you can see where you are and the total length, nama.' },
          { page: 'song', target: '#playBtn', mode: 'tap', pose: 'point', text: 'Playback is on the big button at the bottom, nama. It plays the measure groups in order from the start position you picked, nama. Try pressing it, nama.' },
          { page: 'song', target: '#tempoRatioBtn', mode: 'free', pose: 'point', text: 'The button beside it is "Rate", the tempo multiplier, nama. Without rewriting the measure groups\' tempos, it changes only the playback speed, in percent, nama. Stroke up or down on the button to change it in 5% steps; tap it to open a screen for fine numbers, nama.' },
          { page: 'song', target: ['#ttsToggle', '#precountMode'], pose: 'point', text: 'Turn on voice announcements, and the names of measure groups are read aloud, nama. Below that is the count-in setting — it plays preparatory beats before playback starts, nama.' },
          { page: 'song', target: '#btnEditTab', pose: 'point', text: 'To make or change the contents of measure groups, switch to "Create/Edit Mode", nama. The next chapter guides you, nama.' }
        ]
      },
      {
        id: 'edit', page: 'song-edit', title: 'Editing measure groups', desc: 'Make and change what is inside a measure group', icon: 'thinking', since: 6,
        steps: [
          { page: 'song-edit', pose: 'wave', text: 'The measure group editing chapter, nama. On the Create/Edit Mode screen, you decide what is inside each measure group, one by one, nama. Anything you change in this chapter goes back to how it was at the end, nama.' },
          { page: 'song-edit', target: '#scoreTrack .score-block', mode: 'tap', pose: 'point', text: 'This is a measure group, nama. Tap to select it, and its contents appear in the panel below, ready to edit, nama. Long-press to check the contents, and the ◀▶ on both sides of a selected group reorder it, nama.' },
          { page: 'song-edit', target: '#editName', mode: 'free', pose: 'point', text: 'The measure group\'s name, nama. A verse, a chorus, or a rehearsal mark makes groups easy to tell apart, nama. Leave it empty and the measure number goes in automatically, nama.' },
          { page: 'song-edit', target: '#editBpm', mode: 'free', pose: 'point', text: 'The tempo of the selected measure group is here, nama. Try changing it, nama.' },
          { page: 'song-edit', target: ['#editBars', '#editTimeSigNum', '#editTimeSigDen'], mode: 'free', pose: 'point', text: 'The number of measures and the time signature, nama. After playing that many measures, it moves on to the next measure group, nama. Enter the time signature as a fraction, nama.' },
          { page: 'song-edit', target: '#editClick', mode: 'tap', pose: 'point', text: '"Guide Clicks", nama. Turn it on and fine guide notes are added between the beats, making the rhythm easier to follow, nama. Try checking it, nama.' },
          { page: 'song-edit', target: '#editComplexToggle', mode: 'tap', pose: 'point', text: '"Complex Sig.", nama. Turn it on and a special panel opens below, nama. First, try checking it, nama.' },
          { page: 'song-edit', target: '#complexSigPanel', mode: 'free', pose: 'point', text: 'The complex signature panel, nama. You can build odd meters by joining signatures, like 3/4 + 2/4, nama.\nIn the cells below, you can also set strong, medium, weak, or off for each beat, so use it when you want your own beat pattern, nama.\nTry changing the numbers, or tapping the cells, nama.' },
          { page: 'song-edit', target: '#editCountEnabled', mode: 'tap', pose: 'point', text: 'The 🔊 count (the checkbox labeled カウント）, nama. In a group with this on, the beats are counted aloud during playback, nama. Try checking it, nama.' },
          { page: 'song-edit', target: '#editRitToggle', mode: 'tap', pose: 'point', text: '"rit. / accel.", nama. Settings to gradually slow down or speed up inside the measure group, nama. Try checking it, nama.' },
          { page: 'song-edit', target: '#editRitPanel', mode: 'free', pose: 'point', prepare: 'prepareRitPanel', text: 'In the panel that opened, you set the Target BPM, nama.\nWith "Move to next tempo" set to Auto, it connects smoothly to the next measure group\'s tempo, nama. You can also pick the Curve, nama.\nTry changing the Target BPM or the Curve, nama.' },
          { page: 'song-edit', target: ['#multiSelBtn', '#repeatBtn', '#copyBtn', '#trashBtn'], pose: 'point', text: 'The four buttons to the right of the measure group row matter too, nama. ☑ is multi-select, 𝄆 is "Repeat Settings", 📄 is copy (paste from the insert buttons above), and 🗑️ is delete, nama.' },
          { page: 'song-edit', target: ['#btnInsertBefore', '#btnInsertAdd'], pose: 'point', text: 'Inserting a new measure group is these two, nama. "New Insert (Before)" adds one before the selected group, and "New Insert (End)" adds one at the end, nama.' },
          { page: 'song-edit', pose: 'sparkle', prepare: 'copyAppUrlForAi', text: 'Last, an advanced trick, nama. Instead of building measure groups by hand, you can have an AI make them, nama.\nShow a photo of the score, or a memo of the song\'s structure (something that shows the whole picture — where sections start, how many measures, what time signature, what tempo) to Meta\'s AI "Muse", and it can build the measure group data for you, nama.\nThe trick is to pass this app\'s URL along with it, nama. This app is made of a single file, so opening the URL lets Muse read everything inside and work out the data format, nama.\nThe URL was copied automatically when you opened this guide, so you can paste it as is, nama (if the copy did not happen, long-press the URL below to copy it, nama).\nhttps://nama1223.com/NamaMeto/NamaMeto.html' },
          { page: 'song-edit', pose: 'thumbs_up', text: 'From Muse, you get back a file (.nm1) in the format this app can import, nama.\nSave the returned file to your device, then import it from "Import" in "Data Import/Export" on the Settings tab, nama.\nAfter that, finish it with the editing you learned in this chapter, nama.' }
        ]
      },
      {
        id: 'files', page: 'song-edit', title: 'Files and saving', desc: 'Saving, loading, and exporting songs', icon: 'thumbs_up', since: 4,
        steps: [
          { page: 'song-edit', pose: 'wave', text: 'The Files and saving chapter, nama. While you edit, a song stays on your device as a draft, nama. I will guide you through saving it properly and putting it into files, nama.' },
          { page: 'song-edit', target: '#songMenuOpenBtn', mode: 'tap', pose: 'point', text: 'Saving and loading songs is from the "≡" at the bottom right, nama. Try pressing it to open the menu, nama. When you have seen what is inside, come back with "Close" and go next, nama.' },
          { page: 'song-edit', pose: 'thinking', text: 'Inside the opened menu is this, nama. "Overwrite Save" and "Save As" keep your song, and from "Load & File Manager" you can call back saved songs or rename them, nama. Further down are the file gates, nama. "[External Input] Import Song (.nm1)" brings a song in from a file, and "[External Output] Export Song (.nm1)" writes the current song out to a file as is, nama. An exported file can be loaded on other devices too, nama.' },
          { page: 'song-edit', target: '#tabBtn-file', pose: 'point', text: 'All the app-wide settings are gathered in the "Settings" tab at the top, nama. The next chapter guides you through them, nama.' }
        ]
      },
      {
        id: 'settings', page: 'file', title: 'Settings', desc: 'Fine adjustments for the whole app', icon: 'yay', since: 3, keepChanges: true,
        steps: [
          { page: 'file', pose: 'wave', text: 'The Settings chapter, nama. The Settings tab lines up fine adjustments, and items can be reordered by dragging, nama. I will guide you through the main ones in order, nama.' },
          { page: 'file', target: '#themeCtrl', mode: 'free', pose: 'point', text: '"Theme Color", nama. You can change the color scheme of the whole app, nama.' },
          { page: 'file', target: '#panel_volume', mode: 'free', pose: 'point', text: '"Volume", nama. You can set the size of each kind of sound — clicks, the speech voice, and so on, nama.' },
          { page: 'file', target: '#panel_flash_vibe', mode: 'free', pose: 'point', text: '"Flash / Vibrate", nama. Flash the screen or vibrate the device along with the beat, nama. Handy for practicing where you cannot make sound, nama.' },
          { page: 'file', target: '#panel_custom_sound', mode: 'free', pose: 'point', text: '"Custom Sound Setup", nama. You can register your own sound files as Custom click sounds, nama. The "Download Sound Set Examples (Google Drive)" link in this panel leads to sound sets you can load into the Custom slots, nama. Even without preparing your own files, you can download from there, load them, and use them as is, nama.' },
          { page: 'file', target: '#panel_tts_settings', mode: 'free', pose: 'point', text: '"Speech Settings", nama. Set the speed and pitch of the voice that reads out measure group names and counts, nama.' },
          { page: 'file', target: '#panel_voice_ctrl', mode: 'free', pose: 'point', text: '"External Device / Voice", nama. Settings to control play and stop by signals from external devices or by voice cues, nama.' },
          { page: 'file', target: '#jumpCustomCtrl', mode: 'free', pose: 'point', text: '"Custom Tempo Buttons", nama. Set how much one press of the metronome\'s ± buttons changes the tempo, nama.' },
          { page: 'file', target: '#panel_export', mode: 'free', pose: 'point', text: '"Data Import/Export", nama. Write settings and song data out to files to keep copies, or load them back, nama.' },
          { page: 'file', target: '#namaTutorialToggle', mode: 'free', pose: 'point', text: 'Last, this guide button itself can be shown or hidden here, nama. When you no longer need the guide, turn it off here, nama.' }
        ]
      }
    ]
  }
};
