import rank from "./rank.js";
import timeCrevice from "./time-crevice.js";

const records = {
	components: {
		rank,
		timeCrevice
	},
	template: `
        <div class="records-wrap">
            <div class="records-nav">
                <div class="records-nav__item">戰榜RANK</div>
                <div class="records-nav__item">賽季戰況</div>
                <div class="records-nav__item current">據點現況</div>
            </div>
            <rank></rank>
        </div>
    `
};

export default records;
