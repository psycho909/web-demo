import timeCreviceRaid from "../components/time-crevice-raid.js";
import timeCreviceKill from "../components/time-crevice-kill.js";

const timeCrevice = {
	components: {
		timeCreviceRaid,
		timeCreviceKill
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
