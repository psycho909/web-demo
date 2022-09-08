import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
	state: () => {
		return {
			SecretTechniquePoint: 1,
			DollName: "",
			DollSeq: 1,
			TotalPoint: 0,
			InviteCode: "",
			Guid: "",
			AccountToken: "",
			CharName: "",
			CommUserData: {
				CharName: "",
				ServerId: ""
			},
			FuntionName: "",
			invitelog: [],
			partnerdata: [],
			page: "entry",
			IsShowNewDoll: 0
		};
	},
	getters: {
		getData(state) {
			return {
				AccountToken: state.AccountToken,
				CommUserData: state.CommUserData,
				FuntionName: state.FuntionName
			};
		}
	},
	actions: {
		init(payload) {
			const {
				invitelog,
				partnerdata,
				userdata: { CharacterName, Serverid, DollName, DollSeq, TotalPoint, IsShowNewDoll, Guid }
			} = payload;
			this.invitelog = invitelog;
			this.partnerdata = partnerdata;
			this.CharName = CharacterName;
			this.CommUserData.CharName = CharacterName;
			this.CommUserData.ServerId = Serverid;
			this.DollName = DollName;
			this.DollSeq = DollSeq;
			this.TotalPoint = TotalPoint;
			this.IsShowNewDoll = IsShowNewDoll;
			this.Guid = Guid;
		},
		setAccountToken(payload) {
			this.AccountToken = payload;
		},
		setServerId(payload) {
			this.CommUserData.ServerId = payload;
		},
		setCarName(payload) {
			this.CommUserData.CharName = payload;
		},
		setInviteCode(payload) {
			this.setInviteCode = payload;
		},
		changePage(payload) {
			this.page = payload;
		}
	}
});
