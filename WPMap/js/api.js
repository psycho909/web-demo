const apiRequest = axios.create({
	baseURL: "./api/Records"
});

// 取得據點現況
export const PostLiveapiTerritoryByWorldId = async ({ world_group_id = "", world_id = "", territory_grade = "", guild_id = "" }) => {
	return apiRequest.post("/PostLiveapiTerritoryByWorldId", {
		world_group_id,
		world_id,
		territory_grade,
		guild_id
	});
};
