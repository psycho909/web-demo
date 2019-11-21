
var CreateUlObj = function (ElementID, attrArray,styleSet, eObj) {
    var e = document.createElement(ElementID);
    if (attrArray) {
        for (var k in attrArray) {
            if (k == 'class')
                e.className = attrArray[k];
            else if (k == 'id')
                e.id = attrArray[k];
            else if (k == 'href')
                e.href = attrArray[k];
            else if (k == 'target')
                e.target = attrArray[k];
            else if (k == 'src')
                e.src = attrArray[k];
            else e.setAttribute(k, attrArray[k]);
        }
    }
    if (styleSet) {
        for (var k in styleSet) e.style[k] = styleSet[k];
    }
    if (eObj) {
        for (var x = 0; x < eObj.length; x++) {
            e.appendChild(eObj[x]);
        }
    }
    
    return e;
}
var AppendElObj = function (ElementID, eObj) {
    var e = document.createElement(ElementID);
    if (eObj) {
        for (var x = 0; x < eObj.length; x++) {
            e.appendChild(eObj[x]);
        }
    }
    return e;
}
var createEl = function (ElementID, attrArray, styleSet, showtext) {
    var e = document.createElement(ElementID);
    if (attrArray) {
        for (var k in attrArray) {
            if (k == 'class')
                e.className = attrArray[k];
            else if (k == 'id')
                e.id = attrArray[k];
            else if (k == 'href')
                e.href = attrArray[k];
            else if (k == 'target')
                e.target = attrArray[k];
            else if (k == 'src')
                e.src = attrArray[k];
            else e.setAttribute(k, attrArray[k]);
        }
    }
    if (styleSet) {
        for (var k in styleSet) e.style[k] = styleSet[k];
    }
    if (showtext) {
        e.appendChild(document.createTextNode(showtext));
    }
    return e;
}
function removeOldResults(elementid) {
    var div = $(elementid)[0];
    if (div.children) {
        if (div.children.length >　0) {
            div.removeChild(div.firstChild);
        }        
    }
}
function formatDatetime(DTime, DType) {
    var remtxt = DTime; function consume(retxt) {
        var match = remtxt.match(new RegExp('^' + retxt));
        if (match) {
            remtxt = remtxt.substring(match[0].length);
            return match[0];
        }
        return '';
    }
    var year = consume('\\d{4}'); consume('-?');
    var month = consume('\\d{2}'); consume('-?');
    var dateMonth = consume('\\d{2}');
    var timeOrNot = consume('T');
    if (timeOrNot == 'T') {
        var hours = consume('\\d{2}');
        consume(':?');
        var mins = consume('\\d{2}');
        consume(':?');
        var seconds = consume('\\d{2}');
        var dateString;
        switch (DType) {
            case 0: dateString = year + '-' + month + '-' + dateMonth;
                break;
            case 1: dateString = year + '/' + month + '/' + dateMonth + ' ' + hours + ':' + mins + ':' + seconds;
                break;
            default: dateString = year + '/' + month + '/' + dateMonth;
                break;
        }
    } else {
        dateString = year + '/' + month + '/' + dateMonth
    }
    return dateString;
}
function AjaxNumPage(nowpage, totalpage, surl) {
    var strpage = ""; for (var i = 1; i <= totalpage; i++) {
        strpage += '<a href="#" onClick="ListData(' + i + ');"> '; if (i == nowpage)
            strpage += '<font color=red><b>' + i + '</b></font>'; else
            strpage += i; strpage += '</a> ';
    }
    return strpage;
}