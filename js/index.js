/*!
    Author: Jerry
    Last Update: 24. 08. 29.
*/
$(function() {
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
        $('.hcamp-history-btn-container').append(btn_code);
    }
    // 모두 닫기 버튼
    let $close_all_btn = $(`<button class="btn btn-default collapsed"><i class="fa-solid fa-rotate-left"></i></button>`);
    $close_all_btn.on('click', function() {
        let $opened = $('div.in')
        $opened.removeClass('in');
        $opened.addClass('collapse');

        $('.hcamp-history-btn-container .btn:not(.collapsed)').addClass('collapsed')
    })
    $('.hcamp-history-btn-container').append($close_all_btn);
}