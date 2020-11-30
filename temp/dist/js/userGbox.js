// 判斷H5
function checkH5(){
    var useragent = navigator.userAgent; 
    var reg=/BeaGo/gi;
    if(useragent.indexOf("BeaGo") > -1 || reg.test(useragent)){
        return true;
    }
}

function addScrollbar(){
    if(!isMobile.any){
        setTimeout(function(){
            $(".gbox-wrap").mCustomScrollbar({
                theme:"light"
            });
        }, 0);
    }
}

var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: true,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        addScrollbar()
	},
    afterClose:function(){
        $.gbox.close();
    },actionBtns: [{
        text: '確定',
        click:function(){
			$.gbox.close();
        }
    }]

}
var defaultHTML=
    '<div class="popup-title"><span>活動個人任務完成紀錄</span></div>\
    <div class="part1__body">\
        <div class="part1__list-box">\
            <div class="part1__list-title">Remastered全新Buff效果說明</div>\
        </div>\
    </div>\
';
// $.gbox.open(defaultHTML,defaultObj);

// 千萬轉蛋 - 活動個人任務
var taskPersonObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        addScrollbar()
	},
    afterClose:function(){
        $.gbox.close();
    }
}

function taskPersonRender(data){
    var tbodyHTML="";
    for(var i=0;i<data.length;i++){
        var status="";
        var cut="";
        if(data[i]["M"+(i+1)+"_Status"]){
            status="done"
        }
        if((i+1) == 2){
            cut="";
        }else{
            cut=data[i]["M"+(i+1)]+" ";
        }
        var tdHTML=
        '<td>'+data[i]["M"+(i+1)+"_Name"]+'</td>\
        <td class='+status+'>'+cut+data[i]["M"+(i+1)+"_Unit"]+'</td>\
        ';
        var trHTML="<tr>"+tdHTML+"</tr>";
        tbodyHTML+=trHTML
    }
    var taskPersonHTML=
    '<div class="popup-title taskPerson-title"><span>活動個人任務完成紀錄</span></div>\
        <table class="task-person__table">\
            <thead class="task-person__thead">\
                <tr>\
                    <th>任務名稱</th>\
                    <th>完成狀況</th>\
                </tr>\
            </thead>\
            <tbody class="task-person__tbody">'+tbodyHTML+'</tbody>\
        </table>\
    ';
    return taskPersonHTML;
}

// $.gbox.open(taskPersonRender(data),taskPersonObj);

// 千萬轉蛋 - 活動世界任務
var taskWorldObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
        addScrollbar()
	},
    afterClose:function(){
        $.gbox.close();
    }
}

function taskWorldRender(data){
    var tbodyHTML="";
    for(var i=0;i<data.length;i++){
        var status="";
        var trHTML;
        var tdHTML;
        if(data[i]["W"+(i+1)+"_Status"]){
            status="done"
        }
        if(data[i]["W"+(i+1)+"_Name"]){
            tdHTML=
            '<td>'+data[i]["W"+(i+1)+"_Name"]+'</td>\
            <td class='+status+'>'+data[i]["W"+(i+1)]+''+data[i]["W"+(i+1)+"_Unit"]+'</td>\
            ';
            trHTML="<tr>"+tdHTML+"</tr>";
            tbodyHTML+=trHTML
        }
    }
    var taskWorldHTML=
    '<div class="popup-title taskWorld-title"><span>活動世界任務完成紀錄</span></div>\
        <table class="task-world__table">\
            <thead class="task-world__thead">\
                <tr>\
                    <th>任務名稱</th>\
                    <th>完成狀況</th>\
                </tr>\
            </thead>\
            <tbody class="task-world__tbody">'+tbodyHTML+'</tbody>\
        </table>\
    ';
    return taskWorldHTML;
}
// $.gbox.open(taskWorldRender(data),taskWorldObj);

// 千萬轉蛋 - 獲獎訊息
var gashaponGetObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
        addScrollbar()
	},
    afterClose:function(){
        $.gbox.close();
    }
}

