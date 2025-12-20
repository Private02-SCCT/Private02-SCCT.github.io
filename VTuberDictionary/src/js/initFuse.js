let fuseInstance = null;

async function initializeFuse() {
    document.getElementById("status").innerText = "データを読み込み中...";
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
        document.getElementById("status").innerText = `検索準備完了。${data.length}件のデータがロードされました。`;

    } catch (error) {
        console.error('Fuse.jsの初期化に失敗:', error);
        document.getElementById("status").innerText = `エラー: データの読み込みに失敗しました。詳細をコンソールで確認してください。`;
    }
}