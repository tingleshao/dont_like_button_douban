// ==UserScript==
// @name                unlike button for douban
// @namespace           tingleshao
// @description         add unlike buttons for douban front page
// @include             http://www.douban.com/
// @version             1.1
// ==/UserScript==

var guessList = document.getElementsByClassName('guess3-list')[0].childNodes;

// close previous saved dont-like guess list

var DL_list_s = GM_getValue("DL_list");
if (typeof DL_list_s === "undefined") {
// have nothing in the DL_list_s
    DL_list = [];
}
else 
    DL_list = DL_list_s.split('&');

for (var i = 1; i < guessList.length-1; i=i+2) {
    for (var j = 0; j < DL_list.length; j=j+1) {
        if (DL_list[j] == document.getElementsByClassName('guess3-list')[0].childNodes[i].getAttribute('unique_id')) {
            document.getElementsByClassName('guess3-list')[0].childNodes[i].style.display = 'none';
        }    
    }
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
          cursor: pointer;\
     	}\
     '
    style = style.replace('&',i.toString());
    GM_addStyle(style);
    document.getElementsByClassName('guess3-list')[0].childNodes[i].appendChild(closeButton);
}

function closeGuess(id){
    var i = parseInt(id.split('n')[1]);
	document.getElementsByClassName('guess3-list')[0].childNodes[i].style.display = 'none';   
    DL_list.push(document.getElementsByClassName('guess3-list')[0].childNodes[i].getAttribute('unique_id'));
    if (DL_list.length > 20)
        DL_list = DL_list.slice(1,DL_list.length);
    new_DL_list_s = ""
    for (var i = 0; i < DL_list.length; i++) {
        new_DL_list_s = new_DL_list_s + DL_list[i];
        new_DL_list_s = new_DL_list_s + '&';
    }
    GM_setValue("DL_list",new_DL_list_s);
}

for (var i = 1; i < guessList.length-1; i=i+2) {
    cbb = document.getElementById("close_button"+i.toString());
    cbb.addEventListener("click",function(){closeGuess(this.id)}, false);
}