function gashaponGetRender(item){
    var reward1="";
    var reward2="";

    if(item[0]){
        reward1=
            '<p>恭喜你在千萬轉蛋獲得了</p>\
            <p>'+item[0].ItemName+'</p>\
        ';
    }
    if(item[1]){
        reward2=
            '<p>以及達成「'+item[1].ItemType+'」的特殊條件獲得了</p>\
            <p>'+item[1].ItemName+'</p>\
        ';
    }
    var gashaponGetHTML=
        '<div class="popup-slogan"></div>\
        <div class="gashapon-get__text">'+reward1+reward2+'</div>\
    ';

    return gashaponGetHTML;
}

// $.gbox.open(gashaponGetRender("XXXXXXX"),gashaponGetObj);

// 千萬轉蛋 - 名人堂支持度
var gloryBetStatusObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
        addScrollbar()
    },
    afterClose:function(){
        $.gbox.close();
    }
}

// 修改20201127
function gloryBetStatusRender(data){
    var GetSupportListNew=[];
    var GetSupportArr=[];
    var GetSupportKeys;
    var GetSupportArrGroup=[];
    for(var i=0;i<data.length;i++){
        var obj=data[i];
        obj.num=StringToNum(data[i].Week)
        GetSupportListNew.push(obj)
    }
    var GetSupportListSort=GetSupportListNew.sort(function(a,b){
        if(a.num < b.num){
            return -1;
        }
    })
    var GetSupportGroup=GetSupportListSort.reduce(function(acc,val,i){
        acc[val.Week]=(acc[val.Week] || []).concat(GetSupportListSort[i])
        return acc;
    },{});
    GetSupportKeys=Object.keys(GetSupportGroup);
    for(var i=0;i<GetSupportKeys.length;i++){
        GetSupportArr.push(GetSupportGroup[GetSupportKeys[i]])
    }
    for(var i=0;i<GetSupportArr.length;i+=2){
        GetSupportArrGroup.push(GetSupportArr.slice(i,i+2))
    }
    var table1HTML="";
    for(var i=0;i<GetSupportArrGroup.length;i++){
        var thead1HTML=
            '<thead class="glory-thead">\
                <tr>\
                    <th>週期</th><th>'+GetSupportArrGroup[i][0][0].Week+'週</th><th>'+GetSupportArrGroup[i][1][0].Week+'週</th>\
                </tr>\
            </thead>\
        ';
        var trHTML="";
        for(var j=0;j<GetSupportArrGroup[i].length;j++){
            var win1="";
            var user1="";
            var winBet="";
            var win2="";
            var user2="";
            if(GetSupportArrGroup[i][0][0].Flag == 1){
                winBet="bet1"
            }
            if(GetSupportArrGroup[i][1][0].Flag == 1){
                winBet="bet2"
            }
            for(var k=0;k<GetSupportArrGroup[i][0].length;k++){
                if(GetSupportArrGroup[i][0][k].WinCharacteristic != null){
                    win1+=GetSupportArrGroup[i][0][k].WinCharacteristic+"<br/>";
                }
                if(GetSupportArrGroup[i][0][k].Characteristic != null){
                    user1+=GetSupportArrGroup[i][0][k].Characteristic
                }
            }
            for(var k=0;k<GetSupportArrGroup[i][1].length;k++){
                if(GetSupportArrGroup[i][1][k].WinCharacteristic != null){
                    win2+=GetSupportArrGroup[i][1][k].WinCharacteristic+"<br/>";
                }
                if(GetSupportArrGroup[i][1][k].Characteristic != null){
                    user2=GetSupportArrGroup[i][1][k].Characteristic;
                }
            }
            trHTML=
                '<tr>\
                    <td>每週第一名</td>\
                    <td>'+win1+'</td>\
                    <td>'+win2+'</td>\
                </tr>\
                <tr>\
                    <td>個人支持</td>\
                    <td>'+user1+'</td>\
                    <td>'+user2+'</td>\
                </tr>\
            ';
        }
        var tbody1HTML='<tbody class="glory-tbody">'+trHTML+'</tbody>'
        var table1='<table class="glory-table '+winBet+'">'+thead1HTML+tbody1HTML+'</table>';
        table1HTML+=table1;
    }
    var table2HTML="";
    for(var i=0;i<GetSupportArr.length;i++){
        var thead2HTML=
        '<thead class="glory-thead-m">\
            <tr>\
                <th>週期</th><th>'+GetSupportArr[i][0].Week+'週</th>\
            </tr>\
        </thead>\
        ';
        var trHTML="";
        var win1="";
        var user1="";
        var winBet="";
        if(GetSupportArr[i][0].Flag == 1){
            winBet="bet"
        }
        for(var j=0;j<GetSupportArr[i].length;j++){
            if(GetSupportArr[i][j].WinCharacteristic != null){
                win1+=GetSupportArr[i][j].WinCharacteristic+"<br/>";
            }
            if(GetSupportArr[i][0].Characteristic != null){
                user1=GetSupportArr[i][0].Characteristic;
            }
        }
        trHTML=
            '<tr>\
                <td>每週第一名</td>\
                <td>'+win1+'</td>\
            </tr>\
            <tr>\
                <td>個人支持</td>\
                <td>'+user1+'</td>\
            </tr>\
        ';
        // console.log(trHTML)
        var tbody2HTML='<tbody class="glory-tbody-m">'+trHTML+'</tbody>'
        var table2='<table class="glory-table-m '+winBet+'">'+thead2HTML+tbody2HTML+'</table>';
        table2HTML+=table2;
    }
    var gloryBetStatusHTML=
    '<div class="popup-title gloryBetStatus-title"><span>名人堂支持度</span></div>\
    <div class="glory-wrap">\
        <div class="glory-title">名人堂支持狀況</div>\
        '+table1HTML+table2HTML+'\
    </div>';
    return gloryBetStatusHTML;
}
// $.gbox.open(gloryBetStatusRender(data),gloryBetStatusObj);

