let fuseInstance = null;

async function initializeFuse() {
    resultsDiv.textContent = 'データを読み込み中...';
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - data.jsonが見つかりません。`);
        }
        const data = await response.json();
        
        const options = {
            keys: ["name", "furigana", "production", "streamtag", "SNS.X", "SNS.YouTube"],
            includeScore: true,
            refIndex: true
        };
        
        fuseInstance = new Fuse(data, options);
        resultsDiv.textContent = `検索準備完了。${data.length}件のデータがロードされました。`;

    } catch (error) {
        console.error('Fuse.jsの初期化に失敗:', error);
        resultsDiv.textContent = `エラー: データの読み込みに失敗しました。詳細をコンソールで確認してください。`;
    }
}

function handleSearch() {
    if (!fuseInstance) {
        alert('データがまだロードされていません。しばらくお待ちください。');
        return;
    }

    const keyword = searchInput.value.trim();
    resultsDiv.innerHTML = '';

    if (keyword.length === 0) {
        resultsDiv.textContent = 'キーワードを入力してください。';
        return;
    }

    const searchResults = fuseInstance.search(keyword);
    let gridData = [];

    if (searchResults.length > 0) {
        searchResults.forEach(result => {
            const item = result.item;
            const row = [
                item.name,
                item.furigana,
                item.type,
                item.fa,
                item.fm,
                item.fn,
                item.streamtag,
                item.production,
                item.group,
                item.status,
                item.YouTube,
                item.X,
                item.subX
            ]
            gridData.push(row); 
        });
        new gridjs.Grid({
                columns: ["名前","ふりがな","種類","ファンアートタグ","ファンマーク","ファンネーム","配信タグ","所属事務所","所属グループ・ユニット・所属期生","現在のステータス","YouTubeチャンネル","Xアカウント","Xサブアカウント"],
                data: gridData
            }).render(document.getElementById("gridTag"));
    } else {
        resultsDiv.textContent = `キーワード「${keyword}」に一致する結果は見つかりませんでした。`;
        document.getElementById("gridTag").innerHTML = '';
    }
}





/*
名前
ふりがな
種類
ファンアートタグ
ファンマーク
ファンネーム
配信タグ
所属事務所
所属グループ・ユニット・所属期生
現在のステータス
YouTubeチャンネル
Xアカウント
Xサブアカウント

事務所アイコン
立ち絵
*/

// [
//   // 1番目の検索結果（スコアが最も低い＝最も一致度が高い）
//   {
//     "item": { /* 元のデータ配列から抽出された、一致したオブジェクト全体 */
//       "name": "大空スバル",
//       "furigana": "OozoraSubaru",
//       "production": "ホロライブ",
//       // ... その他のプロパティ ...
//     },
//     "refIndex": 0, // ★ 元の data 配列でのインデックス（ID）
//     "score": 0.125, // ★ 検索の一致度スコア (0.000が完全一致)
//     "matches": [ /* どのプロパティで一致したかの詳細情報（optionsで有効化した場合） */
//       {
//         "key": "production",
//         "value": "ホロライブ",
//         "indices": [
//           [0, 1] // キーワードとデータが一致した文字列の位置
//         ]
//       }
//     ]
//   },

const resultsDiv = document.getElementById("status")
const searchInput = document.getElementById("search")
const btn = document.getElementById("btn")
btn.addEventListener('click', handleSearch);

initializeFuse();