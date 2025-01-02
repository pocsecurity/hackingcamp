$(function() {
    const $container = $('section#history .history-container');
    $.getJSON('./data/history.json', function(resp) {
        resp.forEach((e,i) => {
            const $notice = $(`
            <div id="history${i+1}" class="history collapse ${(i+1==resp.length)?"in": ""}">
                <div class="well">
                    <div class="history-head">
                        <h1>제 ${e.no}회 ${e.season} 해킹캠프</h1>
                        <p>${e.date}</p>
                        <p>${e.venue}</p>
                        ${(e.description)?`<p>${e.description}</p>`:''}
                    </div>
                    <hr />
                    <div class="history-schedule">
                        <ul>
                            ${
                                e.schedule.map((s, i) => {
                                    let code = (s.author)?`<span>${s.author}</span><br />`:'';
                                    if (s.file) {
                                        file_url = `slides/${e.no}/${s.file}`;
                                        code += `<a href="${file_url}">${s.title}</a>`
                                    } else {
                                        code += s.title;
                                    }
                                    return `<li>${code}</li>`;
                                }).join('')
                            }
                        </ul>
                    </div>
                    <div class="history-sponsor">
                        ${
                            (e.sponsor.length != 0)?"<hr /><h2>후원</h2>":""
                        }
                        <ul>
                            ${
                                e.sponsor.map((s, i) => {
                                    return `
                                    <li>
                                        <a href="${s.site}" target="_blank"><img src="${s.logo_link}" /></a>
                                        <p>${s.description}</p>
                                    </li>`
                                }).join('')
                            }
                        </ul>
                    </div>
                </div>
            </div>
            `);
            $container.append($notice);
        })
    });

    generate_history_btns();
})



function generate_history_btns() {
    // [지난 해킹캠프] 회차 번호 버튼을 생성.
    const last_no = 29;
    const btn_fmt = '<button class="btn btn-default collapsed" type="button" data-toggle="collapse" data-target="#history{0}" aria-expanded="false" aria-controls="history{0}">{0}회</button>';
    for (let i = 1; i <= last_no; i++) {
        let btn_code = btn_fmt.replace(/\{0\}/g, i);
        if (i == last_no) {
            btn_code = btn_code.replace(' collapsed', '');
        }
        $('.history-btn-container').append(btn_code);
    }
    // 모두 닫기 버튼
    let $close_all_btn = $(`<button class="btn btn-default collapsed"><i class="fa-solid fa-rotate-left"></i></button>`);
    $close_all_btn.on('click', function() {
        let $opened = $('div.in')
        $opened.removeClass('in');
        $opened.addClass('collapse');

        $('.history-btn-container .btn:not(.collapsed)').addClass('collapsed')
    })
    $('.history-btn-container').append($close_all_btn);
}