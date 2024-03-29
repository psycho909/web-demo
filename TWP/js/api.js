const apiRequest = axios.create({
	baseURL: "./api/E20240516"
});

// 取得指定伺服器的角色列表
export const GetCharacters = async (Token) => {
	try {
		const res = await apiRequest.post("/GetCharacters", {
			Token
		});
		const { Code, ListData, Data, Url, Message } = res.data;
		if (Code == -1) {
			throw { Message };
		}
		if (Code == -2) {
			throw { Message, Url };
		}
		return { Code, ListData, Data, Url, Message };
	} catch (error) {
		throw error;
	}
};

// 取得 使用者角色資料
export const GetUserCharacterData = (userObjectID) => {
	return apiRequest.post("/GetUserCharacterData", {
		userObjectID
	});
};

// 取得 伺服器與領域資料
export const GetServerData = () => {
	return apiRequest.post("/GetServerData");
};

// 取得 搶奪角色名稱列表(10組)
export const GetSnatchDataList = (userObjectID) => {
	return apiRequest.post("/GetSnatchDataList", {
		userObjectID
	});
};

// 新增 使用者資料 + 角色資料
export const InsertUserData = ({ userObjectID = 0, userObjectName = 0, userSessionToken = "", worldSeq = 0, serverSeq = 0, characterName = "" }) => {
	return apiRequest.post("/InsertUserData", {
		userObjectID,
		userObjectName,
		userSessionToken,
		worldSeq,
		serverSeq,
		characterName
	});
};

// 新增 使用者保護角色資料
export const InsertUserProtect = ({ userObjectID = 0, characterLogSeq = 0 }) => {
	return apiRequest.post("/InsertUserProtect", {
		userObjectID,
		characterLogSeq
	});
};

// 新增 使用者搶奪資料
export const InsertUserSnatch = ({ userObjectID = 0, snatchCharacterSeq = 0 }) => {
	return apiRequest.post("/InsertUserSnatch", {
		userObjectID,
		snatchCharacterSeq
	});
};
