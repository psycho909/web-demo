class PaginationCore {
    constructor({ container, totalPage, pageNumberLimit, onPageChange,showFirst=true,showLast=true }) {
        this.totalPage = totalPage; // 总页数
        this.pageNumberLimit = pageNumberLimit; // 每次显示的页码数量
        this.currentPage = 1; // 当前页
        this.container = container || null; // 分页容器的 DOM 节点
        this._onPageChange = onPageChange || (() => {}); // 页面变化回调
        this.showFirst = showFirst;
        this.showLast = showLast;

        // 如果提供了容器，立即初始化
        if (this.container) {
            this.initializeContainer();
            this.updatePaginationUI();
        }
    }
    onPageChange(callback) {
        if (typeof callback === 'function') {
            this._onPageChange = callback;
        }
        return this;
    }
    // 获取当前可见的页码列表
    getVisiblePages() {
        const startPage = Math.floor((this.currentPage - 1) / this.pageNumberLimit) * this.pageNumberLimit + 1;
        const endPage = Math.min(startPage + this.pageNumberLimit - 1, this.totalPage);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }

    // 设置当前页
    setPage(page) {
        if (page < 1 || page > this.totalPage) return;
        this.currentPage = page;
        this.updatePaginationUI();
        this._onPageChange(this.currentPage);  // 调用回调，返回当前页
    }

    // 跳转到第一页
    goToFirstPage() {
        this.setPage(1);
    }

    // 跳转到最后一页
    goToLastPage() {
        this.setPage(this.totalPage);
    }

    // 跳转到上一页
    prevPage() {
        this.setPage(this.currentPage - 1);
    }

    // 跳转到下一页
    nextPage() {
        this.setPage(this.currentPage + 1);
    }

    // 初始化容器
    initializeContainer() {
        if (!this.container) {
            throw new Error('Container not provided');
        }
        const firstButton=this.showFirst?`<li class="pagination-numbers__symbol pagination-first">First</li>`:'';
        const lastButton=this.showLast?`<li class="pagination-numbers__symbol pagination-last">Last</li>`:'';
        // 初始化静态模板
        this.container.innerHTML = `
            <ul class="pagination-numbers" style="display: flex; list-style: none; color: #fff;">
                ${firstButton}
                <li class="pagination-numbers__symbol pagination-prev">Prev</li>
                <li class="pagination-numbers__symbol pagination-next">Next</li>
                ${lastButton}
            </ul>
        `;

        // 添加事件委托
        this.container.addEventListener('click', (event) => {
            const target = event.target;

            if(this.showFirst){
                if (target.classList.contains('pagination-first')) {
                    this.goToFirstPage();
                }
            }
            if(this.showLast){
                if (target.classList.contains('pagination-last')) {
                    this.goToLastPage();
                }
            }

            if (target.classList.contains('pagination-prev')) {
                this.prevPage();
            } else if (target.classList.contains('pagination-next')) {
                this.nextPage();
            } else if (target.classList.contains('pagination-numbers__item')) {
                this.setPage(Number(target.dataset.page));
            }
        });
    }

    // 更新分页 UI
    updatePaginationUI() {
        if (!this.container) return;
    
        const paginationNumbers = this.container.querySelector('.pagination-numbers');
    
        // 移除所有页码项，保留其他符号项
        const items = paginationNumbers.querySelectorAll('.pagination-numbers__item');
        items.forEach((item) => item.remove());
    
        // 获取符号项位置（在 "Prev" 后插入页码）
        const nextButton = paginationNumbers.querySelector('.pagination-next');
    
        // 生成并插入页码按钮
        this.getVisiblePages().forEach((page) => {
            const pageItem = document.createElement('li');
            pageItem.className = `pagination-numbers__item ${this.currentPage === page ? 'active' : ''}`;
            pageItem.textContent = page;
            pageItem.dataset.page = page; // 存储页码
            paginationNumbers.insertBefore(pageItem, nextButton); // 在 "Next" 按钮前插入
        });
    
        // 更新按钮状态
        if(this.showFirst){
            paginationNumbers.querySelector('.pagination-first').classList.toggle('disabled', this.currentPage === 1);
        }
        if(this.showLast){
            paginationNumbers.querySelector('.pagination-last').classList.toggle('disabled', this.currentPage === this.totalPage);
        }
        paginationNumbers.querySelector('.pagination-prev').classList.toggle('disabled', this.currentPage === 1);
        paginationNumbers.querySelector('.pagination-next').classList.toggle('disabled', this.currentPage === this.totalPage);
    }
}

export default PaginationCore;