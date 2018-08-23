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
        url: nextEvents?"https://api.meetup.com/GDGFribourg/events?photo-host=public&page=20&sig_id=202723513&status=upcoming&fields=featured_photo&sig=5c0f0689d51bfb89fab572b32e7d85f25fc564f9&callback=?":"https://api.meetup.com/GDGFribourg/events?desc=true&photo-host=public&page=5&sig_id=202723513&status=past&fields=featured_photo&sig=e08c9efa38b5cdc1919b81d422d834c8bb2948c9&callback=?",
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
        const pic = this.getAttribute("pic")||"https://pbs.twimg.com/profile_images/860130141367873537/RgNNnPfi_400x400.jpg";

        this._div = document.createElement('div');
        $(this._div).attr("class","organizer-box");
        const a = this._div.appendChild(document.createElement('a'));
        $(a).attr("href",url);
        const img = a.appendChild(document.createElement('img'));
        $(img).attr("src",pic);
        $(img).attr("class","img-circle img-event");
        $(img).attr("alt",title);
        const h3 = a.appendChild(document.createElement('h3'));
        h3.innerText = title;
        const p = a.appendChild(document.createElement('p'));
        p.innerText=date;
    }

    connectedCallback () {
        $(this).attr("class","col-md-4 col-sm-12 text-center");
        this.appendChild(this._div);
    }
})