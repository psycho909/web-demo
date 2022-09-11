let path = import.meta.env.MOD == "development" ? "../public/video" : "./video";
const getAssetsVideo = (url) => {
	return new URL(`./assets/video/${url}`, import.meta.url).href;
};
const getAssetsImage = (url) => {
	return new URL(`./assets/css/img/${url}`, import.meta.url).href;
};
export const dolls = [
	{
		seq: 1,
		name: "火焰之子",
		level: "初生期",
		type: 0,
		url: getAssetsVideo("1.mp4")
	},
	{
		seq: 2,
		name: "少年帕克",
		level: "成長期",
		type: 1,
		url: getAssetsVideo("2.mp4"),
		evo: getAssetsVideo("1-2.mp4")
	},
	{
		seq: 3,
		name: "魔騎士帕克",
		level: "成長期",
		type: 1,
		url: getAssetsVideo("3.mp4"),
		evo: getAssetsVideo("2-3.mp4")
	},
	{
		seq: 4,
		name: "少女帕歐",
		level: "成長期",
		type: 2,
		url: getAssetsVideo("4.mp4"),
		evo: getAssetsVideo("1-4.mp4")
	},
	{
		seq: 5,
		name: "魔導師帕歐",
		level: "成長期",
		type: 2,
		url: getAssetsVideo("5.mp4"),
		evo: getAssetsVideo("4-5.mp4")
	},
	{
		seq: 6,
		name: "爆擊火焰衝擊的魔騎士帕克",
		level: "育成期",
		type: 1,
		url: getAssetsVideo("6.mp4"),
		evo: getAssetsVideo("3-6.mp4")
	},
	{
		seq: 7,
		name: "爆擊火焰衝擊的魔導師帕歐",
		level: "育成期",
		type: 2,
		url: getAssetsVideo("7.mp4"),
		evo: getAssetsVideo("5-7.mp4")
	}
];
export const levels = [
	{
		level: "一般",
		type: 1
	},
	{
		level: "高級",
		type: 3
	},
	{
		level: "英雄",
		type: 5
	},
	{
		level: "傳說",
		type: 7
	}
];

export const dailyList = [
	{
		seq: "k_01",
		text: "不停地朝空氣揮動手裡的玩具劍",
		type: 1
	},
	{
		seq: "k_02",
		text: "練習施放尖刺盔甲，成功打爆了路邊的0級^小黃花",
		type: 1
	},
	{
		seq: "k_03",
		text: "召集了玩伴開始一場軍事演習，成功攻佔村子角落的公園沙坑",
		type: 1
	},
	{
		seq: "k_04",
		text: "對無人的曠野斥令吆喝著，彷彿在指揮千軍萬馬",
		type: 1
	},
	{
		seq: "o_01",
		text: "在你的床上用雜物堆砌成厚實的城堡，看起來只需用手指輕輕一推就能輕鬆擊垮",
		type: 2
	},
	{
		seq: "o_02",
		text: "嘴裡念念有詞雙手亂揮，假裝在施放法術的樣子",
		type: 2
	},
	{
		seq: "o_03",
		text: "對你大聲唸起了聽上去亂七八糟的咒語，什麼事都沒發生",
		type: 2
	},
	{
		seq: "o_04",
		text: "向你施法並擲出火球，其實只是一團被蹂躪的紙，砸到了你身上",
		type: 2
	},
	{
		seq: "h_01",
		text: "見到你而感到開心",
		type: 0
	},
	{
		seq: "h_02",
		text: "高興地向你跑來，似乎有很多話想對你說",
		type: 0
	},
	{
		seq: "h_03",
		text: "慵懶地躺在草地上，看著天上雲朵",
		type: 0
	},
	{
		seq: "h_04",
		text: "看著威風的你，幻想著與你一起冒險",
		type: 0
	},
	{
		seq: "h_05",
		text: "因為強化裝備成功，開心地又蹦又跳",
		type: 0
	},
	{
		seq: "h_06",
		text: "突然開心地高聲哼唱，你不知道原因",
		type: 0
	},
	{
		seq: "h_07",
		text: "若有所思地研究著地上的螞蟻",
		type: 0
	},
	{
		seq: "h_08",
		text: "覺得有你在一起很安全",
		type: 0
	},
	{
		seq: "h_09",
		text: "當你轉過身，可以聽見噗哧的笑聲",
		type: 0
	},
	{
		seq: "h_10",
		text: "精力充沛的繞著你跑，原來是服用了加速藥水停不下來",
		type: 0
	},
	{
		seq: "s_01",
		text: "見到你卻一語不發，似乎有點難過的樣子",
		type: 0
	},
	{
		seq: "s_02",
		text: "無精打采的躺在草地上",
		type: 0
	},
	{
		seq: "s_03",
		text: "走在路上，兩眼無神的晃著",
		type: 0
	},
	{
		seq: "s_04",
		text: "背對著你哽咽的啜泣，當你靠近時轉頭假裝甚麼事都沒有",
		type: 0
	},
	{
		seq: "s_05",
		text: "手中的武器與卷軸發出藍色的光芒並且化作一團煙霧甚麼都沒留下，眼角泛起了淚光",
		type: 0
	},
	{
		seq: "s_06",
		text: "不小心跌倒了，嚎啕大哭起來，但是看見你接近後停止了哭泣",
		type: 0
	},
	{
		seq: "s_07",
		text: "拿著手中的損壞的武器向你淚奔而來",
		type: 0
	},
	{
		seq: "s_08",
		text: "在深夜發出劇烈的碰撞聲後，發出陣陣嗚鳴聲",
		type: 0
	},
	{
		seq: "s_09",
		text: "弄丟了幾枚金幣嚎啕大哭，找回來時發現，其實弄丟的只是騎士團貨幣",
		type: 0
	},
	{
		seq: "s_10",
		text: "殷海薩能量用盡，顯得無精打采",
		type: 0
	},
	{
		seq: "a_01",
		text: "因為賭輸了裝備強化，生氣地暴跳如雷，想找幾隻怪洩憤",
		type: 0
	},
	{
		seq: "a_02",
		text: "打怪搶輸了隔壁的職業娃娃，生氣的踢起了路邊石子",
		type: 0
	},
	{
		seq: "a_03",
		text: "大聲朝天空咆嘯，原來是武器被打壞了",
		type: 0
	},
	{
		seq: "a_04",
		text: "不知道什麼原因在跟你賭氣，幾分鐘後再回來看時已經睡著了",
		type: 0
	}
];

export const levelFilter = (levels, SecretTechniquePoint) => {
	return levels.find(function (level, i) {
		return SecretTechniquePoint == level.type;
	});
};
