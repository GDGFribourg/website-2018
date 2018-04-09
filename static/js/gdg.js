$('#collapseCoc').on('hidden.bs.collapse', function () {
    'use strict';
    $('#morebtn').html('more...');
});

$('#collapseCoc').on('shown.bs.collapse', function () {
    'use strict';
    $('#morebtn').html('less...');
});

customElements.define('meetup-event', class extends HTMLElement {
    constructor() {
        super();
        const title = this.getAttribute("title");
        const date = this.getAttribute("date");
        const url = this.getAttribute("url");

        this._div = document.createElement('div');
        const s0 = this._div.appendChild(document.createElement('span'));
        s0.innerText = title;
    }

    connectedCallback () {
        this.appendChild(this._div);
    }


})