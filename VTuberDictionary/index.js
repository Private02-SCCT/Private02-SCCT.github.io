let currentGrid = null;
let statusID = "status";

function handleSearch(i) {
    if (!fuseInstance) {
        alert('データがまだロードされていません。しばらくお待ちください。');
        return;
    }

    const keyword = i.value.trim();

    const searchResults = fuseInstance.search(keyword);
    let gridData = [];

    const gridElement = document.getElementById("gridTag");
    gridElement.classList.add('is-loading');

    if (keyword.length === 0) {
        document.getElementById(statusID).innerText = 'キーワードを入力してください。';
        
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

        //VCard
        createVtuberCard(searchResults)
    } else {
        document.getElementById(statusID).innerText = `キーワード「${keyword}」に一致する結果は見つかりませんでした。`
        if (currentGrid) {
            currentGrid.updateConfig({ data: [] }).forceRender();
        }
        gridElement.classList.remove('is-loading');
    }
}


const searchInput = document.getElementById("search")
const headerSearchInput = document.getElementById("headerSearch")
const btn = document.getElementById("btn")
const headerBtn = document.getElementById("headerBtn")

btn.addEventListener('click', function forBtn(){
    document.getElementById(statusID).innerText = "";
    handleSearch(searchInput)
});
headerBtn.addEventListener('click', function forHeaderBtn() {
    document.getElementById(statusID).innerText = "";
    handleSearch(headerSearchInput)
});


(async () => {
    await initializeFuse();
})();