// 千萬轉蛋 - 抽獎獎勵查詢領取a
var rewardSearchAObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
        addScrollbar()
    },
    afterClose:function(){
        $.gbox.close();
    },
    actionBtns: [{
        text: '下一步',
        click:function(){
            var setRewardObj={};
            setRewardObj["Reward"]="";
            setRewardObj["Info"]={};
            var item=[];
            var itemLogId=[];
            $(".reward-search-a__checkbox").each(function(i,v){
                if($(this).prop("checked")){
                    var itemObj={};
                    itemObj["Logid"]=parseInt($(this).closest(".reward-search-a__tr").attr("data-logid"));
                    itemObj["Type"]=$(this).closest(".reward-search-a__tr").attr("data-type");
                    item.push(itemObj)
                    itemLogId.push(parseInt($(this).closest(".reward-search-a__tr").attr("data-logid")))
                }
            })
            $(".reward-search-a__error").remove()
            var ErrMsg = '';
            if (itemLogId.length == 0) {
                ErrMsg += "<div class='reward-search-a__error'>請勾選要領取的獎勵</div>";
            }
            if ($("#CharacterName").val() === '') {
                ErrMsg += "<div class='reward-search-a__error'>請填寫角色名稱</div>";
            }
            if (ErrMsg !== '') {
                $(".gbox-content").append(ErrMsg)
                return;
            }
            setRewardObj["Reward"]=item;
            setRewardObj["ItemLogId"]=itemLogId;
            setRewardObj["Info"].GameServer=$("#select-server").val();
            setRewardObj["Info"].GameServerName=$("#select-server option:selected").html()
            setRewardObj["Info"].CharacterName=$("#CharacterName").val();
            

            $.gbox.open(rewardSearchBRender(setRewardObj),{
                addClass:"default",
                hasCloseBtn: true,
                hasActionBtn: true,
                afterOpen:function(){
                    $(".gbox").prepend("<div class='layer-frame'></div>");
                    if(!isMobile.any){
                        setTimeout(function(){
                            $(".gbox-wrap").mCustomScrollbar({
                                theme:"light"
                            });
                        }, 0);
                    }
                },
                afterClose:function(){
                    $.gbox.close();
                },actionBtns: [{
                    text: '取消',
                    click:function(){
                        $.gbox.close();
                    }
                },{
                    text: '發送獎勵',
                    click:function(){
                        AddItemToGameLog(setRewardObj["Info"], item);
                    }
                }]
            });
        }
    }]
}

