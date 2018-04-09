$('#collapseCoc').on('hidden.bs.collapse', function () {
    'use strict';
    $('#morebtn').html('more...');
});

$('#collapseCoc').on('shown.bs.collapse', function () {
    'use strict';
    $('#morebtn').html('less...');
});

function fetchEvents(nextEvents, cb, data) {
    if(!data) data = [];
    $.ajax({
        url: nextEvents?"https://api.meetup.com/GDGFribourg/events?photo-host=public&page=20&sig_id=202723513&status=upcoming&fields=featured_photo&sig=5c0f0689d51bfb89fab572b32e7d85f25fc564f9&callback=?":"https://api.meetup.com/GDGFribourg/events?photo-host=public&page=5&sig_id=202723513&status=past&fields=featured_photo&sig=d41d0305181edce140ac427e6d50b4b653266f15&callback=?",
        type: "get",
        dataType:'jsonp',
        crossDomain: true,
        success: function (response) {
            response.data.forEach(element => {
                data.push("<meetup-event title=\""+element.name+"\" date=\""+element.local_date+"\" url=\""+element.link+"\" pic=\""+(element.featured_photo!=null?element.featured_photo.photo_link:"")+"\"></meetup-event>");
            });
            cb(data);
        }
    });
}

$(document).ready(function() {
    fetchEvents(true,function(data){
        fetchEvents(false,function(data2){
            console.log(data2.slice(0, 5));
            var $events = $("#meetup-events");
            $events.html(data2.slice(0, 5));
            $events.append('<meetup-event title="More past events" url="https://www.meetup.com/GDGFribourg/events/past/"></meetup-event>');
        },data);
    });
    
})


customElements.define('meetup-event', class extends HTMLElement {
    constructor() {
        super();
        const title = this.getAttribute("title");
        const date = this.getAttribute("date");
        const url = this.getAttribute("url");
        const pic = this.getAttribute("pic");

        this._div = document.createElement('div');
        const s0 = this._div.appendChild(document.createElement('span'));
        s0.innerText = title;
    }

    connectedCallback () {
        this.appendChild(this._div);
    }


})