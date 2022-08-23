function Init({ getGameAccount = true, GameAccount = "", data = "" } = {}) {
	return axios({
		method: "post",
		url: "../../api/Event/E20220916/Init",
		data: {
			getGameAccount,
			GameAccount,
			data
		}
	});
}

function Milestone(data) {
	return axios({
		method: "post",
		url: "../../api/Event/E20220916/Milestone",
		data: { data }
	});
}

function Unlock({ MissionInt = 0, data = "" } = {}) {
	return axios({
		method: "post",
		url: "../../api/Event/E20220916/Unlock",
		data: { MissionInt, data }
	});
}

function Award({ Type = 0, data = "" } = {}) {
	return axios({
		method: "post",
		url: "../../api/Event/E20220916/Award",
		data: { Type, data }
	});
}

function Exchange({ Seq = 0, data = "" } = {}) {
	return axios({
		method: "post",
		url: "../../api/Event/E20220916/Exchange",
		data: { Seq, data }
	});
}
