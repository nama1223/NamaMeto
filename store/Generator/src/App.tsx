import React, { useState, useEffect, FC } from 'react';
import { Upload, Download, Languages, Image as ImageIcon, Sparkles, Trash2, Video, Youtube } from 'lucide-react';

// --- Types & Utils ---

export type AppConfig = {
  appUrl: string;
  appIcon: string;
  media: Array<{ type: 'image' | 'youtube' | 'video'; src?: string; id?: string }>;
  moreApps: Array<{ id: string; icon: string; url: string }>;
  ja: {
    title: string;
    developer: string;
    buttonText: string;
    screenshotsTitle: string;
    description: string;
    moreAppsTitle: string;
    moreAppNames: Record<string, string>;
  };
  en: {
    title: string;
    developer: string;
    buttonText: string;
    screenshotsTitle: string;
    description: string;
    moreAppsTitle: string;
    moreAppNames: Record<string, string>;
  };
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const extractConfigFromHtml = (html: string): AppConfig | null => {
  const match = html.match(/const APP_CONFIG = ([\s\S]*?);\nlet currentLang/);
  if (match && match[1]) {
    try {
      const configObj = new Function(`return ${match[1]}`)();
      return configObj as AppConfig;
    } catch(e) {
      console.error("Parse config error", e);
      return null;
    }
  }
  return null;
};

const generateHtml = (config: AppConfig, baseTemplate: string): string => {
  const configString = JSON.stringify(config, null, 4);
  const safeConfigString = configString.replace(/<\/script>/g, '<\\/script>');
  return baseTemplate.replace(
    /const APP_CONFIG = [\s\S]*?;\nlet currentLang/m,
    `const APP_CONFIG = ${safeConfigString};\nlet currentLang`
  );
};

// --- Default Template ---

const DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>App Download Page</title>
<style>
    /* ＝＝＝ 基本設定・Play Store風のデザイン ＝＝＝ */
    :root {
        --primary-color: #01875f;
        --bg-color: #ffffff;
        --text-main: #202124;
        --text-sub: #5f6368;
        --border-color: #e8eaed;
        --btn-radius: 8px;
    }
    body {
        font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0; padding: 0; color: var(--text-main);
    }
    #app-container {
        max-width: 480px; margin: 0 auto; background-color: var(--bg-color);
        min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.1);
        padding-bottom: 40px; position: relative;
    }
    
    /* ＝＝＝ 各セクションのスタイル ＝＝＝ */
    .header-section { padding: 24px 100px 24px 24px; display: flex; gap: 16px; }
    .app-icon {
        width: 72px; height: 72px; border-radius: 16px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2); object-fit: cover;
    }
    .app-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .app-title { font-size: 24px; font-weight: bold; margin: 0 0 4px 0; line-height: 1.2; }
    .app-developer { color: var(--primary-color); font-size: 14px; font-weight: bold; margin: 0; }
    
    .action-section { padding: 0 24px 24px 24px; }
    .btn-install {
        display: block; width: 100%; padding: 12px 0;
        background-color: var(--primary-color); color: white;
        text-align: center; text-decoration: none; border-radius: var(--btn-radius);
        font-size: 14px; font-weight: bold; border: none; cursor: pointer;
    }
    
    /* スクリーンショット＆動画（横スクロール） */
    .screenshots-section { padding: 0 0 24px 24px; overflow: hidden; }
    .section-title { font-size: 18px; font-weight: bold; margin: 0 0 16px 0; padding-right: 24px;}
    .gallery-scroll {
        display: flex; gap: 12px; overflow-x: auto; padding-right: 24px;
        scroll-snap-type: x mandatory; scrollbar-width: none;
    }
    .gallery-scroll::-webkit-scrollbar { display: none; }
    
    .gallery-item-wrapper {
        position: relative; flex: 0 0 auto; cursor: pointer; scroll-snap-align: start;
    }
    .gallery-item {
        height: 250px; border-radius: 8px; object-fit: cover;
        border: 1px solid var(--border-color); display: block;
    }
    .img-portrait { width: 140px; }
    .img-landscape { width: 250px; }
    
    .play-icon {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 48px; height: 48px; background-color: rgba(0,0,0,0.6);
        border-radius: 50%; display: flex; justify-content: center; align-items: center;
        color: white; font-size: 20px; padding-left: 4px; box-sizing: border-box;
    }

    /* 説明文 */
    .description-section { padding: 0 24px 24px 24px; }
    .description-text { font-size: 14px; line-height: 1.6; color: var(--text-sub); white-space: pre-wrap; }
    .description-text a { color: var(--primary-color); text-decoration: none; font-weight: bold; }
    
    /* 類似アプリ */
    .more-apps-section { padding: 24px; border-top: 1px solid var(--border-color); }
    .more-apps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 16px; }
    .more-app-card { text-align: center; text-decoration: none; color: inherit; display: block;}
    .more-app-icon { width: 64px; height: 64px; border-radius: 12px; margin-bottom: 8px; object-fit: cover; }
    .more-app-name { font-size: 12px; color: var(--text-sub); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    /* 言語切り替えボタン */
	.lang-toggle {
	    position: absolute; top: 24px; right: 24px;
	    background: transparent; border: 1px solid var(--border-color);
	    border-radius: 16px; padding: 4px 12px; font-size: 12px;
	    color: var(--text-sub); cursor: pointer; background-color: var(--bg-color);
	    z-index: 10;
    }

    /* ＝＝＝ ライトボックス ＝＝＝ */
    #lightbox {
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.95); z-index: 1000;
        justify-content: center; align-items: center; flex-direction: column;
    }
    #lightbox.active { display: flex; }
    #lightbox-img { max-width: 90%; max-height: 80vh; object-fit: contain; border-radius: 4px; transition: opacity 0.2s; display: none; }
    
    #lightbox-video {
        width: 100%; max-width: 800px; aspect-ratio: 16 / 9; transition: opacity 0.2s; display: none; background: #000;
    }
    #lightbox-video iframe, #lightbox-video video { width: 100%; height: 100%; border: none; }

    .lightbox-controls { display: flex; justify-content: space-between; width: 100%; position: absolute; top: 50%; transform: translateY(-50%); padding: 0 20px; box-sizing: border-box; pointer-events: none; z-index: 1001;}
    .nav-btn { background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 50%; width: 44px; height: 44px; font-size: 20px; cursor: pointer; pointer-events: auto; }
    .close-btn { position: absolute; top: 20px; right: 20px; background: transparent; color: white; border: none; font-size: 32px; cursor: pointer; z-index: 1001;}
    .swipe-hint { color: rgba(255,255,255,0.5); font-size: 12px; position: absolute; bottom: 40px; }
