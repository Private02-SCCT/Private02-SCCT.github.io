let fuseInstance = null;

async function initializeFuse() {
    document.getElementById("status").innerText = "データを読み込み中...";
    try {
        const response = await fetch('./data_c.json'); //TODO:
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - data.jsonが見つかりません。`);
        }
        const data = await response.json();
        
    const options = {
        threshold: 0.3,
        includeScore: true,
        refIndex: true,
        keys: [
            { name: "name.content", weight: 2.5 },
            { name: "furigana.content", weight: 2.0 },
            { name: "type.content", weight: 1.0 },
            { name: "fa.content", weight: 1.5 },
            { name: "fm.content", weight: 1.5 },
            { name: "fn.content", weight: 1.5 },
            { name: "streamtag.content", weight: 1.5 },
            { name: "production.content", weight: 1.0 },
            { name: "group.content", weight: 2.0 },
            { name: "generation.content", weight: 2.0},
            { name: "unit.content", weight: 2.0 },
            { name: "status.content", weight: 0.5 },
            { name: "YouTube.content", weight: 1.0 },
            { name: "X.content", weight: 1.0 },
            { name: "subX.content", weight: 0.5 },
        ],
    };
        
        fuseInstance = new Fuse(data, options);
        document.getElementById("status").innerText = `検索準備完了。${data.length}件のデータがロードされました。`;

    } catch (error) {
        console.error('Fuse.jsの初期化に失敗:', error);
        document.getElementById("status").innerText = `エラー: データの読み込みに失敗しました。詳細をコンソールで確認してください。`;
    }
}