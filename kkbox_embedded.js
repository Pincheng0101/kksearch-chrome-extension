
var href = new URL(window.location.href);
var search_keyword = href.searchParams.get("q");

var data = document.getElementById("rhs");
var d = document.createElement('div');
d.innerHTML = '<img src="' + chrome.extension.getURL('images/loading.gif') + '" width="98">';
data.insertBefore(d, data.childNodes[0]);

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://kk-search.herokuapp.com/search?q=" + search_keyword + "&type=track&territory=TW", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        var response = JSON.parse(xhr.responseText);
        if (response['tracks']['data'].length != 0) {
            d.innerHTML = '<iframe width="300" height="100" src="https://widget.kkbox.com/v1/?id=' + response['tracks']['data'][0]['id'] + '&amp;type=song&amp;terr=tw&amp;lang=tc" frameborder="0" scrolling="no"></iframe>';
        } else {
            d.innerHTML = '<img src="' + chrome.extension.getURL('images/404.svg') + '" height="98">';
        }
    }
}
xhr.send();
