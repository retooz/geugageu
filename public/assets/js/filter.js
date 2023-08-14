$(document).ready(function () {
    $("button").click(function () {

        // 모든 버튼에 현재 스타일을 리셋
        $(".filter-button").css({
            "border": "0.1em solid #e2e0e0"
        });

        // 클릭한 버튼에 원하는 스타일을 적용
        $(this).css({
            "border": "0.15em solid #F67329"
        });
    });
});

$(document).ready(function () {
    $("#color").click(function () {
        $("#colorDropdown").toggle();
        $('#priceDropdown').hide();
        $('#materialDropdown').hide();

    });
    $("#price").click(function () {
        $("#priceDropdown").toggle();
        $('#colorDropdown').hide();
        $('#materialDropdown').hide();

    });
    $("#material").click(function () {
        $("#materialDropdown").toggle();
        $('#priceDropdown').hide();
        $('#colorDropdown').hide();
    });
});

$(document).ready(function () {
    $('#getCheckboxValue').click(function () {
        getCheckboxValue();
    });
});

function getCheckboxValue() {
    const query = ".drop-down input[type='checkbox']:checked";
    const selectedEls = $(query);

    let result = '';
    selectedEls.each(function () {
        result += $(this).attr('name') + ' ';
    });

    $('#result').text(result);
}



$(document).ready(function () {
    // 색상 체크 초기화 버튼 클릭 시
    $("#reset-button").click(function () {
        // 모든 체크박스 선택 해제
        $(".drop-down input[type='checkbox']").prop("checked", false);
        $('#result').text("");
    });
});

$(document).ready(function () {
    // .reset-button 초기에는 숨기기
    $("#reset-button").hide();

    // 체크박스를 클릭할 때마다
    $(".drop-down input[type='checkbox']").click(function () {
        // 체크박스 선택 상태에 따라 #reset-button 가시성 변경
        if ($(".drop-down input[type='checkbox']:checked").length > 0) {
            $("#reset-button").show();
        } else {
            $("#reset-button").hide();
        }
    });

    // #reset-button 클릭 시 모든 체크박스 선택 해제 및 숨기기
    $("#reset-button").click(function () {
        $(".drop-down input[type='checkbox']").prop("checked", false);

        $(this).hide();
    });


});
