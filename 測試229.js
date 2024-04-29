$(function () {
	let d = {
		listData: [
			{
				totalNum: 800,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1-80000549",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "2-80000549",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1-140300032",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1-130000016",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "1-80000993",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光裝備保護卷軸",
				sn: "289-130100006",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "262-80001075",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "298-80001090",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "精靈之家椅",
				sn: "B-68-80002504",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "312-80001171",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "943-80000993",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1001-80001171",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "225~ 249等級經驗值 2倍券 1回使用券",
				sn: "168-140600029",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "970-80001075",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1002-80001171",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "199等級以下經驗值 2倍券 1回使用券",
				sn: "163-140600027",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "199等級以下經驗值 2倍券 1回使用券",
				sn: "164-140600027",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "時裝神奇剪刀",
				sn: "75-140000028",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "196-140600028",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "197-140600028",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1045-130000016",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1157-130100007",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光卷軸保護卡",
				sn: "1440-130100008",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1068-80001131",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "1001-80000993",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "稀有潛在能力卷軸80%",
				sn: "1074-80000992",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1206-130100007",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1452-80000549",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "安全盾牌卷軸",
				sn: "1142-130100001",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1431-181000699",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "混色染髮交換券",
				sn: "210-181000583",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1142-80001131",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1127-80001090",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1120-140300032",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1128-80001090",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "保護卷軸",
				sn: "368-80001062",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "白金神奇剪刀",
				sn: "220-140000005",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "白金神奇剪刀",
				sn: "221-140000005",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "231-140600028",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "232-140600028",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1583-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1177-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1556-181000699",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1584-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "安全盾牌卷軸",
				sn: "1264-130100001",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "白金神奇剪刀",
				sn: "234-140000005",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1247-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1217-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光卷軸保護卡",
				sn: "1691-130100008",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1212-80001131",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1247-80001131",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "稀有潛在能力卷軸80%",
				sn: "1258-80000992",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1263-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1256-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "225~ 249等級經驗值 2倍券 1回使用券",
				sn: "224-140600029",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1294-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1314-80001171",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1307-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1284-80001090",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "251-140600028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1324-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1428-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1298-80001131",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光裝備保護卷軸",
				sn: "1276-130100006",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1325-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1350-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1339-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1351-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "257-140600028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1340-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1827-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "時裝神奇剪刀",
				sn: "89-140000028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "1369-80001075",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1373-80001090",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1362-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "尊貴保護卷軸",
				sn: "469-130100010",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1531-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "時裝神奇剪刀",
				sn: "95-140000028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1405-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1403-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1488-80001171",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "巨型青蛙",
				sn: "C-276-80002502",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1463-80001090",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1855-181000699",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1458-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1892-181000699",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1472-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光卷軸保護卡",
				sn: "2014-130100008",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "1461-80001075",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1500-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1658-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "1429-80000993",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "1502-80001075",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1659-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "2034-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1636-80001171",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1606-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "封印之鎖",
				sn: "1935-181000698",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光裝備保護卷軸",
				sn: "1558-130100006",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "神秘鐵砧",
				sn: "336-140000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1-80000549",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "2-80000549",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1-140300032",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1-130000016",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "1-80000993",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光裝備保護卷軸",
				sn: "289-130100006",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "262-80001075",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "298-80001090",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "精靈之家椅",
				sn: "B-68-80002504",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "312-80001171",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "943-80000993",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1001-80001171",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "225~ 249等級經驗值 2倍券 1回使用券",
				sn: "168-140600029",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "970-80001075",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1002-80001171",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "199等級以下經驗值 2倍券 1回使用券",
				sn: "163-140600027",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "199等級以下經驗值 2倍券 1回使用券",
				sn: "164-140600027",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "時裝神奇剪刀",
				sn: "75-140000028",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "196-140600028",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "197-140600028",
				shopDate: "2024/04/27 18:10",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1045-130000016",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1157-130100007",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光卷軸保護卡",
				sn: "1440-130100008",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1068-80001131",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "1001-80000993",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "稀有潛在能力卷軸80%",
				sn: "1074-80000992",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1206-130100007",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1452-80000549",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "安全盾牌卷軸",
				sn: "1142-130100001",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1431-181000699",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "混色染髮交換券",
				sn: "210-181000583",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1142-80001131",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1127-80001090",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1120-140300032",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1128-80001090",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "保護卷軸",
				sn: "368-80001062",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "白金神奇剪刀",
				sn: "220-140000005",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "白金神奇剪刀",
				sn: "221-140000005",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "231-140600028",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "232-140600028",
				shopDate: "2024/04/27 19:12",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1583-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1177-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1556-181000699",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1584-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "安全盾牌卷軸",
				sn: "1264-130100001",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "白金神奇剪刀",
				sn: "234-140000005",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1247-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1217-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光卷軸保護卡",
				sn: "1691-130100008",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1212-80001131",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1247-80001131",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "稀有潛在能力卷軸80%",
				sn: "1258-80000992",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1263-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1256-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "225~ 249等級經驗值 2倍券 1回使用券",
				sn: "224-140600029",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1294-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1314-80001171",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1307-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1284-80001090",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "251-140600028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1324-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1428-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "附加潛在能力賦予卷軸50%",
				sn: "1298-80001131",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光裝備保護卷軸",
				sn: "1276-130100006",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1325-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1350-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1339-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1351-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "200~224 等級經驗值 2倍券 1回使用券",
				sn: "257-140600028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1340-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "1827-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "時裝神奇剪刀",
				sn: "89-140000028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "1369-80001075",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1373-80001090",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1362-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "尊貴保護卷軸",
				sn: "469-130100010",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1531-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "時裝神奇剪刀",
				sn: "95-140000028",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1405-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1403-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1488-80001171",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "巨型青蛙",
				sn: "C-276-80002502",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝樂觀的混沌卷軸40%",
				sn: "1463-80001090",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1855-181000699",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "寵物強化箱",
				sn: "1458-130000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "復仇女神的紡車",
				sn: "1892-181000699",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超性能擴音器",
				sn: "1472-140300032",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光卷軸保護卡",
				sn: "2014-130100008",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "1461-80001075",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "奇幻傳播者",
				sn: "1500-130000016",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1658-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "驚訝的混沌卷軸60%",
				sn: "1429-80000993",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "樂觀的混沌卷軸50%",
				sn: "1502-80001075",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光安全盾牌卷軸",
				sn: "1659-130100007",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "超級藥水",
				sn: "2034-80000549",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "黃金鐵鎚50%",
				sn: "1636-80001171",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "卷軸保護卡",
				sn: "1606-130100002",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "封印之鎖",
				sn: "1935-181000698",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "星光裝備保護卷軸",
				sn: "1558-130100006",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			},
			{
				totalNum: 180,
				eventName: "測試",
				itemName: "神秘鐵砧",
				sn: "336-140000014",
				shopDate: "2024/04/27 19:13",
				liveDate: "2024/05/24"
			}
		]
	};
	let snSendData = {};
	let snPager = null;
	let prevSendData = {};
	let prevTotalPage = 1;
	let tagCount = 0;

	updateSNList({
		EventID: 123,
		Page: 1,
		Row: "100"
	});
	function updateSNList(sendData) {
		if (sendData.Page == 3) {
			var prevPage = 1;
			// code = -3;
			if (Object.keys(prevSendData).length != 0) {
				if (prevSendData.Page != null) {
					// snPager.twbsPagination("show", prevSendData.Page);
					prevPage = prevSendData.Page;
				}
			}
			// console.log(sendData, prevPage);
			$("#mSNPagination")
				.children(".page-item")
				.eq(sendData.Page + 1)
				.removeClass("active");
			$("#mSNPagination")
				.children(".page-item")
				.eq(prevPage + 1)
				.addClass("active");

			if (prevPage === 1) {
				$("#mSNPagination").children(".page-item").eq(0).addClass("disabled");
				$("#mSNPagination")
					.children(".page-item")
					.eq(tagCount - 1)
					.removeClass("disabled");
			} else if (prevPage == prevTotalPage) {
				$("#mSNPagination").children(".page-item").eq(0).removeClass("disabled");
				$("#mSNPagination")
					.children(".page-item")
					.eq(tagCount - 1)
					.addClass("disabled");
			}

			$("#mSNPagination").children(".page-item").eq(1).hide();
			$("#mSNPagination")
				.children(".page-item")
				.eq(tagCount - 2)
				.hide();

			return;
		}
		snPager = $("#mSNPagination").twbsPagination({
			totalPages: Math.ceil(d.listData[0].totalNum / 100),
			visiblePages: 10,
			startPage: 1,
			initiateStartPageClick: false,
			first: "&lt;",
			last: "&gt;",
			onPageClick: function (e, p) {
				console.log("INIT");
				Page = p;
				snSendData = { EventID: 123, Page: Page, Row: "100" };
				// if (code == -3) {
				// 	return;
				// }
				updateSNList(snSendData);
			}
		});
		prevSendData = snSendData;
		tagCount = $("#mSNPagination").children(".page-item").length;
		$("#mSNPagination")
			.children(".page-item")
			.eq(tagCount - 2)
			.hide();
		$("#mSNPagination").children(".page-item").eq(1).hide();
	}
});