function rewardSearchARender(data,server){
    var tbodyHTML="";
    var already="";
    var input="";
    var optionHTML="";
    for(var i=0;i<server.length;i++){
        optionHTML+="<option value="+server[i].ServerId+">"+server[i].ServerName+"</otpion>"
    }
    for(var i=0;i<data.length;i++){
        var GameServer="";
        var CharacterName="";
        if(data[i].Flag != "未領取"){
            already="disabled";
            input='<input type="checkbox" name="rewardget" class="reward-search-a__checkbox" value="'+data[i].LogId+'" '+already+' />';
        }else{
            input='<input type="checkbox" name="rewardget" class="reward-search-a__checkbox" value="'+data[i].LogId+'" />';
        }
        if(data[i].GameServer != null){
            GameServer=data[i].GameServer;
        }
        if(data[i].CharacterName != null){
            CharacterName=data[i].CharacterName;
        }
        var td=
        '<td class="reward-search-a__checkbox-td">\
            <label class="reward-search-a__checkbox-label">\
                '+input+'\
                <span class="reward-search-a__checkbox-style"></span>\
            </label>\
            <div class="reward-search-a__box">\
                <div class="reward-search-a__box-1">\
                    <div class="reward-search-a__box-date">\
                        <span class="reward-search-a__box-th">獲得日期</span>\
                        <span class="reward-search-a__box-data">'+data[i].CreateTime+'</span>\
                    </div>\
                    <div class="reward-search-a__box-reward">\
                        <span class="reward-search-a__box-th">獎項名稱</span>\
                        <span class="reward-search-a__box-data">'+data[i].ItemName+'</span>\
                    </div>\
                </div>\
                <div class="reward-search-a__box-2">\
                    <div class="reward-search-a__box-server">\
                        <span class="reward-search-a__box-th">領取的伺服器</span>\
                        <span class="reward-search-a__box-data">'+GameServer+'</span>\
                    </div>\
                    <div class="reward-search-a__box-name">\
                        <span class="reward-search-a__box-th">領取的角色名稱</span>\
                        <span class="reward-search-a__box-data">'+CharacterName+'</span>\
                    </div>\
                    <div class="reward-search-a__box-status">\
                        <span class="reward-search-a__box-th">狀態</span>\
                        <span class="reward-search-a__box-data">'+data[i].Flag+'</span>\
                    </div>\
                </div>\
            </div>\
        </td>\
        <td class="reward-search-a__td">\
            <span>'+data[i].CreateTime+'</span>\
        </td>\
        <td class="reward-search-a__td">\
            <span>'+data[i].ItemName+'</span>\
        </td>\
        <td class="reward-search-a__td">\
            <span>'+GameServer+'</span>\
        </td>\
        <td class="reward-search-a__td">\
            <span>'+CharacterName+'</span>\
        </td>\
        <td class="reward-search-a__td reward-search-a__status">\
            <span>'+data[i].Flag+'</span>\
        </td>\
        ';

        var tr="<tr class='reward-search-a__tr' data-LogId="+data[i].LogId+" data-Type="+data[i].Type+">"+td+"</tr>";
        tbodyHTML+=tr;
    }
    var rewardSearchAHTML=
    '<div class="popup-title rewardSearch-title"><span>抽獎獎勵查詢領取</span></div>\
        <div class="reward-search-a__text">請選擇要發送的道具</div>\
        <table class="reward-search-a__table">\
            <thead class="reward-search-a__thead">\
                <tr>\
                    <th></th>\
                    <th>獲得日期</th>\
                    <th>獎項名稱</th>\
                    <th>領取的伺服器</th>\
                    <th>領取的角色名稱</th>\
                    <th>狀態</th>\
                </tr>\
            </thead>\
            <tbody class="reward-search-a__tbody">'+tbodyHTML+'</tbody>\
        </table>\
        <div class="reward-search-a__text">請選擇要發送道具的角色以及伺服器</div>\
        <table class="reward-search-a__server-table">\
            <thead class="reward-search-a__server-thead">\
                <tr>\
                    <th>伺服器</th>\
                    <th>角色名稱</th>\
                </tr>\
            </thead>\
            <tbody class="reward-search-a__server-tbody">\
                <tr>\
                    <td>\
                        <div class="reward-search-a__select-ui">\
                            <select name="" id="select-server">'+optionHTML+'</select>\
                        </div>\
                    </td>\
                    <td><input type="text" class="reward-search-a__username" id="CharacterName" /></td>\
                </tr>\
            </tbody>\
        </table>\
    ';
    return rewardSearchAHTML;
}


