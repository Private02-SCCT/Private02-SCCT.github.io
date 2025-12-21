

function createVtuberCardHTML(item) {
  const summaryInfo = `
      <div class="summary-info">
          <p><strong>所属:</strong> ${item.group.content} (${item.generation.content})</p>
          <p><strong>ファンネーム:</strong> ${item.fn.content}</p>
          <p><strong>配信タグ:</strong> ${item.streamtag.content}</p>
      </div>
  `;

  const imageUrl = item.prImg.content || "default_placeholder.png";//TODO:

  const colorClass = item.color.content || "default";//TODO:

  let cardHTML = `
      <div class="VCard_main ${colorClass}">
          <div class="bgBox"></div>
          
          <div class="tableBox">
              ${summaryInfo}
          </div>
          
          <div class="trimBox">
              <img
                  src="${imageUrl}"
                  alt="${item.name.content}"
                  class="pr_img"
                  loading="lazy"
              />
          </div>
          <div class="nameBox">
              <span class="span_name">
                  <p class="p_name">${item.name.content}</p>
              </span>
              <div class="bar_img"></div>
          </div>
      </div>
  `;

  return cardHTML;
}

function createVtuberCard(searchResults) {
    const cardContainer = document.getElementById("card-results-container");
    cardContainer.innerHTML = "";
    const topFiveResults = searchResults.slice(0, 5);
    let allCardsHTML = "";
    topFiveResults.forEach((result) => {
        allCardsHTML += createVtuberCardHTML(result.item);
    });
    cardContainer.innerHTML = allCardsHTML;
}