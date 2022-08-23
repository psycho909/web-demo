var store = new Vuex.Store({
	state: {
		data: "",
		Point: "",
		Milestone: null,
		GetItemLog: null,
		Missions: [
			{ MissionInt: 1, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 2, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 3, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 4, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 5, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 6, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 7, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 8, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 9, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 10, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 11, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } },
			{ MissionInt: 12, Unlock: 0, MissionStatus: { MissionStatus1: 0, MissionStatus2: 0, MissionStatus3: 0 } }
		],
		sender: ""
	},
	getters: {
		GetterMissions(state) {
			var _Missions = state.Missions.map(function (m, i) {
				m.complete = 0;
				m.start = 0;
				for (var status in m.MissionStatus) {
					if (m.MissionStatus[status] > 0) {
						m.complete += 1;
					}
				}
				return m;
			});
			return _Missions;
		}
	},
	mutations: {
		SET_SENDER(state, payload) {
			state.sender = payload;
		},
		SET_DATA(state, payload) {
			state.data = payload;
		},
		SET_INIT(state, payload) {
			state.data = payload.data;
			state.Point = payload.Page.Point;
			state.Milestone = payload.Page.Milestone;
			state.Missions = payload.Page.Missions;
		},
		SET_POINT(state, payload) {
			state.Point = payload;
		},
		SET_MISSIONS(state, payload) {
			state.Missions = payload;
		},
		SET_MILESTONE(state, payload) {
			state.Milestone = payload;
		},
		SET_GET_ITEM_LOG(state, payload) {
			state.GetItemLog = payload;
		}
	},
	actions: {}
});