// $.gbox.open(rewardSearchARender(data,server),rewardSearchAObj);

// 千萬轉蛋 - 抽獎獎勵查詢領取b

function rewardSearchBRender(data){
    if(!Log){
        var rewardSearchBHTML="目前沒有獎勵";
        return rewardSearchBHTML
    }
    var itemData=Log.filter(function(v){
        return data["ItemLogId"].indexOf(v.LogId) > -1
    })
    var tbodyHTML="";
    for(var i=0;i<itemData.length;i++){
        var tr='<tr>\
            <td>'+itemData[i].CreateTime+'</td>\
            <td>'+itemData[i].ItemName+'</td>\
        </tr>';
        tbodyHTML+=tr
    }
    var rewardSearchBHTML=
    '<div class="popup-title rewardSearch-title"><span>抽獎獎勵查詢領取</span></div>\
        <div class="reward-search-b__text">請選擇要發送的道具</div>\
        <table class="reward-search-b__table1">\
            <thead class="reward-search-b__thead1">\
                <tr>\
                    <th>獲得日期</th>\
                    <th>獎項名稱</th>\
                </tr>\
            </thead>\
            <tbody class="reward-search-b__tbody1">'+tbodyHTML+'</tbody>\
        </table>\
        <div class="reward-search-b__text">請選擇要發送道具的角色以及伺服器</div>\
        <table class="reward-search-b__table2">\
            <thead class="reward-search-b__thead2">\
                <tr>\
                    <th>伺服器</th>\
                    <th>角色名稱</th>\
                </tr>\
            </thead>\
            <tbody class="reward-search-b__tbody2">\
                <tr>\
                    <td>'+data["Info"].GameServerName+'</td>\
                    <td>'+data["Info"].CharacterName+'</td>\
                </tr>\
            </tbody>\
        </table>\
    ';
    return rewardSearchBHTML;
}

// $.gbox.open(rewardSearchBRender(data),rewardSearchBObj);

// 千萬轉蛋 - 獎勵清單查詢
var rewardListObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        if(!isMobile.any){
            $(".gbox-wrap").mCustomScrollbar({
                theme:"light"
            });
        }
    },
    afterClose:function(){
        $.gbox.close();
    }
}

