import axios from "axios";

const apiRequest = axios.create({
	baseURL: "/api/E20220914/"
});

export const GetServerList = (data) => {
	return apiRequest.post("GetServerList", data);
};

export const GetCharacterList = (data) => {
	return apiRequest.post("GetCharacterList", data);
};

export const GetUserData = (data) => {
	return apiRequest.post("GetUserData", data);
};

export const InsertUserData = (data) => {
	return apiRequest.post("InsertUserData", data);
};

export const InsertInviteCode = (data, InviteCode) => {
	const _data = { ...data, InviteCode };
	return apiRequest.post("InsertInviteCode", _data);
};

export const GetDailyItem = (data) => {
	return apiRequest.post("GetDailyItem", data);
};

export const GetDiaryLog = (data) => {
	return apiRequest.post("GetDiaryLog", data);
};