</style>
</head>
<body>

<script>
window.onerror = function() { return true; }; // Suppress typical iframe script errors
const APP_CONFIG = {
    appUrl: "https://example.com",
    appIcon: "",
    media: [],
    moreApps: [],
    ja: {
        title: "タイトル",
        developer: "開発者",
        buttonText: "Webアプリを起動",
        screenshotsTitle: "スクリーンショット",
        description: "説明文",
        moreAppsTitle: "他のアプリ",
        moreAppNames: {}
    },
    en: {
        title: "Title",
        developer: "Developer",
        buttonText: "Launch Web App",
        screenshotsTitle: "Screenshots",
        description: "Description",
        moreAppsTitle: "More Apps",
        moreAppNames: {}
    }
};
let currentLang = 'ja';
</script>

<div id="app-container">
    <button class="lang-toggle" onclick="toggleLanguage()">EN / JP</button>
    <div class="header-section">
        <img id="ui-app-icon" class="app-icon" src="" alt="App Icon">
        <div class="app-info">
            <h1 id="ui-title" class="app-title"></h1>
            <p id="ui-developer" class="app-developer"></p>
        </div>
    </div>
    <div class="action-section">
        <a id="ui-action-btn" class="btn-install" href="#" target="_blank"></a>
    </div>
    <div class="screenshots-section">
        <h2 id="ui-screenshots-title" class="section-title"></h2>
        <div id="ui-gallery" class="gallery-scroll"></div>
    </div>
    <div class="description-section">
        <div id="ui-description" class="description-text"></div>
    </div>
    <div class="more-apps-section">
        <h2 id="ui-more-apps-title" class="section-title"></h2>
        <div id="ui-more-apps-grid" class="more-apps-grid"></div>
    </div>
</div>