function rewardListRender(data){
    var itemGroup={};
    var itemArr=[];
    var itemArrGroup=[];

    data.forEach(function(item){
        itemGroup[item.ItemType]=itemGroup[item.ItemType] || [];
        itemGroup[item.ItemType].push(item)
    })

    var itemKeys=Object.keys(itemGroup);

    for(var i=0;i<itemKeys.length;i++){
        itemArr.push(itemGroup[itemKeys[i]])
    }

    for(var i=0;i<itemArr.length;i+=2){
        itemArrGroup.push(itemArr.slice(i,i+2))
    }
    for(var i=0;i<itemArrGroup.length;i++){
        if(itemArrGroup[i][0]>itemArrGroup[i][1]){
            var length=itemArrGroup[i][0].length-itemArrGroup[i][1].length;
            for(var j=0;j<length;j++){
                itemArrGroup[i][1].push({ItemType:"",ItemName:"",ItemCnt:""})
            }
        }else{
            var length=itemArrGroup[i][1].length-itemArrGroup[i][0].length;
            for(var j=0;j<length;j++){
                itemArrGroup[i][0].push({ItemType:"",ItemName:"",ItemCnt:""})
            }
        }
    }
    var table1HTML="";
    for(var i=0;i<itemArrGroup.length;i++){
        if(itemArrGroup[i][1][0].ItemType == "特殊獎項"){
            var thead1HTML=
                '<thead class="reward-list__thead">\
                    <tr>\
                        <th>'+itemArrGroup[i][0][0].ItemType+'賞</th><th>獎勵數量</th><th>'+itemArrGroup[i][1][0].ItemType+'賞</th><th>條件</th><th>獎勵數量</th>\
                    </tr>\
                </thead>\
            ';
        }else{
            var thead1HTML=
                '<thead class="reward-list__thead">\
                    <tr>\
                        <th>'+itemArrGroup[i][0][0].ItemType+'賞</th><th>獎勵數量</th><th>'+itemArrGroup[i][1][0].ItemType+'賞</th><th>獎勵數量</th>\
                    </tr>\
                </thead>\
            ';
        }
        var trHTML="";
        var tdArr=[];
        for(var j=0;j<itemArrGroup[i].length;j++){
            for(var k=0;k<itemArrGroup[i][j].length;k++){
                
                if(tdArr[k]){
                    tdArr[k].push(itemArrGroup[i][j][k])
                }else{
                    tdArr[k]=[];
                    tdArr[k].push(itemArrGroup[i][j][k])
                }
            }
        }
        for(var j=0;j<tdArr.length;j++){
            var tr="";
            var td="";
            for(var k=0;k<tdArr[j].length;k++){
                if(tdArr[j][k].ItemCon){
                    td+='<td>'+tdArr[j][k].ItemName+'</td><td>'+tdArr[j][k].ItemCon+'</td><td>'+tdArr[j][k].ItemCnt+'</td>';
                }else{
                    td+='<td>'+tdArr[j][k].ItemName+'</td><td>'+tdArr[j][k].ItemCnt+'</td>';
                }
            }
            tr='<tr>'+td+'</tr>';
            trHTML+=tr;
        }
        var tbody1HTML='<tbody class="reward-list__tbody">'+trHTML+'</tbody>'
        var table1='<table class="reward-list__table">'+thead1HTML+tbody1HTML+'</table>';
        table1HTML+=table1;
    }

    var mobileGroupHTML="";
    for(var i=0;i<itemArr.length;i++){
        var rolHTML="";
        var ItemType=itemArr[i][0].ItemType;
        if(ItemType == "特殊獎項"){
            rolHTML+='<div class="reward-list__row"><div class="reward-list__col reward-list__col--name">'+ItemType+'賞</div><div class="reward-list__col">條件</div><div class="reward-list__col reward-list__col--num">獎勵數量</div></div>';
        }else{
            rolHTML+='<div class="reward-list__row"><div class="reward-list__col">'+ItemType+'賞</div><div class="reward-list__col reward-list__col--num">獎勵數量</div></div>';
        }
        for(var j=0;j<itemArr[i].length;j++){
            if(itemArr[i][j].ItemType != ""){
                if(ItemType == "特殊獎項"){
                    rolHTML+=
                        '<div class="reward-list__row">\
                            <div class="reward-list__col reward-list__col--name">'+itemArr[i][j].ItemName+'</div>\
                            <div class="reward-list__col">'+itemArr[i][j].ItemCon+'</div>\
                            <div class="reward-list__col reward-list__col--num">'+itemArr[i][j].ItemCnt+'</div>\
                        </div>\
                    ';
                }else{
                    rolHTML+=
                        '<div class="reward-list__row">\
                            <div class="reward-list__col">'+itemArr[i][j].ItemName+'</div>\
                            <div class="reward-list__col reward-list__col--num">'+itemArr[i][j].ItemCnt+'</div>\
                        </div>\
                    ';
                }
            }
        }
        var mobileHTML='<div class="reward-list__box">'+rolHTML+'</div>';
        mobileGroupHTML+=mobileHTML;
    }

    var rewardListHTML=
    '<div class="popup-title rewardList-title"><span>獎勵清單查詢</span></div>\
    '+table1HTML+mobileGroupHTML+'\
    ';

    return rewardListHTML;
}

