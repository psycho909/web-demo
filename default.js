var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: true,
	afterOpen:function(){
		$(".gbox").prepend("<div class='layer-frame'></div>")
	},
    afterClose:function(){
        $.gbox.close();
    },
    actionBtns: [{
        text: '下一步',
        id:'shot',
        addClass:"btn",
        click:function(){
			$.gbox.close();
        }
    },{
        text: '下一步',
        id:'shot',
        class:"btn",
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
            <div class="part1__list-text">近距離命中+5</div>\
            <div class="part1__list-text">遠距離命中+5</div>\
            <div class="part1__list-text">魔法命中+5</div>\
            <div class="part1__list-text">體力恢復量+5</div>\
            <div class="part1__list-text">魔力恢復量+5</div>\
            <div class="part1__list-text">HP藥水恢復量增加+8%+10</div>\
            <div class="part1__list-text">體力上限+120</div>\
            <div class="part1__list-text">魔力上限+100</div>\
        </div>\
    </div>\
';

// $.gbox.open(defaultHTML,defaultObj);

// 千萬轉蛋 - 活動個人任務
var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
	},
    afterClose:function(){
        $.gbox.close();
    }
}

var taskPersonHTML=
    '<div class="popup-title"><span>活動個人任務完成紀錄</span></div>\
    <table class="task-person__table">\
        <thead class="task-person__thead">\
            <tr>\
                <th>任務名稱</th>\
                <th>完成狀況</th>\
            </tr>\
        </thead>\
        <tbody class="task-person__tbody">\
            <tr>\
                <td>每日於(伊娃王國地監、古魯丁地監、修練地監、龍之古地監)合計擊殺1,000隻怪物</td>\
                <td>900隻</td>\
            </tr>\
            <tr>\
                <td>完成每日任務</td>\
                <td class="done">完成</td>\
            </tr>\
        </tbody>\
    </table>\
';
// $.gbox.open(taskPersonHTML,defaultObj);

// 千萬轉蛋 - 活動世界任務
var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
	},
    afterClose:function(){
        $.gbox.close();
    }
}

var taskPersonHTML=
    '<div class="popup-title"><span>活動世界任務完成紀錄</span></div>\
    <table class="task-world__table">\
        <thead class="task-world__thead">\
            <tr>\
                <th>任務名稱</th>\
                <th>完成狀況</th>\
            </tr>\
        </thead>\
        <tbody class="task-world__tbody">\
            <tr>\
                <td>每日於(伊娃王國地監、古魯丁地監、修練地監、龍之古地監)合計擊殺1,000隻怪物</td>\
                <td>900隻</td>\
            </tr>\
            <tr>\
                <td>完成每日任務</td>\
                <td class="done">完成</td>\
            </tr>\
        </tbody>\
    </table>\
';
// $.gbox.open(taskPersonHTML,defaultObj);

// 千萬轉蛋 - 獲取訊息
var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
	hasActionBtn: false,
	afterOpen:function(){
		$(".gbox").prepend("<div class='layer-frame'></div>")
	},
    afterClose:function(){
        $.gbox.close();
    }
}

function gashaponGetRender(item){
    var gashaponGetHTML=
        '<div class="popup-slogan"></div>\
        <div class="gashapon-get__text">\
            <p>恭喜你在一番賞獲得了</p>\
            <p>'+item+'</p>\
        </div>\
    ';

    return gashaponGetHTML;
}

// $.gbox.open(gashaponGetRender("XXXXXXX"),defaultObj);

