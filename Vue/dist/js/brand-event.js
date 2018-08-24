new Vue({
    el:"#app",
    data:{
        brandType:"",
        brand:"",
        brandlist:[
            {
                brand:"asus",
                type:['ele','com']
            },
            {
                brand:"acer",
                type:['com']
            },
            {
                brand:"samsung",
                type:['ele','com','appliance']
            },
            {
                brand:"dyson",
                type:['appliance']
            },
            {
                brand:"panasonic",
                type:['appliance']
            },
            {
                brand:"sony",
                type:['com']
            }
        ],
        lists:[
            {
                title:"顯示器",
                img:"20180815-20180916_lcd_a.jpg", 
                content:"活動期間購買ROG Swift PG、Strix XG 、MG、VG系列指定電競螢幕 ，官網登錄送「ROG SICA電競滑鼠」(市價$990，數量有限，送完為止)",
                brand:"asus",
                url:'https://www.asus.com/tw/events/index.aspx',
                type:['ele'],
                starttime:"2018/08/15",
                endtime:"2018/09/16"
            },
            {
                title:"顯示器",
                img:"20180815-20180916_lcd_b.jpg",
                content:"活動期間購買ASUS ProArt PA329Q、ProArt PA27AC專業系列螢幕，官網登錄送「X-rite i1 Display Pro校色器」(市價$10,800，數量有限，送完為止)",
                brand:"asus",
                url:'https://www.asus.com/tw/events/index.aspx',
                type:['ele'],
                starttime:"2018/08/15",
                endtime:"2018/09/16"
            },
            {
                title:"顯示器",
                img:"20180815-20180916_lcd_c.jpg",
                content:"活動期間購買ASUS MX、MZ、VZ、VA 系列指定型號螢幕，官網登錄送「W5000無線鍵盤組 」(市價$990，數量有限，送完為止)",
                brand:"asus",
                url:'https://www.asus.com/tw/events/index.aspx',
                type:['ele'],
                starttime:"2018/08/15",
                endtime:"2018/09/16"
            },
            {
                title:"顯示器",
                img:"test.jpg",
                content:"CARRY 生活每一刻，2018/0901-09/20，購買三星C43J89曲面螢幕，上網登錄享好禮三選一!",
                brand:"samsung",
                url:'javascript:;',
                type:['ele'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"acer 通訊品牌",
                img:"test.jpg",
                content:"acer 通訊品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"acer",
                url:'javascript:;',
                type:['com'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"dyson 家電品牌",
                img:"test.jpg",
                content:"dyson 家電品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"dyson",
                url:'javascript:;',
                type:['appliance'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"panasonic 家電品牌",
                img:"test.jpg",
                content:"panasonic 家電品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"panasonic",
                url:'javascript:;',
                type:['appliance'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"sony 通訊品牌",
                img:"test.jpg",
                content:"sony 通訊品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"sony",
                url:'javascript:;',
                type:['com'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"asus 通訊品牌",
                img:"test.jpg",
                content:"asus 通訊品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"asus",
                url:'javascript:;',
                type:['com'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"samsung 通訊品牌",
                img:"test.jpg",
                content:"samsung 通訊品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"samsung",
                url:'javascript:;',
                type:['com'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            },
            {
                title:"samsung 家電品牌",
                img:"test.jpg",
                content:"samsung 家電品牌 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 測試 ",
                brand:"samsung",
                url:'javascript:;',
                type:['appliance'],
                starttime:"2018/08/22",
                endtime:"2018/08/29"
            }
        ]
    },
    computed:{
        computedBrands(){
            var vm=this;
            return vm.brandlist.filter(function(item,i){
                if(vm.brandType === ''){
                    return item.type
                }else{
                    return item.type.indexOf(vm.brandType) != -1
                }
                
            })
        },
        computedList(){
            var vm=this;
            return vm.lists.filter(function(item,i){
                if(vm.brand === '' && vm.brandType === ''){
                    return item.brand
                }
                if(vm.brandType === ''){
                    return item.brand.indexOf(vm.brand) != -1
                }
                
                return item.brand.indexOf(vm.brand) != -1 && item.type.indexOf(vm.brandType) != -1
            })
        }
    },
    methods:{
        checkBrandType(brandType=''){
            this.brand='';
            if(brandType === ''){
                this.brandType='';
            }else{
                this.brandType=brandType;
            }
            
        },
        checkBrand(brand){
            this.brand=brand;
        }
    }
})