// $.gbox.open(rewardListRender(rewardListJSON),rewardListObj);

// 千萬轉蛋活動說明
var gashaponNoticeObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        addScrollbar()
    },
    afterClose:function(){
        $.gbox.close();
    }
}

var gashaponNoticeHTML=
    '<div class="popup-title gashaponNotice-title"><span>千萬轉蛋活動說明</span></div>\
    <ul class="glory-notice__ul">\
        <li>透過三大活動參與獲得鑰匙：個人活動任務、團體活動任務、名人堂。</li>\
        <li>玩家可消耗五個鑰匙進行一次抽獎\
            <ul class="glory-notice__inner">\
                <li>領獎流程：玩家獲得獎勵後會進入網頁上的獎勵查詢頁面，玩家可以勾選獎勵並選擇領取的伺服器＆角色進行領取。</li>\
                <li>玩家可於網頁上查詢當前個人剩餘次數，亦可進行抽獎獎勵查詢。</li>\
            </ul>\
        </li>\
        <li>千萬轉蛋玩法(5支鑰匙抽獎1次)\
            <ul class="glory-notice__inner">\
                <li>獎池、首抽獎勵、指定次數獎勵、最後一抽獎勵。</li>\
                <li>獎池（S賞、A賞、B賞、C賞、D賞）、首抽獎勵、指定次數獎勵、最後一抽獎勵如千萬轉蛋獎勵清單。</li>\
            </ul>\
        </li>\
    </ul>\
';

// $.gbox.open(gashaponNoticeHTML,gashaponNoticeObj);

// 名人堂活動說明
var gloryNoticeObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        addScrollbar()
    },
    afterClose:function(){
        $.gbox.close();
    }
}

var gloryNoticeHTML=
    '<div class="popup-title gloryNotice-title"><span>名人堂活動說明</span></div>\
    <ul class="glory-notice__ul">\
        <li>名人堂將列出各種有代表性的玩家，並註明詳細事蹟</li>\
        <li>膜拜(點讚)與被膜拜(被點讚)都將獲得對應的鑰匙(抽獎機會)\
            <ul class="glory-notice__inner">\
                <li>玩家一點可以膜拜(點讚)五次，一次獲得一個鑰匙，一天最多五個鑰匙，一個人當日最多被膜拜一次。</li>\
                <li>玩家被膜拜十次，可以獲得一個鑰匙，每日最多被膜拜100次(10支鑰匙)</li>\
            </ul>\
        </li>\
        <li>榮登名人榜上的玩家，一樣享有膜拜他人的權利（無法膜拜自己）</li>\
        <li>Lv.60 & 手機認證玩家，才可以進行膜拜。</li>\
        <li>可花費一次千萬轉蛋抽獎費用進行下注，若當週下注的名人堂玩家為排行榜第一名，即可再獲得一次抽獎機會。</li>\
    </ul>\
';

// $.gbox.open(gloryNoticeHTML,gloryNoticeObj);

// 名人堂支持
var gloryBetObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: true,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        addScrollbar()
    },
    afterClose:function(){
        $.gbox.close();
    },actionBtns: [{
        text: '取消',
        click:function(){
			$.gbox.close();
        }
    },{
        text: '確定',
        click:function(){
            var seq=$(".glory-bet__checkbox:checked").val();
			Support(seq,checkH5())
        }
    }]
}

function gloryBetRender(data){
    var tbodyHTML="";
    for(var i=0;i<data.length;i++){
        var tr=
        '<tr>\
            <td class="glory-bet__checkbox-td">\
                <label class="glory-bet__checkbox-label">\
                    <input class="glory-bet__checkbox" type="radio" name="glorybet" value="'+data[i].Seq+'" />\
                    <span class="glory-bet__checkbox-style"></span>\
                </label>\
            </td>\
            <td>'+data[i].Characteristic+'</td>\
        </tr>\
        ';
        tbodyHTML+=tr;
    }
    var gloryBetHTML=
    '<div class="popup-title gloryBet-title"><span>名人堂支持</span></div>\
        <table class="glory-bet__table">\
            <thead class="glory-bet__thead">\
                <tr>\
                    <th>支持按鈕</th>\
                    <th>名人堂名單</th>\
                </tr>\
            </thead>\
            <tbody class="glory-bet__tbody">'+tbodyHTML+'</tbody>\
        </table>\
    ';
    return gloryBetHTML;
}

