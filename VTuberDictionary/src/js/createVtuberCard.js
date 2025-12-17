function createVtuberCard(item) {
  const summaryInfo = `
      <div class="summary-info">
          <p><strong>所属:</strong> ${item.group} (${item.generation})</p>
          <p><strong>ファンネーム:</strong> ${item.fn}</p>
          <p><strong>配信タグ:</strong> ${item.streamtag}</p>
      </div>
  `;

  const imageUrl = item.prImg || "default_placeholder.png";//TODO:

  const colorClass = item.color || "default";//TODO:

  let cardHTML = `
      <div class="main ${colorClass}">
          <div class="bgBox"></div>
          
          <div class="tableBox">
              ${summaryInfo}
          </div>
          
          <div class="trimBox">
              <img
                  src="${imageUrl}"
                  alt="${item.name}"
                  class="pr_img"
                  loading="lazy"
              />
          </div>
          <div class="nameBox">
              <span class="span_name">
                  <p class="p_name">${item.name}</p>
              </span>
              <div class="bar_img"></div>
          </div>
      </div>
  `;

  return cardHTML;
}