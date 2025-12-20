let currentGrid = null;

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
        writeResults('キーワードを入力してください。', "status");
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

        makegrid(gridData)

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
        writeResults(`キーワード「${keyword}」に一致する結果は見つかりませんでした。`, "status");
        if (currentGrid) {
            currentGrid.updateConfig({ data: [] }).forceRender();
        }
        gridElement.classList.remove('is-loading');
    }
}

function makegrid(inputgridData){
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
            data: inputgridData,
            sort: true,
            pagination: {
            enabled: true,
            limit: 10,
            summary: true,
            },
        }).render(document.getElementById("gridTag"));
        } else {
            currentGrid.updateConfig({ 
                data: inputgridData,
                sort: true,
                pagination: {
                    enabled: true,
                    limit: 10,
                    summary: true 
                },
            }).forceRender();
        }
}



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