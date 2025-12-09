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
  result = findAllMatchIdsEfficiently(data, searchElement.value)
  alert(result)
}

const searchElement = document.getElementById("search")
const btnElement = document.getElementById("btn")

btnElement.addEventListener("click", main)