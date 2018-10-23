<script>
        var lottery = {
            index: -1, //当前转动到哪个位置，起点位置
            count: 0, //总共有多少个位置
            timer: 0, //setTimeout的ID，用clearTimeout清除
            speed: 20, //初始转动速度
            times: 0, //转动次数
            cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1, //中奖位置
            point:-1,//最终中奖位置
            total:400,//获奖弹框延迟显示时间，毫秒
            init: function (id) {
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    $lottery = $("#" + id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    $lottery.find(".lottery-unit-" + (this.index+1)).addClass("active");
                };
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count) {
                    index = 1;
                };
                $(lottery).find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            },
            stop: function (index) {
                this.prize = index;
                return false;
            }
        };
        function roll() {
            lottery.times += 1;
            lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
            if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
                clearTimeout(lottery.timer);
                lottery.prize = -1;
                lottery.times = 0;
                click = false;
                // 获奖弹框显示
                setTimeout(popShow,lottery.total);
            } else {
                if (lottery.times < lottery.cycle) {
                    lottery.speed -= 10;
                } else if (lottery.times == lottery.cycle) {
                    lottery.prize = lottery.point;
                } else {
                    if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize ==
                            lottery.index + 1)) {
                        lottery.speed += 110;
                    } else {
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed < 40) {
                    lottery.speed = 40;
                };
                // console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                lottery.timer = setTimeout(roll, lottery.speed); //循环调用
            }
            return false;
        }
        var click = false;
        var nscore = 0;
        $(function(){
            lottery.init('lottery');
            $(".lottery-btn").click(function () {
                //按下弹起效果
                $(this).addClass("click");
                setTimeout(function () {
                    $(".lottery-btn").removeClass("click");
                }, 200);

                if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    return false;
                } else {
                    lottery.speed = 20;
                    $.ajax({
                        type:'get',
                        dataType:'json',
                        url:"//588ku.com/?m=Sign&a=lottery",
                        success:function(res){
                            if(res.status == 1){
                                var types = res.type%24;
                                if(types == 0) {
                                    types = 12;
                                }
                                lottery.point=types;//0~11
                                if(lottery.point == 10 || lottery.point == 11){
                                    $("#realPrize").attr("data-id",res.id);
                                }
                                roll(); //转圈过程不响应click事件，会将click置为false
                                click = true; //一次抽奖完成后，设置click为true，可继续抽奖
                                //扣除积分
                                var score = $(".user-score").text();
                                score = score - 10;
                                $(".user-score").text(score);
                                if(res.t == 'score'){
                                    nscore = res.score;
                                }else{
                                    nscore = 0;
                                }
                                return false;
                            }else if(res.status == -1){
                                qqweixin()
                            }else if(res.status == 0){
                                alert(res.msg);
                            }
                        }
                    })
                }
            });
        })


        $('#input-province_id,#input-city_id,#input-area_id').on("change",function() {
            $('#input-area_id').next().remove();
            var maxLevel = 3;// 支持的最大地区层级
            // 当前选择的地区的ID
            // this 当前事件源对象
            var currId = $(this).val();
            // 当前地区层级
            var currLevel = Number($(this).attr('level'));
            // 选择-1 不做任何操作, return 方法终止!
            if (currId == '-1') return ;
            // 当前是最后一级地区, 不需要ajax请求
            if (maxLevel == currLevel) return ;

            // 设置地区
            setRegion(currId, currLevel);
        });

        function popShow(){
            let sel='';
            if(lottery.point<4){
                $('.down-limit-content').removeClass('gift');
                sel='.lottery-unit-'+lottery.point+' .lu-con>span';
                $('.lp-points p>i').text($('#lottery').find(sel).text());
                $('.lp-points').show().siblings('div').hide();
            }else if(lottery.point<10){
                $('.down-limit-content').removeClass('gift');
                sel='.lottery-unit-'+lottery.point+' .lu-con>b';
                $('.lp-member b').html($('#lottery').find(sel).html());
                sel='.lottery-unit-'+lottery.point+' .lu-con>span';
                $('.lp-member p>i').text($('#lottery').find(sel).text());
                $('.lp-member').show().siblings('div').hide();
            }else if(lottery.point<12){
                $('.down-limit-content').addClass('gift');
                sel='.lottery-unit-'+lottery.point+' .lu-con>p';
                $('.lp-gift .img').html($('#lottery').find(sel).html());
                sel='.lottery-unit-'+lottery.point+' .lu-con>span';
                $('.lp-gift p>i').text($('#lottery').find(sel).text());
                $('.lp-gift').show().siblings('div').hide();
            }else{
                $('.down-limit-content').removeClass('gift');
                $('.lp-sorry').show().siblings('div').hide();
            }
            $('.lottery-pop').show();
            var now_score = $(".user-score").text();
            var n_score = parseInt(now_score) + parseInt(nscore);
            $(".user-score").text(n_score);
        }
        $('.submit').on("click",function() {
            var customer=$('.customer').val();//获取收货人名
            var phonenumber=$('.phone-input').val();
            var province_id=$('#input-province_id').val();
            var city_id=$('#input-city_id').val();
            var area_id=$('#input-area_id').val();
            var province=$('#input-province_id').find("option:selected").text();
            var city=$('#input-city_id').find("option:selected").text()
            var area=$('#input-area_id').find("option:selected").text()
            var address=$('#input-address').val();
            var priceId = $(this).attr("data-id");
            var allAddress=province+city+area+address;
            if(!judgeInput()){
                return false
            }
            initAddress();
            $(".lottery-address").hide();
            $.ajax({
                url: '/index.php?m=Sign&a=addAddress',
                dataType: 'json',
                data: {username: customer,phone:phonenumber, province:province_id,city:city_id,area:area_id,address:address,allAddress:allAddress,priceId:priceId},
                success: function (response) {
                    if(response.status == 1){
                        $(".gift-name").text(response.name)
                        $(".lottery-submit").show();
                    }else{
                        alert(response.message);
                        location.reload();
                    }
                }
            });
        });
        //填写收货地址
        $(document).on("click",".address-btn",function(){
            var name = $(this).prev().html();
            $('.gift-name').html(name);
            var priceId = $(this).attr("data-id");
            $.ajax({
                type : 'get',
                dataType : 'json',
                url : "//588ku.com/?m=Sign&a=checkPrize",
                data : {id:priceId},
                success:function(res){
                    if(res.status == 1){
                        setRegion(1,0)
                        $(".submit").attr("data-id",priceId);
                        $('.lottery-address').show();
                        $('.lottery-list').hide();
                        $('.lottery-pop').hide();
                    }else if(res.status == -1){
                        qqweixin();
                    }else{
                        alert(res.message);
                    }
                }
            })
        })
        function judgeInput(){

            var customer=$('.customer').val();//获取收货人名
            var phonenumber=$('.phone-input').val();
            var province_id=$('#input-province_id').val();
            var city_id=$('#input-city_id').val();
            var address=$('#input-address').val()
            var status=0;//状态吗

            if(customer.length<2){
                alert("请填写收货人姓名")
                status=1;
            }
            if(phonenumber.length != 11){
                alert('请填写正确手机号码');
                status=1;
            }
            if(address.length <= 5){
                alert('地址不详细');
                status=1;
            }
            if(province_id==-1||city_id==-1){
                alert('请填写大区信息');
                status=1;
            }
            if( status==1){
                return false;
            }else{
                return true
            }
        }
        function setRegion(currId, currLevel)
        {
            //发出ajax请求
            $.ajax({
                url:'/index.php?m=Sign&a=getRegion',
                dataType:'json',
                data:{type:'region',region_id:currId},
                success:function(response){
                    if(response.status==1){
                        // 确定下一级的select
                        var nextLevel = currLevel + 1;
                        var nextSelect = $('.fill-address-wd  select[level=' + nextLevel + ']');
                        // 初始化选项中已有的数据
                        nextSelect.find('option[value!="-1"]').remove();
                        // 遍历所有的地区数据
                        for(var i = 0; i < response.list.length; ++i) {
                            var currRegion = response.list[i];
                            // 将地区, 形成option, 放在下级的select中
                            nextSelect.append('<option value="'+currRegion.id+'">' + currRegion.title + '</option>');
                        }
                    }else{
                        console.error('地区数据有错误');
                        return false ;
                    }
                }
            });
        }

        $('.go-list').on("click",function(){
            $('.lottery-pop').hide();
            $.ajax({
                type:'get',
                url : '//588ku.com/?m=Sign&a=getRecord',
                dataType :'json',
                success:function(res){
                    if(res.status == 1){
                        $(".list-box ul").remove();
                        $('.lottery-list').show();
                        var html = '<ul class="ll-list">';
                        for(var i=0; i< res.data.length ; i++){
                            if(res['data'][i]['status'] == 1){
                                html += '<li class="clearfix">'
                                    +'<span class="date fl">' + res['data'][i]['date'] + '</span><span class="gift">' + res['data'][i]['name'] + '</span>'
                                    + '<a class="fr">' + res['data'][i]['des'] + '</a>'
                            }else{
                                html += '<li class="clearfix">'
                                    +'<span class="date fl">' + res['data'][i]['date'] + '</span><span class="gift">' + res['data'][i]['name'] + '</span>'
                                    + '<a class="unclaimed fr address-btn" data-id="'+res['data'][i]['id']+'">' + res['data'][i]['des'] + '</a>'
                            }
                        }
                        html += '</ul>'
                        $(".list-box").append(html);
                    }else if(res.status == -1){
                        qqweixin()
                    }else{
                        alert(res.data);
                    }
                }
            })
        })
        //初始化地址页面（清空）
        function initAddress(){
            $('.customer').val('')
            $('.phone-input').val('');
            $('#input-province_id').val(-1);
            $('#input-city_id').val(-1);
            $('#input-area_id').val(-1);
            $('#input-address').val('')
        }
    </script>