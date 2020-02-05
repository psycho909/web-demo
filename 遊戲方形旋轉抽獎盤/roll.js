var lottery = {
    index: 1, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置，會經由回傳的值去做改變
    point: -1, //最终中奖位置，會經由回傳的值去做改變
    total: 400, //获奖弹框延迟显示时间，毫秒
    init: function(id) {
        if ($('#' + id).find('.lottery-unit').length > 0) {
            $lottery = $('#' + id)
            $units = $lottery.find('.lottery-unit')
            this.obj = $lottery
            this.count = $units.length
            $lottery
                .find('.lottery-unit-' + (this.index))
                .addClass('active')
        }
    },
    roll: function() {
        var index = this.index
        var count = this.count
        var lottery = this.obj
        $(lottery)
            .find('.lottery-unit-' + index)
            .removeClass('active')
        index += 1
        if (index > count) {
            index = 1
        }
        $(lottery)
            .find('.lottery-unit-' + index)
            .addClass('active')
        this.index = index
        return false
    },
    stop: function(index) {
        console.log("stop",index)
        this.prize = index
        return false
    }
}
function roll() {
    lottery.times += 1
    lottery.roll() //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
    // console.log(lottery.index)
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        console.log(lottery.prize,lottery.index)
        clearTimeout(lottery.timer)
        lottery.prize = -1
        lottery.times = 0
        click = false
        // 获奖弹框显示
        setTimeout(popShow, lottery.total)
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10
            // console.log(2)
        } else if (lottery.times == lottery.cycle) {
            lottery.prize = lottery.point
            // console.log(3)
        } else {
            // console.log(4)
            if (
                lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)
            ) {
                lottery.speed += 110
                // console.log("4-1")
            } else {
                lottery.speed += 20
                // console.log("4-2")
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40
            // console.log('speed = 40')
        }
        // console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
        lottery.timer = setTimeout(roll, lottery.speed) //循环调用
    }
    return false
}
var click = false
var nscore = 0

var res={
    "status":1,
    "type":"25",//設定中獎位置
    "prize":"5積分",
    "score":5,
    "t":"score"}
$(function() {
    lottery.init('lottery')
    $('.lottery-btn').click(function() {
        //按下弹起效果
        $(this).addClass('click')
        setTimeout(function() {
            $('.lottery-btn').removeClass('click')
        }, 200)

        if (click) {
            //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            return false
        } else {
            lottery.speed = 20
            if (res.status == 1) {
                var types = res.type % 24
                if (types == 0) {
                    types = 12
                    console.log('12')
                }
                lottery.point = types //0~11
                if (lottery.point == 10 || lottery.point == 11) {
                    $('#realPrize').attr('data-id', res.id)
                    console.log('0~11')
                }
                roll() //转圈过程不响应click事件，会将click置为false
                click = true //一次抽奖完成后，设置click为true，可继续抽奖
                //扣除积分
                var score = $('.user-score').text()
                score = score - 10
                $('.user-score').text(score)
                if (res.t == 'score') {
                    nscore = res.score
                } else {
                    nscore = 0
                }
                return false
            } else if (res.status == -1) {
                qqweixin()
            } else if (res.status == 0) {
                alert(res.msg)
            }
        }
    })
})
function popShow(){
    console.log("Done")
}