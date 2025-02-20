$(function() {
    const $container = $('section#history .history-container');
    $.getJSON('./data/history.json', function(resp) {
        let last_no = 0;
        last_no = resp.length;
        resp.forEach((e,i) => {
            const $notice = $(`
            <div id="history${i+1}" class="history collapse ${(i+1==resp.length)?"in": ""}">
                <div class="well">
                    <div class="history-head">
                        <h1>제 ${e.no}회 ${e.season} 해킹캠프</h1>
                        <p>${e.date}</p>
                        <p>${e.venue}</p>
                        ${(e.description)?`<p>${e.description}</p>`:''}
                        <hr />
                    </div>
                    <div class="history-body1">
                        <div class="history-section schedule">
                            ${ (e.schedule && e.schedule.length != 0)
                                ?`<h2>발표</h2>${generate_schedule_list(e.no, e.schedule)}`
                                :"" }
                        </div>
                        <div class="history-section award">
                            ${ (e.awards && e.awards.length != 0)
                                ?`<h2>수상자</h2>${generate_award_list(e.no, e.awards)}`
                                :"" }
                        </div>
                    </div>
                    <div class="history-section sponsor">
                        ${ (e.sponsor && e.sponsor.length != 0)
                            ?`<h2>후원</h2>${generate_sponsor_list(e.no, e.sponsor)}`
                            :"" }
                    </div>
                </div>
            </div>
            `);
            $container.append($notice);
        })
        generate_history_btns(last_no);
    });

})



function generate_history_btns(last_no) {
    // [지난 해킹캠프] 회차 번호 버튼을 생성.
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
        let $opened = $('#history div.in')
        $opened.removeClass('in');
        $opened.addClass('collapse');

        $('.history-btn-container .btn:not(.collapsed)').addClass('collapsed')
    })
    // 모두 열기 버튼
    let $open_all_btn = $(`<button class="btn btn-default collapsed"><i class="fa-solid fa-angles-down"></i></button>`);
    $open_all_btn.on('click', function() {
        let $opened = $('#history div.collapse')
        $opened.removeClass('collapse');
        $opened.addClass('in');

        $('.history-btn-container .btn.collapsed').removeClass('collapsed');
    })
    $('.history-btn-container').append($close_all_btn);
    $('.history-btn-container').append($open_all_btn);
}

function generate_schedule_list(no, schedule) {
    // 일정 리스트업
    return `<ul>
        ${
            schedule.map((s, i) => {
                let code = (s.author)?`<span>${s.author}</span><br />`:'';
                if (s.file) {
                    file_url = `slides/${no}/${s.file}`;
                    code += `<a href="${file_url}">${s.title}</a>`
                } else {
                    code += s.title;
                }
                return `<li>${code}</li>`;
            }).join('')
        }
        </ul>`;
}

function generate_award_list(no, awards) {
    // 수상자 리스트업
    return `<ul>
        ${
            awards.map((a, i) => {
                return `
                <li>
                    <p><b>${a.type}</b></p>
                    <span>${a.affiliation}</span>
                    <p class="name">${a.name}</p>
                </li>`
            }).join('')
        }
        </ul>`;
}

function generate_sponsor_list(no, sponsors) {
    // 후원사 리스트업
    return `<ul>
        ${
            sponsors.map((s, i) => {
                return `
                <li>
                    <a href="${s.site}" target="_blank"><img src="${s.logo_link}" /></a>
                    <p>${s.description}</p>
                </li>`
            }).join('')
        }
        </ul>`;
}