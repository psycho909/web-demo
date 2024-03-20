import data from "./test.js";
// import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js";
let exchange = {
	setup() {
		let list_Reward = Vue.ref([...data]);
		let jumpPage = Vue.ref(10);
		/*
		 * pages是一個陣列，裡面存放了所有的頁數
		 * pageMax是總共有幾頁
		 * pagesList是一個陣列，裡面存放了當前頁數的前後10頁
		 * itemsPerPage是一頁要顯示幾筆資料
		 * pageNumberLimit是一次要顯示幾個頁數
		 * maxPageNumberLimit是當前頁數的最大頁數
		 * minPageNumberLimit是當前頁數的最小頁數
		 */
		let pagination = Vue.reactive({ pageMax: 0, pages: [], pagesList: [], itemsPerPage: 10, pageNumberLimit: 10, maxPageNumberLimit: 10, minPageNumberLimit: 0 });
		let totalPage = Vue.ref(0);
		let currentPage = Vue.ref(1);
		let api = Vue.ref(false);
		let SetPages = async () => {
			pagination.pageMax = Math.ceil(totalPage.value / pagination.itemsPerPage);
			pagination.pages = [];
			for (var i = 1; i <= Math.ceil(totalPage.value / pagination.itemsPerPage); i++) {
				pagination.pages.push(i);
			}
		};

		let SetCurrentPage = (page) => {
			currentPage.value = page;
		};

		let SetMaxPageNumberLimit = (maxPageNumber) => {
			pagination.maxPageNumberLimit = maxPageNumber;
		};
		let SetMinPageNumberLimit = (minPageNumber) => {
			pagination.minPageNumberLimit = minPageNumber;
		};
		let RenderPageNumbers = async () => {
			pagination.pagesList = pagination.pages
				.map(function (number) {
					if (number < pagination.maxPageNumberLimit + 1 && number > pagination.minPageNumberLimit) {
						return number;
					} else {
						return null;
					}
				})
				.filter(Boolean);
		};
		let HandleClick = (page) => {
			if (!api.value) {
				SetCurrentPage(page);
				RenderPageNumbers();
			}
		};
		let HandlePrevClick = () => {
			if (!api.value) {
				if (currentPage.value - 1 < 1) {
					currentPage.value = 1;
					return;
				}
				SetCurrentPage(currentPage.value - 1);
				if (currentPage.value % pagination.pageNumberLimit == 0) {
					SetMaxPageNumberLimit(pagination.maxPageNumberLimit - pagination.pageNumberLimit);
					SetMinPageNumberLimit(pagination.minPageNumberLimit - pagination.pageNumberLimit);
				}
				FindRewardLogAPI(currentPage.value);
				RenderPageNumbers();
			}
		};
		let HandleNextClick = () => {
			if (!api.value) {
				if (currentPage.value + 1 > pagination.pages.length) {
					currentPage.value = pagination.pages.length;
					return;
				}
				SetCurrentPage(currentPage.value + 1);
				if (currentPage.value > pagination.maxPageNumberLimit) {
					SetMinPageNumberLimit(pagination.minPageNumberLimit + pagination.pageNumberLimit);
					SetMaxPageNumberLimit(pagination.maxPageNumberLimit + pagination.pageNumberLimit);
				}
				RenderPageNumbers();
			}
		};
		let InitPagination = async () => {
			await SetPages();
			await RenderPageNumbers();
		};
		Vue.onMounted(() => {
			pagination.itemsPerPage = jumpPage.value;
			totalPage.value = list_Reward.value.length;
			InitPagination();
		});
		return {
			HandleClick,
			HandlePrevClick,
			HandleNextClick,
			pagination,
			currentPage,
			jumpPage
		};
	},
	template: `
        <div class="exchange">
            <div class="pagination">
                <ul class="pagination-numbers" style="display:flex;color:#fff;list-style:none;">
                    <li><span class="pagination-prev" @click="HandlePrevClick">&lt;</span></li>
                    <li :id="page" v-for="page in pagination.pagesList" :class="[page == currentPage?'active':'']">
                        <span class="pagination-number" @click="HandleClick(page)">{{page}}</span>
                    </li>
                    <li><span class="pagination-next" @click="HandleNextClick">&gt;</span></li>
                </ul>
            </div>
        </div>
    `
};

export default exchange;
