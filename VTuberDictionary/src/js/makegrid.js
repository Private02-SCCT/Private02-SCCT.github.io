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