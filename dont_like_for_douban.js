// ==UserScript==
// @name                dont-like button for douban
// @namespace           tingleshao
// @description         add don't like buttons for douban front page
// @include             http://www.douban.com/
// @version             1.0
// ==/UserScript==



var guessList = document.getElementsByClassName('guess3-list')[0].childNodes;

for (var i = 1; i < guessList.length-1; i=i+2) {
    var closeButton = document.createElement("cb");
    closeButton.id = "close_button" + i.toString();
    closeButton.href = "javascript";
    closeButton.innerText = "不喜欢";
    closeButton.innerHTML = "不喜欢";
    var style = '\
       #close_button& {\
          zoom: 1;\
          width: 3em;\
          padding: 5px 10px;\
          line-height: 1.2;\
          text-align: center;\
          -webkit-border-radius: 2px;\
          -moz-border-radius: 2px;\
          -o-border-radius: 2px;\
          border-radius: 2px;\
          width:24px;\
          color: #CA6445;\
          background: #FAE9DA;\
     	}\
     '
    style = style.replace('&',i.toString());
    GM_addStyle(style);
    document.getElementsByClassName('guess3-list')[0].childNodes[i].appendChild(closeButton);
}


function closeGuess(id){
    var i = parseInt(id.split('n')[1]);
	document.getElementsByClassName('guess3-list')[0].childNodes[i].style.display = 'none';
}

for (var i = 1; i < guessList.length-1; i=i+2) {
    cbb = document.getElementById("close_button"+i.toString());
    cbb.addEventListener("click",function(){closeGuess(this.id)}, false);
}
















