class Pagination extends HTMLElement {

    render() {
        let page = this.getAttribute('page') || 0;

        let pageShow = "";

        if (page) {

            pageShow += `<div class="pagination-wrap">
                            <div class="pagination">
                        `;
            let lengthPage = page >= 100 ? 10 : Math.round(page / 10);
            for (let i = 1; i <= lengthPage; i++) {
                pageShow += `<a onclick="nextPage(${i})">${i}</a>`;
            }

            pageShow += `</div>
                        </div>
                        `;

            this.innerHTML = pageShow;
        }


    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() { // (3)
        return ['page'];
    }

    attributeChangedCallback(name, oldValue, newValue) { // (4)
        this.render();
    }

}

customElements.define("pagination-view", Pagination);