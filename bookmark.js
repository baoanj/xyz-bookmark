window.onload = () => {
  chrome.bookmarks.getTree(data => {
    const bookmarkBar = data[0].children[0].children; // 书签栏
    let barHTML = '<ul>';
    bookmarkBar.forEach(item => {
      if (item.children) {
        barHTML += `<li><p data-id="${item.id}">${item.title}</p></li>`;
      } else {
        barHTML += `<li><img src="chrome://favicon/size/8@2x/${item.url}">
          <a title="${item.title}\n${item.url}" href="${item.url}"
          target="_blank">${item.title}</a></li>`;
      }
    });
    barHTML += '</ul>';
    document.getElementById('bookmark-bar').innerHTML = barHTML;
    document.getElementById('bookmark-bar').onmouseover = (e) => {
      if (e.target.nodeName.toUpperCase() === 'P') {
        for (let i = 0; i < bookmarkBar.length; i += 1) {
          if (bookmarkBar[i].id === e.target.getAttribute('data-id')) {
            let moreHTML = '';
            bookmarkBar[i].children.forEach(item => {
              if (item.children) {
                moreHTML += `<p>${item.title}</p>`
              } else {
                moreHTML += `<p><img src="chrome://favicon/size/8@2x/${item.url}">
                  <a title="${item.title}\n${item.url}" href="${item.url}"
                  target="_blank">${item.title}</a></p>`
              }
            });
            document.getElementById('bookmark-more').innerHTML = moreHTML;
          }
        }
      }
    }
  });
}
