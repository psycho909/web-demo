import timeCreviceRaid from "./time-crevice-raid.js";
import timeCreviceRank from "./time-crevice-rank.js";

const timeCrevice = {
	components: {
		timeCreviceRaid,
		timeCreviceRank
	},
	template: `
	<div class="time-crevice__nav">
        <div class="time-crevice__nav-item">BOSS擊殺紀錄</div>
        <div class="time-crevice__nav-item">擊殺排行</div>
    </div>
	<timeCreviceRaid></timeCreviceRaid>
	`
};

export default timeCrevice;
