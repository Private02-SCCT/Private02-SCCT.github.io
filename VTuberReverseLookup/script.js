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


function main(){
  alert("debug_result")
  result = fuse.search(keyword);
  // result = findAllMatchIdsEfficiently(data, searchElement.value)
  alert(result)
}


const options = { keys: ["name", "furigana", "type","fa","fm","fn","production","streamtag","group"], includeScore: true };
const fuse = new Fuse(data, options);
const searchElement = document.getElementById("search")
const btnElement = document.getElementById("btn")

btnElement.addEventListener("click", main)