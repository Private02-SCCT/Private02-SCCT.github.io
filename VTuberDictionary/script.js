let fuseInstance = null;
let currentGrid = null;

async function initializeFuse() {
    resultsDiv.textContent = 'データを読み込み中...';
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - data.jsonが見つかりません。`);
        }
        const data = await response.json();
        
    const options = {
        threshold: 0.3,
        includeScore: true,
        refIndex: true,
        keys: [
            { name: "name", weight: 2.5 },
            { name: "furigana", weight: 2.0 },
            { name: "type", weight: 1.0 },
            { name: "fa", weight: 1.5 },
            { name: "fm", weight: 1.5 },
            { name: "fn", weight: 1.5 },
            { name: "streamtag", weight: 1.5 },
            { name: "production", weight: 1.0 },
            { name: "group", weight: 2.0 },
            { name: "status", weight: 0.5 },
            { name: "YouTube", weight: 1.0 },
            { name: "X", weight: 1.0 },
            { name: "subX", weight: 0.5 },
        ],
        includeScore: true,
        refIndex: true,
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
    const searchResults = fuseInstance.search(keyword);
    let gridData = [];

    const gridElement = document.getElementById("gridTag");
    gridElement.classList.add('is-loading');

    if (keyword.length === 0) {
        resultsDiv.textContent = 'キーワードを入力してください。';
        if (currentGrid) {
            currentGrid.updateConfig({ data: [] }).forceRender();
        }
        gridElement.classList.remove('is-loading');
        return;
    }

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

        if (currentGrid === null) {
            currentGrid = new gridjs.Grid({
                columns: ["名前","ふりがな","種類","ファンアートタグ","ファンマーク","ファンネーム","配信タグ","所属事務所","所属グループ・ユニット・所属期生","現在のステータス","YouTubeチャンネル","Xアカウント","Xサブアカウント"],
                data: gridData,
            }).render(document.getElementById("gridTag"));
            sort: true,
            pagination: {
                enabled: true,
                limit: 10,
                summary: true 
            },
            
        } else {
            currentGrid.updateConfig({ 
                data: gridData,
                sort: true,
                pagination: {
                enabled: true,
                limit: 10,
                summary: true 
            },}).forceRender();
        }

        gridElement.classList.remove('is-loading');
    } else {
        resultsDiv.textContent = `キーワード「${keyword}」に一致する結果は見つかりませんでした。`;
        if (currentGrid) {
            currentGrid.updateConfig({ data: [] }).forceRender();
        }
        gridElement.classList.remove('is-loading');
    }
}

const resultsDiv = document.getElementById("status")
const searchInput = document.getElementById("search")
const btn = document.getElementById("btn")
btn.addEventListener('click', handleSearch);

initializeFuse();