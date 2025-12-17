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
            { name: "generation", weight: 2.0},
            { name: "unit", weight: 2.0 },
            { name: "status", weight: 0.5 },
            { name: "YouTube", weight: 1.0 },
            { name: "X", weight: 1.0 },
            { name: "subX", weight: 0.5 },
        ],
    };
        
        fuseInstance = new Fuse(data, options);
        resultsDiv.textContent = `検索準備完了。${data.length}件のデータがロードされました。`;

    } catch (error) {
        console.error('Fuse.jsの初期化に失敗:', error);
        resultsDiv.textContent = `エラー: データの読み込みに失敗しました。詳細をコンソールで確認してください。`;
    }
}

function handleSearch(i) {
    if (!fuseInstance) {
        alert('データがまだロードされていません。しばらくお待ちください。');
        return;
    }

    const keyword = i.value.trim();

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
                item.generation,
                item.unit,
                item.status,
                item.YouTube,
                item.X,
                item.subX
            ]
            gridData.push(row); 
        });

        if (currentGrid === null) {
        currentGrid = new gridjs.Grid({
            columns: [
            { name: "名前", width: "200px" },
            { name: "ふりがな", width: "150px" },
            { name: "種類", width: "150px" },
            { name: "ファンアートタグ", width: "200px" },
            { name: "ファンマーク", width: "150px" },
            { name: "ファンネーム", width: "200px" },
            { name: "配信タグ", width: "200px" },
            { name: "所属事務所", width: "230px" },
            { name: "所属グループ", width: "230px" },
            { name: "所属期生", width: "200px" },
            { name: "所属ユニット", width: "230px" },
            { name: "現在のステータス", width: "150px" },
            { name: "YouTubeチャンネル", width: "300px" },
            { name: "Xアカウント", width: "300px" },
            { name: "Xサブアカウント", width: "300px" },
            ],
            data: gridData,
            sort: true,
            pagination: {
            enabled: true,
            limit: 10,
            summary: true,
            },
        }).render(document.getElementById("gridTag"));
        } else {
            currentGrid.updateConfig({ 
                data: gridData,
                sort: true,
                pagination: {
                    enabled: true,
                    limit: 10,
                    summary: true 
                },
        }).forceRender();
        }

        gridElement.classList.remove('is-loading');

        // createVtuberCard
        const cardContainer = document.getElementById("card-results-container");
        cardContainer.innerHTML = "";
        const topFiveResults = searchResults.slice(0, 5);
        let allCardsHTML = "";
        topFiveResults.forEach((result) => {
        allCardsHTML += createVtuberCard(result.item);
        });
        cardContainer.innerHTML = allCardsHTML;
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
const headerSearchInput = document.getElementById("headerSearch")
const btn = document.getElementById("btn")
const headerBtn = document.getElementById("headerBtn")

btn.addEventListener('click', function forBtn(){
    handleSearch(searchInput)
});
headerBtn.addEventListener('click', function forHeaderBtn() {
    handleSearch(headerSearchInput)
});


initializeFuse();