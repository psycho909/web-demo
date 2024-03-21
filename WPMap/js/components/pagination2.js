import data from "./test.js";
let { defineComponent, ref, reactive, watch, onMounted, getCurrentInstance } = Vue;

const exchange = defineComponent({
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
		const { emit } = getCurrentInstance();
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

		// Inside your pagination2 component setup
		const updatePageAndEmit = (newPage) => {
			currentPage.value = newPage;
			emit("update:current-page", newPage); // Use kebab-case here
			renderPageNumbers();
		};
		const handleClick = (page) => {
			if (!api.value) {
				updatePageAndEmit(page);
			}
		};

		const handlePrevClick = () => {
			if (!api.value && currentPage.value > 1) {
				currentPage.value -= 1;
				// Check if we need to adjust the page number limits upon navigating back
				if (currentPage.value < pagination.minPageNumberLimit + 1) {
					pagination.minPageNumberLimit = Math.max(0, pagination.minPageNumberLimit - props.pageNumberLimit);
					pagination.maxPageNumberLimit = pagination.minPageNumberLimit + props.pageNumberLimit;
				}
				updatePageAndEmit(currentPage.value);
			}
		};

		const handleNextClick = () => {
			if (!api.value && currentPage.value < pagination.pageMax) {
				currentPage.value += 1;
				// Check if we need to adjust the page number limits upon navigating forward
				if (currentPage.value > pagination.maxPageNumberLimit) {
					pagination.minPageNumberLimit += props.pageNumberLimit;
					pagination.maxPageNumberLimit = Math.min(pagination.pageMax, pagination.maxPageNumberLimit + props.pageNumberLimit);
				}
				updatePageAndEmit(currentPage.value);
			}
		};
		const goToFirstPage = () => {
			const newPage = 1;
			currentPage.value = newPage;
			pagination.minPageNumberLimit = 0;
			pagination.maxPageNumberLimit = Math.min(pagination.pageMax, props.pageNumberLimit);
			emit("update:current-page", newPage); // Remember to use kebab-case for the event name
			renderPageNumbers();
		};

		const goToLastPage = () => {
			const newPage = pagination.pageMax;
			currentPage.value = newPage;

			// Calculate the starting point for the last set of pages.
			let startPage = pagination.pageMax - (pagination.pageMax % props.pageNumberLimit || props.pageNumberLimit);
			if (startPage === pagination.pageMax) {
				startPage -= props.pageNumberLimit;
			}

			pagination.minPageNumberLimit = Math.max(0, startPage);
			pagination.maxPageNumberLimit = pagination.pageMax;

			// Emit the change and update the visible pages.
			emit("update:current-page", newPage);
			renderPageNumbers();
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
			currentPage,
			goToFirstPage,
			goToLastPage
		};
	},
	template: `
        <div class="exchange">
            <div class="pagination">
                <ul class="pagination-numbers" style="display:flex;color:#fff;list-style:none;">
                    <li><span class="pagination-first" @click="goToFirstPage">&lt;&lt;</span></li>
                    <li><span class="pagination-prev" @click="handlePrevClick">&lt;</span></li>
                    <li :id="page" v-for="page in pagination.pagesList" :class="{ active: page === currentPage }" @click="handleClick(page)">
                        {{ page }}
                    </li>
                    <li><span class="pagination-next" @click="handleNextClick">&gt;</span></li>
                    <li><span class="pagination-last" @click="goToLastPage">&gt;&gt;</span></li>
                </ul>
            </div>
        </div>
    `
});

export default exchange;
