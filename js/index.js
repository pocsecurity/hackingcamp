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
}