<div id="lightbox">
    <button class="close-btn" onclick="closeLightbox()">×</button>
    <img id="lightbox-img" src="" alt="Enlarged Screenshot">
    <div id="lightbox-video"></div>
    
    <div class="lightbox-controls">
        <button class="nav-btn" onclick="prevMedia(event)">◀</button>
        <button class="nav-btn" onclick="nextMedia(event)">▶</button>
    </div>
    <div class="swipe-hint">Swipe to navigate</div>
</div>

<script>
window.onerror = function() { return true; }; // Suppress typical iframe script errors

const BLANK_IMG_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23e8eaed'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%239aa0a6' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
const BLANK_ICON_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23e8eaed'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%239aa0a6' text-anchor='middle' dominant-baseline='middle'%3EIcon%3C/text%3E%3C/svg%3E";

function setFallbackImage(imgElement, isIcon = false) {
    imgElement.onerror = null;
    imgElement.src = isIcon ? BLANK_ICON_SVG : BLANK_IMG_SVG;
}

function renderUI() {
    try {
        const textData = APP_CONFIG[currentLang] || APP_CONFIG.ja;
        
        document.getElementById('ui-title').innerText = textData.title || "";
        document.getElementById('ui-developer').innerText = textData.developer || "";
        const mainIcon = document.getElementById('ui-app-icon');
        mainIcon.src = APP_CONFIG.appIcon || BLANK_ICON_SVG;
        mainIcon.onerror = () => setFallbackImage(mainIcon, true);
        
        const actionBtn = document.getElementById('ui-action-btn');
        actionBtn.innerText = textData.buttonText || "";
        actionBtn.href = APP_CONFIG.appUrl || "#";
        
        document.getElementById('ui-screenshots-title').innerText = textData.screenshotsTitle || "";
        document.getElementById('ui-description').innerHTML = (textData.description || "").replace(/\\n/g, '<br>');
        document.getElementById('ui-more-apps-title').innerText = textData.moreAppsTitle || "";
        
        const gallery = document.getElementById('ui-gallery');
        gallery.innerHTML = "";
        if (APP_CONFIG.media && APP_CONFIG.media.length > 0) {
            APP_CONFIG.media.forEach((item, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'gallery-item-wrapper';
                wrapper.onclick = () => openLightbox(index);
                
                const img = document.createElement('img');
                img.className = 'gallery-item';
                
                if (item.type === 'youtube') {
                    img.src = \`https://img.youtube.com/vi/\${item.id}/hqdefault.jpg\`;
                    img.classList.add('img-landscape');
                    
                    const playIcon = document.createElement('div');
                    playIcon.className = 'play-icon';
                    playIcon.innerHTML = '▶';
                    wrapper.appendChild(playIcon);
                } else if (item.type === 'video') {
                    img.src = BLANK_IMG_SVG; // placeholder for local video in gallery
                    img.classList.add('img-landscape');
                    const playIcon = document.createElement('div');
                    playIcon.className = 'play-icon';
                    playIcon.innerHTML = '▶';
                    wrapper.appendChild(playIcon);
                } else {
                    img.src = item.src || BLANK_IMG_SVG;
                    img.classList.add('img-portrait');
                    img.onerror = () => setFallbackImage(img);
                }
                
                wrapper.appendChild(img);
                gallery.appendChild(wrapper);
            });
        }

        const moreAppsGrid = document.getElementById('ui-more-apps-grid');
        moreAppsGrid.innerHTML = "";
        if (APP_CONFIG.moreApps) {
            APP_CONFIG.moreApps.forEach(app => {
                const a = document.createElement('a');
                a.className = 'more-app-card';
                a.href = app.url || "#";
                
                const img = document.createElement('img');
                img.className = 'more-app-icon';
                img.src = app.icon || BLANK_ICON_SVG;
                img.onerror = () => setFallbackImage(img, true);
                
                const span = document.createElement('span');
                span.className = 'more-app-name';
                span.innerText = (textData.moreAppNames && textData.moreAppNames[app.id]) ? textData.moreAppNames[app.id] : "Unknown App";
                
                a.appendChild(img);
                a.appendChild(span);
                moreAppsGrid.appendChild(a);
            });
        }
    } catch(e) {
        console.error(e);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ja' ? 'en' : 'ja';
    renderUI();
}

let currentMediaIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');

function openLightbox(index) {
    if (!APP_CONFIG.media || APP_CONFIG.media.length === 0) return;
    currentMediaIndex = index;
    updateLightboxMedia();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxVideo.innerHTML = '';
}

function updateLightboxMedia() {
    if (!APP_CONFIG.media) return;
    const item = APP_CONFIG.media[currentMediaIndex];
    if (!item) return;
    
    lightboxImg.style.opacity = '0';
    lightboxVideo.style.opacity = '0';
    lightboxVideo.innerHTML = ''; 
    
    setTimeout(() => {
        if (item.type === 'youtube') {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.innerHTML = \`<iframe src="https://www.youtube.com/embed/\${item.id}?autoplay=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\`;
            lightboxVideo.style.opacity = '1';
        } else if (item.type === 'video') {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.innerHTML = \`<video src="\${item.src}" controls autoplay style="width: 100%; height: 100%; border: none;"></video>\`;
            lightboxVideo.style.opacity = '1';
        } else {
            lightboxVideo.style.display = 'none';
            lightboxImg.style.display = 'block';
            const tempImg = new Image();
            tempImg.src = item.src || BLANK_IMG_SVG;
            tempImg.onload = () => { lightboxImg.src = tempImg.src; lightboxImg.style.opacity = '1'; };
            tempImg.onerror = () => { lightboxImg.src = BLANK_IMG_SVG; lightboxImg.style.opacity = '1'; };
        }
    }, 150);
}

function prevMedia(e) {
    if(e) e.stopPropagation();
    currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : Math.max(0, APP_CONFIG.media.length - 1);
    updateLightboxMedia();
}

function nextMedia(e) {
    if(e) e.stopPropagation();
    currentMediaIndex = (currentMediaIndex < APP_CONFIG.media.length - 1) ? currentMediaIndex + 1 : 0;
    updateLightboxMedia();
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

let touchStartX = 0;
let touchEndX = 0;
lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});
lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) nextMedia();
    if (touchEndX > touchStartX + swipeThreshold) prevMedia();
});

// Use try catch for initial render
try {
    renderUI();
} catch(e) {}
</script>
</body>
</html>`;

// --- Form Components ---

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const TextField: FC<TextFieldProps> = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <input 
      type="text" 
      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const TextAreaField: FC<TextFieldProps> = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3 flex-1 flex flex-col">
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <textarea 
      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 flex-1 min-h-[200px] resize-y"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

// --- Media Editor Component ---

const MediaEditor: FC<{
  media: AppConfig['media'];
  onChange: (media: AppConfig['media']) => void;
}> = ({ media, onChange }) => {

  const addYoutube = () => {
    const id = prompt('YouTubeの動画IDを入力してください (例: dQw4w9WgXcQ):');
    if (id) {
      onChange([...media, { type: 'youtube', id }]);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    // Check for text (e.g. Youtube URL)
    const textData = e.dataTransfer.getData('text/plain');
    if (textData && !files.length) {
      const ytMatch = textData.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n]+)/);
      if (ytMatch) {
         onChange([...media, { type: 'youtube', id: ytMatch[1] }]);
         return;
      }
    }

    const newMedia = [...media];
    for (const item of files) {
      const file = item as File;
      if (file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        newMedia.push({ type: 'image', src: base64 });
      } else if (file.type.startsWith('video/')) {
        const base64 = await fileToBase64(file);
        newMedia.push({ type: 'video', src: base64 });
      }
    }
    onChange(newMedia);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeMedia = (index: number) => {
    onChange(media.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...media];
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    onChange(items);
  };

  const moveDown = (index: number) => {
    if (index === media.length - 1) return;
    const items = [...media];
    [items[index + 1], items[index]] = [items[index], items[index + 1]];
    onChange(items);
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="font-medium text-sm">画像や動画をここにドロップして追加</p>
        <p className="text-xs mt-1">または下のボタンから追加</p>
      </div>
      
      <div className="flex gap-2">
        <label className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-blue-200 transition">
          <ImageIcon size={16} /> 画像を追加
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            multiple 
            onChange={async (e) => {
              if (e.target.files) {
                const newMedia = [...media];
                for (const file of Array.from(e.target.files) as File[]) {
                  const base64 = await fileToBase64(file);
                  newMedia.push({ type: 'image', src: base64 });
                }
                onChange(newMedia);
              }
            }} 
          />
        </label>
        
        <label className="cursor-pointer bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-purple-200 transition">
          <Video size={16} /> 動画を追加
          <input 
            type="file" 
            accept="video/*" 
            className="hidden" 
            multiple 
            onChange={async (e) => {
              if (e.target.files) {
                const newMedia = [...media];
                for (const file of Array.from(e.target.files) as File[]) {
                  const base64 = await fileToBase64(file);
                  newMedia.push({ type: 'video', src: base64 });
                }
                onChange(newMedia);
              }
            }} 
          />
        </label>
        
        <button onClick={addYoutube} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-red-200 transition">
          <Youtube size={16} /> YouTubeを追加
        </button>
      </div>

      <div className="space-y-2">
        {media.map((item, index) => (
          <div key={index} className="flex items-center gap-3 bg-white border border-gray-200 p-2 rounded-md shadow-sm">
            <div className="flex flex-col gap-1 text-gray-400">
               <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-gray-700 disabled:opacity-30">▲</button>
               <button onClick={() => moveDown(index)} disabled={index === media.length - 1} className="hover:text-gray-700 disabled:opacity-30">▼</button>
            </div>
            
            <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
              {item.type === 'youtube' ? (
                <img src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`} className="w-full h-full object-cover" alt="yt" />
              ) : item.type === 'video' ? (
                <div className="text-xs font-bold text-gray-500">動画</div>
              ) : (
                <img src={item.src} className="w-full h-full object-cover" alt="img" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase">{item.type}</p>
              {item.type === 'youtube' ? (
                 <input 
                   type="text"
                   value={item.id}
                   onChange={e => {
                     const m = [...media];
                     m[index] = { ...item, id: e.target.value };
                     onChange(m);
                   }}
                   className="w-full text-sm border-b focus:outline-none focus:border-blue-500"
                   placeholder="YouTube ID"
                 />
              ) : (
                <p className="text-xs text-gray-400 truncate pr-2">ローカルファイル</p>
              )}
            </div>
            
            <button onClick={() => removeMedia(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {media.length === 0 && <p className="text-sm text-gray-400 italic">画像や動画はまだ追加されていません。</p>}
      </div>
    </div>
  );
};

// --- More Apps Editor Component ---

const MoreAppsEditor: FC<{
  moreApps: AppConfig['moreApps'];
  jaNames: Record<string, string>;
  enNames: Record<string, string>;
  onChange: (apps: AppConfig['moreApps'], jaNames: Record<string, string>, enNames: Record<string, string>) => void;
}> = ({ moreApps, jaNames, enNames, onChange }) => {

  const addApp = () => {
    const id = `app${Date.now()}`;
    onChange(
      [...moreApps, { id, icon: '', url: '' }],
      { ...jaNames, [id]: '新規アプリ' },
      { ...enNames, [id]: '' }
    );
  };

  const removeApp = (index: number) => {
    const id = moreApps[index].id;
    const newApps = moreApps.filter((_, i) => i !== index);
    const newJa = { ...jaNames }; delete newJa[id];
    const newEn = { ...enNames }; delete newEn[id];
    onChange(newApps, newJa, newEn);
  };

  const updateAppField = (index: number, key: keyof AppConfig['moreApps'][0], value: string) => {
    const newApps = [...moreApps];
    newApps[index] = { ...newApps[index], [key]: value };
    onChange(newApps, jaNames, enNames);
  };

  const updateAppName = (id: string, lang: 'ja'|'en', value: string) => {
    if (lang === 'ja') onChange(moreApps, { ...jaNames, [id]: value }, enNames);
    else onChange(moreApps, jaNames, { ...enNames, [id]: value });
  };

  return (
    <div className="space-y-4">
      <button onClick={addApp} className="w-full text-center py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded text-gray-700 transition">
        + アプリを追加
      </button>

      <div className="space-y-4">
        {moreApps.map((app, index) => (
          <div key={app.id} className="border border-gray-200 rounded p-3 bg-white shadow-sm space-y-3 relative">
            <button onClick={() => removeApp(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
              <Trash2 size={16} />
            </button>
            <div className="flex gap-4">
              <label className="w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 transition overflow-hidden">
                {app.icon ? (
                  <img src={app.icon} className="w-full h-full object-cover" alt="icon" />
                ) : (
                  <>
                    <ImageIcon size={20} />
                    <span className="text-[10px] mt-1">アイコン</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                   if (e.target.files?.[0]) {
                     const b64 = await fileToBase64(e.target.files[0]);
                     updateAppField(index, 'icon', b64);
                   }
                }} />
              </label>

              <div className="flex-1 space-y-2 pt-1">
                <input 
                  className="w-full text-sm border-b p-1 focus:outline-none focus:border-blue-500"
                  placeholder="アプリURL"
                  value={app.url}
                  onChange={e => updateAppField(index, 'url', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
              <div>
                <label className="text-xs text-gray-500 block mb-1">日本語表示名</label>
                <input 
                  className="w-full text-sm border p-1 rounded focus:outline-none focus:border-blue-500"
                  placeholder="名前"
                  value={jaNames[app.id] || ''}
                  onChange={e => updateAppName(app.id, 'ja', e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">英語表示名</label>
                <input 
                  className="w-full text-sm border p-1 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                  value={enNames[app.id] || ''}
                  onChange={e => updateAppName(app.id, 'en', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [baseHtml, setBaseHtml] = useState<string>(DEFAULT_TEMPLATE);
  const [activeLang, setActiveLang] = useState<'ja' | 'en'>('ja');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPreviewReady, setIsPreviewReady] = useState(false);

  useEffect(() => {
    const initialConfig = extractConfigFromHtml(DEFAULT_TEMPLATE);
    if (initialConfig) {
      setConfig(initialConfig);
      setIsPreviewReady(true);
    }

    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleWindowDrop = async (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file && file.name.endsWith('.html')) {
        const text = await file.text();
        const parsedConfig = extractConfigFromHtml(text);
        if (parsedConfig) {
          setConfig(parsedConfig);
          setBaseHtml(text);
        } else {
          alert("エラー: ファイルから APP_CONFIG を読み込めませんでした。");
        }
      }
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  const handleHtmlUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsedConfig = extractConfigFromHtml(text);
    if (parsedConfig) {
      setConfig(parsedConfig);
      setBaseHtml(text);
    } else {
      alert("エラー: ファイルから APP_CONFIG を読み込めませんでした。");
    }
  };

  const downloadHtml = () => {
    if (!config) return;
    const finalHtml = generateHtml(config, baseHtml);
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AppPage.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTranslate = async () => {
    if (!config) return;
    setIsTranslating(true);
    
    try {
      const textsToTranslate: Record<string, string> = {};
      const simpleKeys: (keyof AppConfig['ja'])[] = ['title', 'developer', 'buttonText', 'screenshotsTitle', 'description', 'moreAppsTitle'];
      
      simpleKeys.forEach(k => {
        const jaVal = config.ja[k] as string;
        const enVal = config.en[k] as string;
        if (jaVal && !enVal) {
          textsToTranslate[k] = jaVal;
        }
      });

      if (config.ja.moreAppNames) {
        Object.keys(config.ja.moreAppNames).forEach(id => {
          if (config.ja.moreAppNames[id] && !config.en.moreAppNames[id]) {
            textsToTranslate[`moreApp_${id}`] = config.ja.moreAppNames[id];
          }
        });
      }

      if (Object.keys(textsToTranslate).length === 0) {
        alert("翻訳が必要な空の英語項目はありません。");
        setIsTranslating(false);
        return;
      }

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textsToTranslate })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const translated = data.translatedData;
      const newEn = { ...config.en };
      simpleKeys.forEach(k => {
        if (translated[k]) newEn[k] = translated[k];
      });

      if (!newEn.moreAppNames) newEn.moreAppNames = {};
      Object.keys(translated).forEach(key => {
        if (key.startsWith('moreApp_')) {
          const id = key.replace('moreApp_', '');
          newEn.moreAppNames[id] = translated[key];
        }
      });

      setConfig({ ...config, en: newEn });
    } catch (e: any) {
      alert("翻訳に失敗しました: " + e.message);
    } finally {
      setIsTranslating(false);
    }
  };

  if (!config) return <div className="flex h-screen items-center justify-center p-4"><p>読み込み中...</p></div>;

  const currentLangData = config[activeLang];

  const updateLangField = (key: keyof AppConfig['ja'], value: string) => {
    setConfig({
      ...config,
      [activeLang]: {
        ...currentLangData,
        [key]: value
      }
    });
  };

  const renderPreview = () => {
    if (!isPreviewReady) return null;
    const html = generateHtml(config, baseHtml);
    return (
      <iframe
        srcDoc={html}
        className="w-full h-full border-0 bg-white"
        title="Preview"
      />
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Languages className="text-white" size={20} />
          </div>
          <h1 className="font-bold text-gray-800 text-lg tracking-tight">アプリ紹介ページ エディタ</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium text-sm rounded-md transition-colors">
            <Upload size={16} />
            HTMLを読み込む
            <input type="file" accept=".html" className="hidden" onChange={handleHtmlUpload} />
          </label>
          <button 
            onClick={downloadHtml}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md transition-colors shadow-sm"
          >
            <Download size={16} />
            HTMLを書き出す
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Form */}
        <div className="w-[450px] bg-gray-50 border-r flex flex-col shrink-0">
          
          <div className="p-4 border-b bg-white">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">共通設定</h2>
            <div className="flex gap-4">
              <label className="w-16 h-16 bg-gray-100 rounded-xl cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:bg-gray-200 transition overflow-hidden shadow-sm border border-gray-200">
                {config.appIcon ? (
                  <img src={config.appIcon} alt="App Icon" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={20} />
                    <span className="text-[10px] mt-1 font-medium">アイコン</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                   if (e.target.files?.[0]) {
                     const b64 = await fileToBase64(e.target.files[0]);
                     setConfig({ ...config, appIcon: b64 });
                   }
                }} />
              </label>
              <div className="flex-1 flex flex-col justify-center">
                <label className="block text-xs font-semibold text-gray-600 mb-1">アプリのURL</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 shadow-sm"
                  value={config.appUrl}
                  onChange={e => setConfig({ ...config, appUrl: e.target.value })}
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
            
            {/* Translations Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">テキスト編集</h3>
                <button 
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="flex items-center gap-1.5 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium hover:bg-amber-200 transition-colors disabled:opacity-50"
                  title="未翻訳の項目を自動翻訳"
                >
                  <Sparkles size={14} className={isTranslating ? "animate-pulse" : ""} />
                  {isTranslating ? "翻訳中..." : "未翻訳を自動翻訳"}
                </button>
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-shadow ${activeLang === 'ja' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveLang('ja')}
                >
                  日本語 (JA)
                </button>
                <button
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-shadow ${activeLang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveLang('en')}
                >
                  英語 (EN)
                </button>
              </div>

              <div className="space-y-1">
                <TextField label="タイトル" value={currentLangData.title as string || ''} onChange={v => updateLangField('title', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="開発者" value={currentLangData.developer as string || ''} onChange={v => updateLangField('developer', v)} />
                  <TextField label="ボタンのテキスト" value={currentLangData.buttonText as string || ''} onChange={v => updateLangField('buttonText', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="スクリーンショット欄のタイトル" value={currentLangData.screenshotsTitle as string || ''} onChange={v => updateLangField('screenshotsTitle', v)} />
                  <TextField label="他のアプリ欄のタイトル" value={currentLangData.moreAppsTitle as string || ''} onChange={v => updateLangField('moreAppsTitle', v)} />
                </div>
                <TextAreaField label="説明文" value={currentLangData.description as string || ''} onChange={v => updateLangField('description', v)} />
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Media Section */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">画像と動画</h3>
              <MediaEditor 
                media={config.media} 
                onChange={media => setConfig({ ...config, media })} 
              />
            </section>

            <hr className="border-gray-200" />

            {/* More Apps Section */}
            <section>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">その他のアプリ</h3>
              <MoreAppsEditor 
                moreApps={config.moreApps}
                jaNames={config.ja.moreAppNames || {}}
                enNames={config.en.moreAppNames || {}}
                onChange={(moreApps, jaNames, enNames) => setConfig({
                  ...config,
                  moreApps,
                  ja: { ...config.ja, moreAppNames: jaNames },
                  en: { ...config.en, moreAppNames: enNames }
                })}
              />
            </section>

          </div>
        </div>

        {/* Right Preview */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-2 z-10 opacity-50 hover:opacity-100 transition-opacity">
             <div className="bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm pointer-events-none">プレビュー</div>
          </div>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}
