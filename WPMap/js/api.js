const apiRecordsRequest = axios.create({
	baseURL: "./api/Records"
});
const apiServerRequest = axios.create({
	baseURL: "./api/Server"
});

// 世界清單
export const GetWorldList = async () => {
	return apiServerRequest.get("/GetWorldList");
};
// 領域清單
export const GetServerList = async (WorldListSeq) => {
	return apiServerRequest.get("/GetServerList", {
		params: {
			WorldListSeq
		}
	});
};

// 取得據點現況
export const PostLiveapiTerritoryByWorldId = async ({ world_group_id = "", world_id = "", territory_grade = null, guild_id = null }) => {
	return apiRecordsRequest.post("/PostLiveapiTerritoryByWorldId", {
		world_group_id,
		world_id,
		territory_grade,
		guild_id
	});
};

// 戰榜RANK_等級排行
export const PostLiveapiGCRanking = async ({ world_group_id = "", world_id = "", class_id = null }) => {
	return apiRecordsRequest.post("/PostLiveapiGCRanking", {
		world_group_id,
		world_id,
		class: class_id
	});
};

// 戰榜RANK_旅團排名
export const PostLiveapiGuildRanking = async ({ world_group_id = "", world_id = "", page_size = 0 }) => {
	return apiRecordsRequest.post("/PostLiveapiGuildRanking", {
		world_group_id,
		world_id,
		page_size
	});
};

// 賽季戰況_BOSS消滅排名
export const PostERGetCrossWorldRaidInfo = async ({ season = "", matching_group_id = "", monster_id = "", guild_name = "", order_by = "", page_no = 0, page_size = 0 }) => {
	return apiRecordsRequest.post("/PostERGetCrossWorldRaidInfo", {
		season,
		matching_group_id,
		monster_id,
		guild_name,
		order_by,
		page_no,
		page_size
	});
};

// 賽季戰況_擊殺排行
export const PostERGetCrossWorldRaidRanking = async ({ season = "", matching_group_id = "" }) => {
	return apiRecordsRequest.post("/PostERGetCrossWorldRaidRanking", {
		season,
		matching_group_id
	});
};