// $.gbox.open(gloryBetRender(data),gloryBetObj);

// 名人堂點讚說明

var gloryLikeNoticeHTML=
    '<div class="popup-title gloryLikeNotice-title"><span>名人堂點讚說明</span></div>\
    <ul class="glory-notice__ul">\
        <li>名人堂將列出10位有特殊代表性的玩家，並註明詳細事蹟。</li>\
        <li>名人堂點讚將獲得對應的鑰匙(抽獎機會)\
            <ul class="glory-notice__inner">\
                <li>玩家一天可以點讚一次，一次獲得五個鑰匙(1次抽獎機會)。</li>\
            </ul>\
        </li>\
        <li>榮登名人榜上的玩家，一樣享有膜拜他人的權利。</li>\
    </ul>\
';
// $.gbox.open(gloryLikeNoticeHTML,gloryNoticeObj);
// 名人堂支持說明
var gloryYYNoticeHTML=
    '<div class="popup-title gloryYYNotice-title"><span>名人堂支持說明</span></div>\
    <ul class="glory-notice__ul">\
        <li>玩家每週可以進行一次支持，競猜當週獲得最多點讚次數的玩家為何。(每週三凌晨00:00~23:59可進行支持)。</li>\
        <li>玩家競猜正確，將可額外獲得15支鑰匙(3次抽獎機會)，若競猜失敗，則無獲得任何獎勵。</li>\
        <li>支持後，無法更變支持者。</li>\
    </ul>\
';

// $.gbox.open(gloryYYNoticeHTML,gloryNoticeObj);
// 名人堂分享說明
var gloryShareNoticeHTML=
    '<div class="popup-title gloryShareNotice-title"><span>名人堂分享說明</span></div>\
    <ul class="glory-notice__ul">\
        <li>玩家每日可以分享一次名人堂的網頁到社群網站上(Facebook , Line, Beanfun!)。</li>\
        <li>玩家分享一次，集氣條會增加一點。</li>\
        <li>活動時間內，一個帳號最多計算一次分享次數。</li>\
        <li>所有玩家共用一個集氣條，達成對應的集氣階段，將發放獎勵給全伺服器等級達50(含)以上的玩家。</li>\
    </ul>\
';

// $.gbox.open(gloryShareNoticeHTML,gloryNoticeObj);

// 名人堂排名
var gloryRankObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>");
        addScrollbar()
    },
    afterClose:function(){
        $.gbox.close();
    }
}
function gloryRankRender(data){
    var liHTML="";
    var ulHTML="";
    if(data.length){
        for(var i=0;i<data.length;i++){
            var li='<li>'+data[i].Characteristic+'</li>';
            liHTML+=li;
        }
        ulHTML='<ul class="glory-rank__list">'+liHTML+'</ul>';
    }else{
        ulHTML='<div class="glory-rank__coming">排名將於12/23公布</div>';
    }
    
    var gloryRankHTML=
    '<div class="popup-title gloryRank-title"><span>名人堂排名</span></div>'+ulHTML;
    return gloryRankHTML;
}

// $.gbox.open(gloryRankRender(data),gloryRankObj);

// 名人堂點讚
var gloryRankLikeObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
        addScrollbar()
	},
    afterClose:function(){
        $.gbox.close();
    }
}
var gloryRankLike=
    '<div class="popup-slogan"></div>\
    <div class="glory-rankLike__text">\
        <div>恭喜你成功點讚並且獲得<span>10把鑰匙，</div>\
        <div>每週三 00:00~23:59 可支持名人堂玩家，以及每日集氣分享</div>\
        <div>還沒支持跟分享的記得去唷！</div>\
    </div>\
';

// $.gbox.open(gloryRankLike,gloryRankLikeObj);