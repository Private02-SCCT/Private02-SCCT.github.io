function findAllMatchIdsEfficiently(arr, keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    const hitIds = [];
    
    arr.forEach((item, index) => {
        const itemString = JSON.stringify(item).toLowerCase();
        if (itemString.includes(lowerCaseKeyword)) {
            hitIds.push(index);
        }
    });
    return hitIds;
}

keyword = "しぐれうい"
alert(findAllMatchIdsEfficiently(data, keyword))