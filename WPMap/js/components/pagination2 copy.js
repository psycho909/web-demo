import data from "./test.js";
let { defineComponent, ref, reactive, watch, onMounted, getCurrentInstance } = Vue;

let exchange = {
	props: {
		listData: {
			type: Array,
			required: true
		},
		itemsPerPage: {
			type: Number,
			default: 10
		},
		pageNumberLimit: {
			type: Number,
			default: 10
		}
	},
	setup(props) {
		const currentPage = ref(1);
		const api = ref(false);
		const pagination = reactive({
			pageMax: 0,
			pages: [],
			pagesList: [],
			maxPageNumberLimit: props.pageNumberLimit,
			minPageNumberLimit: 0
		});

		const setPages = () => {
			pagination.pageMax = Math.ceil(props.listData.length / props.itemsPerPage);
			pagination.pages = Array.from({ length: pagination.pageMax }, (_, i) => i + 1);
			renderPageNumbers();
		};

		const renderPageNumbers = () => {
			pagination.pagesList = pagination.pages.filter((number) => number <= pagination.maxPageNumberLimit && number > pagination.minPageNumberLimit);
		};

		const adjustPageNumberLimits = (direction) => {
			if (direction === "next" && currentPage.value > pagination.maxPageNumberLimit) {
				pagination.maxPageNumberLimit += props.pageNumberLimit;
				pagination.minPageNumberLimit += props.pageNumberLimit;
			}
			if (direction === "prev" && currentPage.value <= pagination.minPageNumberLimit) {
				pagination.maxPageNumberLimit -= props.pageNumberLimit;
				pagination.minPageNumberLimit -= props.pageNumberLimit;
			}
			pagination.minPageNumberLimit = Math.max(pagination.minPageNumberLimit, 0);
			pagination.maxPageNumberLimit = Math.min(pagination.maxPageNumberLimit, pagination.pageMax);
		};

		const handleClick = (page) => {
			if (!api.value) {
				currentPage.value = page;
				renderPageNumbers();
			}
		};

		const handlePrevClick = () => {
			if (!api.value && currentPage.value > 1) {
				currentPage.value -= 1;
				adjustPageNumberLimits("prev");
				renderPageNumbers();
			}
		};

		const handleNextClick = () => {
			if (!api.value && currentPage.value < pagination.pageMax) {
				currentPage.value += 1;
				adjustPageNumberLimits("next");
				renderPageNumbers();
			}
		};

		watch(
			() => props.listData,
			() => {
				currentPage.value = 1; // Reset to the first page when listData changes
				pagination.minPageNumberLimit = 0;
				pagination.maxPageNumberLimit = props.pageNumberLimit;
				setPages(); // Recalculate the pages
				renderPageNumbers(); // Adjust the rendered page numbers based on the current state
			},
			{ immediate: true }
		);

		onMounted(() => {
			setPages();
		});

		return {
			handleClick,
			handlePrevClick,
			handleNextClick,
			pagination,
			currentPage
		};
	},
	template: `
        <div class="exchange">
            <div class="pagination">
                <ul class="pagination-numbers" style="display:flex;color:#fff;list-style:none;">
                    <li><span class="pagination-prev" @click="handlePrevClick">&lt;</span></li>
                    <li :id="page" v-for="page in pagination.pagesList" :class="{ active: page === currentPage }" @click="handleClick(page)">
                        {{ page }}
                    </li>
                    <li><span class="pagination-next" @click="handleNextClick">&gt;</span></li>
                </ul>
            </div>
        </div>
    `
};

export default exchange;
