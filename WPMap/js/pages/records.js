import rank from "./rank.js";
import timeCrevice from "./time-crevice.js";

const records = {
	props: ["page"],
	components: {
		rank,
		timeCrevice
	},
	template: `
        <div class="records-wrap">
            <div class="records-nav">
                <div class="records-nav__item" :class="[page == 'rank'?'active':'']">戰榜RANK</div>
                <div class="records-nav__item">賽季戰況</div>
                <div class="records-nav__item" :class="[page == 'time-crevice'?'active':'']">據點現況</div>
            </div>
            <div class="records-content"><component :is="page"></component></div>
        </div>
    `
};

export default records;
