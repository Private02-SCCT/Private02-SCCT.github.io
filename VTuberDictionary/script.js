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

    if (searchResults.length > 0) {
        const ul = document.createElement('ul');
        searchResults.forEach(result => {
            const li = document.createElement('li');
            const name = result.item.name;
            const id = result.refIndex;

            li.textContent = `[ID: ${id}] ${name} (スコア: ${result.score.toFixed(3)})`;
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
    } else {
        resultsDiv.textContent = `キーワード「${keyword}」に一致する結果は見つかりませんでした。`;
    }
}

const resultsDiv = document.getElementById("resultDiv")
const searchInput = document.getElementById("search")
const btn = document.getElementById("btn")
btn.addEventListener('click', handleSearch);

HTMLの方にasyncと書いたら動くとかありえますあ？