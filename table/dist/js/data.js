var part1_table = [
    {
        radio: '',
        wish: '我想要更多金幣',
        get: ['立即獲得','10萬金幣'],
        gift: ['⌜活動期間累積賺取30萬金幣⌟', '再送90萬金幣']
    },
    {
        radio: '',
        wish: '我想要更好升級',
        get: ['立即獲得','龍之鑽石*10'],
        gift: ['⌜活動期間升級1次⌟', '再送龍之鑽石*70']
    },
    {
        radio: '',
        wish: '我想要變得更強',
        get: ['立即獲得','紅變體驗劵*1'],
        gift: ['⌜活動期間累積強化10次⌟', '再送贈送紫變體驗劵*1']
    },
    {
        radio: '',
        wish: '',
        get: ['立即獲得','高級變身抽卡*1'],
        gift: ['⌜活動期間累積使用過高級變身抽卡*3⌟', '再送高級變身抽卡*5']
    }
];
var part2_table = [
    {
        title: '入場方式',
        content: '副本→特殊副本'
    },
    {
        title: '入場限制',
        content: [
            {
                title: '入場等級︰',
                info: '45~69等/70(含)等以上'
            },
            {
                title: '傳送費用︰',
                info: '10,000金幣'
            },
            {
                title: '使用時間︰',
                info: '每人每日2小時(角色不共用)'
            }
        ]
    },
    {
        title: '國王的魔法狩獵區',
        content: [
            {
                title: '使用⌜國王的魔法狩獵區入場劵(活動)⌟',
                info: ''
            },
            {
                title: '可進入',
                info: ''
            },
            {
                title: '使用時間為',
                info: '2分鐘'
            }
        ]
    }
]
var part3_tablea = [
    [
        {
            daily: '登入遊戲',
            seed: 1
        },
        {
            daily: '完成每日任務(3/3)',
            seed: 1
        },
        {
            daily: '強化裝備1次',
            seed: 1
        },
        {
            daily: '於PVP中殺1人',
            seed: 1
        },
        {
            daily: '參加⌜國王的魔法狩獵區⌟活動至少1次',
            seed: 1
        }
    ],
    [
        {
            daily: '全體任務1︰每周全伺服器累積30萬帳號登入遊戲',
            seed: 5
        },
        {
            daily: '全體任務2︰每周全伺服器累積10萬角色完成每日任務(3/3)',
            seed: 5
        },
        {
            daily: '全體任務3︰每周全伺服器總計血盟突襲達1萬次以上',
            seed: 5
        }
    ]
];
var part3_tableb = [
    {
        week: 1,
        time: '12/11 05:00~12/18 05:00',
        task1: 'XXXXX',
        task2: 'XXXXX',
        task3: 'XXXXX'
    },
    {
        week: 2,
        time: '12/18 05:00~12/25 05:00',
        task1: '未開始',
        task2: '未開始',
        task3: '未開始'
    },
    {
        week: 3,
        time: '12/25 05:00~1/1 05:00',
        task1: '未開始',
        task2: '未開始',
        task3: '未開始'
    },
    {
        week: 4,
        time: '1/1 05:00~1/8 05:00',
        task1: '未開始',
        task2: '未開始',
        task3: '未開始'
    },
    {
        week: 5,
        time: '1/8 05:00~1/11 05:00',
        task1: '未開始',
        task2: '未開始',
        task3: '未開始'
    }
];
var part3_seedlist = [
    '神秘變身卡片(傳說)',
    '神秘變身卡片(英雄)',
    '高級變身抽卡*1',
    '高級魔法娃娃抽卡*1',
    '祝福的對武器師法的卷軸(刻印)*1',
    '祝福的對盔甲師法的卷軸(刻印)*1',
    '變身製作硬幣*100',
    '魔法娃娃製作硬幣*100',
    '名譽金幣*200',
    '古代精靈的墓穴時間補充寶石(活動)*1',
    '傲慢之塔時間補充寶石(活動)*1',
    '拉斯塔巴德副本時間補充寶石(活動)*1',
    '龍之珍珠(活動)*10'
];

$('.part1-table__body > tr').each(function(i,v){
    $(v).find('td').eq(1).find('span').text(part1_table[i].wish)
    $(v).find('td').eq(2).find('span').text(part1_table[i].get[0]+part1_table[i].get[1])
    $(v).find('td').eq(3).find('span').eq(0).text(part1_table[i].gift[0])
    $(v).find('td').eq(3).find('span').eq(1).text(part1_table[i].gift[1])
})
$('.part1-table__body-rwd').each(function(i,v){
    $(v).find(".part1-table__body-rwd__wish").text(part1_table[i].wish)
    $(v).find(".part1-table__body-rwd__get").find('span').eq(0).text(part1_table[i].get[0])
    $(v).find(".part1-table__body-rwd__get").find('span').eq(1).text(part1_table[i].get[1])
    $(v).find(".part1-table__body-rwd__gift").find('span').eq(0).text(part1_table[i].gift[0])
    $(v).find(".part1-table__body-rwd__gift").find('span').eq(1).text(part1_table[i].gift[1])
})

$('.part2-table__body-rwd').each(function(i,v){
    $(v).find('td').eq(0).text(part2_table[i].title)
    if($(v).find('td').eq(1).find('div').length > 0){
        $(v).find('td').eq(1).find('div').each(function(index,item){
            $(item).find('span').eq(0).text(part2_table[i].content[index].title)
            $(item).find('span').eq(1).text(part2_table[i].content[index].info)
        })
    }else{
        $(v).find('td').eq(1).text(part2_table[i].content)
    }
    
})

for(var i=0;i<part3_tablea.length;i++){
    for(var j=0;j<part3_tablea[i].length;j++){
        $('.part3-table-1__box'+(i+1)).eq(j).find('td').eq(0).text(part3_tablea[i][j].daily)
        $('.part3-table-1__box'+(i+1)).eq(j).find('td').eq(1).text(part3_tablea[i][j].seed)
    }
}

$('.part3-table-b__body-content').each(function(i,v){
    $(v).find('td').eq(0).text(part3_tableb[i].week);
    $(v).find('td').eq(1).text(part3_tableb[i].time);
    $(v).find('td').eq(2).text(part3_tableb[i].task1);
    $(v).find('td').eq(3).text(part3_tableb[i].task2);
    $(v).find('td').eq(4).text(part3_tableb[i].task3);
})
$('.part3-table-b__body-rwd__content').each(function(i,v){
    $(v).find('td').eq(0).text(part3_tableb[i].week);
    $(v).find('td').eq(2).text(part3_tableb[i].task1);
    $(v).find('td').eq(3).text(part3_tableb[i].task2);
    $(v).find('td').eq(4).text(part3_tableb[i].task3);
})
$('.part3-seedlist > li:not(.part3-seedlist__title)').each(function(i,v){
    $(v).text(part3_seedlist[i])
})