// 千萬轉蛋 - 獎勵清單查詢
var rewardListJSON=[
    {type:"S",name:"傳說製作秘笈(刻印)X1",num:1},
    {type:"S",name:"英雄製作秘笈(刻印)X2",num:1},
    {type:"S",name:"祝福聖水(特大)X1",num:1},
    {type:"S",name:"[神秘變身卡]英雄X1", num:1},
    {type:"S",name:"[神秘魔法娃娃卡]英雄X1",num:1},
    {type:"A",name:"英雄製作秘笈(刻印)X1",num:50},
    {type:"A",name:"祝福聖水(大)X1",num:50},
    {type:"A",name:"守護石X1",num:50},
    {type:"A",name:"受祝福的 對武器施法的卷軸X1",num:50},
    {type:"A",name:"受祝福的 對盔甲施法的卷軸X1",num:50},
    {type:"A",name:"[神秘變身卡]稀有X1", num:50},
    {type:"A", name:"[神秘魔法娃娃卡]稀有X1",num:50},
    {type:"B",name:"稀有製作秘笈(刻印)X1",num:3000},
    {type:"B",name:"祝福賦予卷軸X1",num:3000},
    {type:"B",name:"潘朵拉的蒐藏品碎片X1",num:3000},
    {type:"B",name:"龍之聖水X1",num:3000},
    {type:"B",name:"名譽金幣箱X1",num:3000},
    {type:"B",name:"魔法娃娃製作硬幣箱X1",num:3000},
    {type:"B",name:"變身製作硬幣箱X1",num:3000},
    {type:"B",name:"光之肩甲交換證書X",num:3000},
    {type:"B",name:"光之皮夾克交換證書X1",num:3000},
    {type:"B",name:"光之手環交換證書X1",num:3000},
    {type:"B",name:"名譽金幣X5,000",num:3000},
    {type:"C",name:"強化戰鬥卷軸(活動)X2",num:20000},
    {type:"C",name:"祝福聖水(小)X1",num:20000},
    {type:"C",name:"史奈普戒指交換證書X1",num:20000},
    {type:"C",name:"倫提斯耳環交換證書X1",num:20000},
    {type:"C",name:"殷海薩的祝福X50",num:50000},
    {type:"C",name:"龍之珍珠(活動)X2",num:50000},
    {type:"C",name:"名譽金幣X50",num:50000},
    {type:"C",name:"變身製作硬幣X50",num:100000},
    {type:"C",name:"魔法娃娃製作硬幣X50",num:100000},
    {type:"D",name:"殷海薩的祝福X20",num:1000000},
    {type:"D",name:"龍之珍珠(活動)X1",num:1000000},
    {type:"D",name:"金幣X50,000",num:2000000},
    {type:"D",name:"名譽金幣X20",num:2000000},
    {type:"D",name:"變身製作硬幣X20",num:4800000},
    {type:"D",name:"魔法娃娃製作硬幣X20",num:4800000},
    {type:"特殊獎項",name:"稀有製作秘笈(刻印)",con:"首抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第1000抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第10000抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第50000抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第100000抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第200000抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第500000抽",num:1},
    {type:"特殊獎項",name:"名譽金幣箱",con:"第1000000抽",num:1},
    {type:"特殊獎項",name:"英雄製作秘笈",con:"最後一抽",num:1},
]
var defaultObj={
    addClass:"default",
    hasCloseBtn: true,
    hasActionBtn: false,
    afterOpen:function(){
        $(".gbox").prepend("<div class='layer-frame'></div>")
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
        itemGroup[item.type]=itemGroup[item.type] || [];
        itemGroup[item.type].push(item)
    })

    var itemKeys=Object.keys(itemGroup);

    for(var i=0;i<itemKeys.length;i++){
        itemArr.push(itemGroup[itemKeys[i]])
    }

    for(var i=0;i<itemArr.length;i+=2){
        itemArrGroup.push(itemArr.slice(i,i+2))
    }
    console.log(itemArr)

    var mobileGroupHTML="";
    for(var i=0;i<itemArr.length;i++){
        var rolHTML="";
        var type=itemArr[i][0].type;
        if(type == "特殊獎項"){
            rolHTML+='<div class="reward-list__row"><div class="reward-list__col reward-list__col--name">'+type+'賞</div><div class="reward-list__col">條件</div><div class="reward-list__col reward-list__col--num">獎勵數量</div></div>';
        }else{
            rolHTML+='<div class="reward-list__row"><div class="reward-list__col">'+type+'賞</div><div class="reward-list__col reward-list__col--num">獎勵數量</div></div>';
        }
        for(var j=0;j<itemArr[i].length;j++){
            if(type == "特殊獎項"){
                rolHTML+=
                    '<div class="reward-list__row">\
                        <div class="reward-list__col reward-list__col--name">'+itemArr[i][j].name+'</div>\
                        <div class="reward-list__col">'+itemArr[i][j].con+'</div>\
                        <div class="reward-list__col reward-list__col--num">'+itemArr[i][j].num+'</div>\
                    </div>\
                ';
            }else{
                rolHTML+=
                    '<div class="reward-list__row">\
                        <div class="reward-list__col">'+itemArr[i][j].name+'</div>\
                        <div class="reward-list__col reward-list__col--num">'+itemArr[i][j].num+'</div>\
                    </div>\
                ';
            }
        }
        var mobileHTML='<div class="reward-list__box">'+rolHTML+'</div>';
        mobileGroupHTML+=mobileHTML;
    }

    var rewardListHTML=
    `<div class="popup-title"><span>獎勵清單查詢</span></div>\
        <table class="reward-list__table">\
            <thead class="reward-list__thead">\
                <tr>\
                    <th>S賞</th><th>獎勵數量</th><th>A賞</th><th>獎勵數量</th>\
                </tr>\
            </thead>\
            <tbody class="reward-list__tbody">\
                <tr>\
                    <td>傳說製作秘笈(刻印)X1</td><td>1</td>\
                    <td>英雄製作秘笈(刻印)X1</td><td>50</td>\
                </tr>\
                <tr>\
                    <td>英雄製作秘笈(刻印)X2</td><td>1</td>\
                    <td>祝福聖水(大)X1</td><td>50</td>\
                </tr>\
                <tr>\
                    <td>祝福聖水(特大)X1</td><td>1</td>\
                    <td>守護石X1</td><td>50</td>\
                </tr>\
                <tr>\
                    <td>[神秘變身卡]英雄X1</td><td>1</td>\
                    <td>受祝福的 對武器施法的卷軸X1</td><td>50</td>\
                </tr>\
                <tr>\
                    <td>[神秘魔法娃娃卡]英雄X1</td><td>1</td>\
                    <td>受祝福的 對盔甲施法的卷軸X1</td><td>50</td>\
                </tr>\
                <tr>\
                    <td></td><td></td>\
                    <td>[神秘變身卡]稀有X1</td><td>50</td>\
                </tr>\
                <tr>\
                    <td></td><td></td>\
                    <td>[神秘魔法娃娃卡]稀有X1</td><td>50</td>\
                </tr>\
            </tbody>\
        </table>\
        <table class="reward-list__table">\
            <thead class="reward-list__thead">\
                <tr>\
                    <th>B賞</th><th>獎勵數量</th><th>C賞</th><th>獎勵數量</th>\
                </tr>\
            </thead>\
            <tbody class="reward-list__tbody">\
                <tr>\
                    <td>稀有製作秘笈(刻印)X1</td><td>3000</td>\
                    <td>強化戰鬥卷軸(活動)X2</td><td>20000</td>\
                </tr>\
                <tr>\
                    <td>稀有製作秘笈(刻印)X1</td><td>3000</td>\
                    <td>強化戰鬥卷軸(活動)X2</td><td>20000</td>\
                </tr>\
                <tr>\
                    <td>稀有製作秘笈(刻印)X1</td><td>3000</td>\
                    <td>強化戰鬥卷軸(活動)X2</td><td>20000</td>\
                </tr>\
                <tr>\
                    <td>稀有製作秘笈(刻印)X1</td><td>3000</td>\
                    <td>強化戰鬥卷軸(活動)X2</td><td>20000</td>\
                </tr>\
                <tr>\
                    <td>稀有製作秘笈(刻印)X1</td><td>3000</td>\
                    <td>強化戰鬥卷軸(活動)X2</td><td>20000</td>\
                </tr>\
                <tr>\
                    <td>稀有製作秘笈(刻印)X1</td><td>3000</td>\
                    <td>強化戰鬥卷軸(活動)X2</td><td>20000</td>\
                </tr>\
            </tbody>\
        </table>\
        <table class="reward-list__table2">\
            <thead class="reward-list__thead2">\
                <tr>\
                    <th>D賞</th><th>獎勵數量</th><th>特殊獎項</th><th>條件</th><th>獎勵數量</th>\
                </tr>\
            </thead>\
            <tbody class="reward-list__tbody2">\
                <tr>\
                    <td>殷海薩的祝福X20</td>\
                    <td>1000000</td>\
                    <td>稀有製作秘笈(刻印)</td>\
                    <td>首抽</td>\
                    <td>1</td>\
                </tr>\
            </tbody>\
        </table>
        ${mobileGroupHTML}
    `;

    return rewardListHTML;
}


$.gbox.open(rewardListRender(rewardListJSON),defaultObj);


var smoking = false;

//動態部分
function InitAnimate() {  
    $("#smokeBg").show()
    $(window).resize(function () {
        var imgW = 600;
        var imgH = 344;
        var ww = window.innerWidth;
        var vh = window.innerHeight;
        var s;
        if (ww / vh > imgW / imgH) {
            s = ww / imgW;
        } else {
            s = vh / imgH;
        }
        TweenMax.set($('#smokeBg'), {
            scale: s,
            x: '-50%',
            y: '-50%'
        });
    }).resize();

    $(".smoke_inner").animateSprite({
        fps: 20,
        loop: false,
        complete: function () {
            // use complete only when you set animations with 'loop: false'
            if ($('.smoke_inner').css('background-position') !== '0px 0px') {
                $('#smokeBg').css('display', 'none');
                smoking = false;
            }
        }
    });
}  


//----------煙霧特效
function smokeAniMotion() {
    $(".smoke_inner").css('background-position', '0 0');
    $('#smokeBg').css('display', 'block');
    smoking = true;
    $(".smoke_inner").animateSprite('restart');
}