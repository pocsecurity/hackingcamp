$(function() {
    const $container = $('header .notice-container');
    $.getJSON('./data/notice.json', function(resp) {
        resp.forEach((e, i) => {
            if (e.view) {
                const $notice = $(`
                <div class="notice">
                    <div class="notice-head">${e.date}</div>
                    <div class="notice-body">${e.message.join('<br />')}</div>
                </div>
                `);
                $container.append($notice);
            }
        })
    })
})