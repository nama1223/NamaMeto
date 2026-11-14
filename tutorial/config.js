window.NAMA_TUTORIAL_CONFIG = {
  appId: 'namameto',
  assetBase: 'tutorial/img/',
  buttonImage: 'tutorial/img/tutorial-button.png',
  bridge: 'NamaMetoTutorialBridge',
  introTitle: 'NamaMetoの使い方',
  introText: 'メトロノームと楽曲モードの使い方を、実際の画面を触りながら案内しナマ。',
  chapters: [
    {
      id: 'intro', page: 'metro', title: 'はじめに', desc: '画面の構成と、この案内の使い方', icon: 'wave', since: 1,
      steps: [
        { pose: 'wave', text: 'やあ！生物（ナマモノ）ナマ。NamaMetoの案内役ナマ。この案内はいつでも✕ボタンでやめられて、やめた後も右下のボタンから見直せナマ。気楽にどうぞナマ。' },
        { target: '.app-tabs', pose: 'point', text: '画面は3つのタブに分かれてナマ。メトロノーム、楽曲モード、設定ナマ。上のタブで切り替えナマ。' },
        { target: '#tabBtn-song', pose: 'point', text: '楽曲モードでは、テンポの流れを「ブロック」で組み立てて、曲を通して再生できナマ。後の章で案内しナマ。' },
        { target: '#nt-btn', pose: 'thumbs_up', text: 'この案内は、右下のこのボタンからいつでも開き直せナマ。新しい章が増えると赤い印が付きナマ。' }
      ]
    },
    {
      id: 'metro', page: 'metro', title: 'メトロノーム', desc: 'テンポ・拍子・タップテンポ', icon: 'yay', since: 1,
      steps: [
        { page: 'metro', pose: 'wave', text: 'メトロノームの章ナマ。まずはテンポの合わせ方からナマ。' },
        { page: 'metro', target: '#bpmSlider', mode: 'free', pose: 'point', text: 'テンポはこのスライダーで変えられナマ。実際に動かしてみるナマ。この章で変えた内容は、終わったら元に戻りナマ。' },
        { page: 'metro', target: '#bpmInput', pose: 'point', text: '数字を直接入れて、細かく合わせることもできナマ。' },
        { page: 'metro', target: '#tapTempoBtn', mode: 'tap', pose: 'point', text: 'タップテンポナマ。拍に合わせて数回押すと、その速さがテンポになりナマ。試しに押してみるナマ。' },
        { page: 'metro', target: '#beatsCtrl', pose: 'point', text: '拍子はここで設定しナマ。' },
        { page: 'metro', target: '#playBtn', mode: 'tap', pose: 'point', text: '再生と停止はこのボタンからナマ。押してみるナマ。' }
      ]
    },
    {
      id: 'song', page: 'song', title: '楽曲モード', desc: '曲を選んで通して再生する', icon: 'yay', since: 1,
      steps: [
        { page: 'song', pose: 'wave', text: '楽曲モードの章ナマ。曲を選んで、ブロックの流れを通して再生する画面ナマ。' },
        { page: 'song', target: '#songPicker', pose: 'point', text: '曲はここで選びナマ。サンプルの曲も入ってナマ。' },
        { page: 'song', target: '#songTimeBar', pose: 'point', text: '再生中はこのバーで、全体の進み具合が分かりナマ。' },
        { page: 'song', target: '#playBtn', mode: 'tap', pose: 'point', text: '再生は下の大きなボタンからナマ。曲の頭からブロックを順に再生しナマ。押してみるナマ。' },
        { page: 'song', target: '#playFabWrapper', pose: 'point', text: 'その横のボタンはテンポ比率ナマ。ブロックのテンポは書き換えずに、練習用に何％の速さで鳴らすか変えられナマ。' },
        { page: 'song', target: '#btnEditTab', pose: 'point', text: 'ブロックの中身を変える時は「編集」へ切り替えナマ。次の章で案内しナマ。' }
      ]
    },
    {
      id: 'edit', page: 'song-edit', title: 'ブロック編集', desc: 'テンポと小節数をブロックごとに組む', icon: 'thinking', since: 1,
      steps: [
        { page: 'song-edit', pose: 'wave', text: 'ブロック編集の章ナマ。試しに触ってみても大丈夫ナマ。この章で変えた内容は、終わったら元に戻りナマ。' },
        { page: 'song-edit', target: '#scoreTrack .score-block', pose: 'point', text: 'これがブロックナマ。ブロックごとにテンポ・拍子・小節数が決まってナマ。曲は、ブロックを並べた流れそのものナマ。' },
        { page: 'song-edit', target: '#editBpm', mode: 'free', pose: 'point', text: '選んだブロックのテンポはここで変えられナマ。試しに触ってみるナマ。' },
        { page: 'song-edit', target: '#editBars', pose: 'point', text: '小節数はここナマ。この数だけ再生したら、次のブロックへ進みナマ。' },
        { page: 'song-edit', target: '#editRitToggle', pose: 'point', text: 'だんだん遅くしたい時は、ここの rit. を入れるナマ。着地点のテンポも決められナマ。' },
        { page: 'song-edit', target: '#btnInsertAdd', pose: 'point', text: 'ブロックの追加はここからナマ。曲の途中への挿入もできナマ。' }
      ]
    },
    {
      id: 'files', page: 'song-edit', title: 'ファイルと保存', desc: '曲の読み込み・書き出しと設定タブ', icon: 'thumbs_up', since: 1,
      steps: [
        { page: 'song-edit', pose: 'wave', text: 'ファイルと保存の章ナマ。作った曲は端末の中に保存されナマ。' },
        { page: 'song-edit', target: '#songMenuOpenBtn', pose: 'point', text: '曲の保存と読み込みは、編集画面の右下「≡」からナマ。押すと、上書き保存・別名保存・読み込みとファイル管理のメニューが開きナマ。' },
        { page: 'song-edit', target: '#tabBtn-file', pose: 'point', text: 'アプリ全体の設定は「設定」タブにまとまってナマ。音の細かい調整もここナマ。' }
      ]
    }
  ]
};
