// ==UserScript==
// @name                unlike button for douban
// @namespace           tingleshao
// @description         add unlike buttons for douban front page
// @include             http://www.douban.com/*
// @exclude             http://www.douban.com/*/*
// @version             1.2
// ==/UserScript==

// @include & @exclude make the script works only for the front page.

(function () {
    var guess_list = document.getElementsByClassName('guess-item');
    var DL_list = [];

    // restore DL_list
    var DL_list_str = GM_getValue('DL_list');
    if (DL_list_str) {
        DL_list = DL_list_str.split('&');
    }

    // start working
    for (var i = 0; i < guess_list.length; i++) {
        var guess_item = guess_list[i];

        // hide if necessary
        var unique_id = guess_item.getAttribute('unique_id');
        for (var j = 0; j < DL_list.length; j++) {
            if (DL_list[j] == unique_id) {
                guess_item.style.display = 'none';
            }
        }

        // add dislike button
        var ft = undefined;
        for (var j = 0; j < guess_item.children.length; j++) {
            var child_node = guess_item.children[j];
            if (child_node.className == 'ft') {
                ft = child_node;
                break;
            }
        }
        if (ft) {
            var btn = document.createElement('span');
            var btn_link = document.createElement('a');
            btn.appendChild(btn_link);
            
            btn.className = 'usr-btn fav-btn';
            btn_link.href = 'javascript:void(0);';
            btn_link.innerText = '不喜欢';
            btn_link.unique_id = guess_item.getAttribute('unique_id');
            btn_link.addEventListener('click', function () {
                var guess_item = this.parentNode.parentNode.parentNode;
                guess_item.style.display = 'none';
                
                DL_list.push(this.unique_id);
                if (DL_list.length > 30) {
                    DL_list = DL_list.slice(1);
                }
                GM_setValue('DL_list', DL_list.join('&'));
            });

            ft.appendChild(btn);
        }
    }
}) ();
