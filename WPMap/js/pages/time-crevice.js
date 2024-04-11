import timeCreviceRaid from "../components/time-crevice-raid.js";
import timeCreviceKill from "../components/time-crevice-kill.js";

const timeCrevice = {
	components: {
		timeCreviceRaid,
		timeCreviceKill
	},
	template: `
	<div class="time-crevice-nav">
        <div class="time-crevice-nav__item">BOSS擊殺紀錄</div>
        <div class="time-crevice-nav__item">擊殺排行</div>
    </div>
	<div class="time-crevice-content"><timeCreviceRaid></timeCreviceRaid></div>
	`
};

export default timeCrevice;
