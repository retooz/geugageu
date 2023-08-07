
function test() {
    var pw1 = $('#pw1').val();
    var pw2 = $('#pw2').val();

    if (pw1.length < 6) {
        alert("입력한 글자가 6글자 이상이어야 함");
        return false;
    }

    if (pw1 !== pw2) {
        alert("비밀번호 불일치");
        return false;
    } else {
        alert("비밀번호 일치");
        return true;
    }
}