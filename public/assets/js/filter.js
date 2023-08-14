$(document).ready(function(){ 
    $("button").click(function() {
        
       
// 모든 버튼에 현재 스타일을 리셋
        $(".filter-button").css({ 
            "border":"0.1em solid #e2e0e0"
        });
        
        
       
// 클릭한 버튼에 원하는 스타일을 적용
        $(this).css({ 
            "border":"0.15em solid #F67329"
        });	
    });
});


$(document).ready(function() {
    $("#color").click(function() {
        $("#colorDropdown").toggle();
        $('#priceDropdown').hide();
        $('#materialDropdown').hide();

    });
    $("#price").click(function() {
        $("#priceDropdown").toggle();
        $('#colorDropdown').hide();
        $('#materialDropdown').hide();

    });
    $("#material").click(function() {
        $("#materialDropdown").toggle();
        $('#priceDropdown').hide();
        $('#colorDropdown').hide();
    });
    // 다른 곳 클릭 시 드롭다운 닫기
    $(document).click(function(event) {
        const target = $(event.target);
        if (!target.closest(".filter-button, .drop-down").length) {
            $(".drop-down").hide();
        }
    });

});

$(document).ready(function() {
    $('#getCheckboxValue').click(function() {
      getCheckboxValue();
    });
  });

function getCheckboxValue() {
    const query = ".drop-down input[type='checkbox']:checked";
    const selectedEls = $(query);

    let result = '';
    selectedEls.each(function() {
      result += $(this).attr('value') + ' ';
    });

    $('#result').text(result);
}



$(document).ready(function() {
    // 색상 체크 초기화 버튼 클릭 시
    $("#reset-button").click(function() {
        // 모든 체크박스 선택 해제
        $(".drop-down input[type='checkbox']").prop("checked", false);
        $('#result').text("");
    });
});






$(document).ready(function() {
    // .reset-button 초기에는 숨기기
    $("#reset-button").hide();
    
    // 체크박스를 클릭할 때마다
    $(".drop-down input[type='checkbox']").change(function() {
        console.log(1);
        // 체크박스 선택 상태에 따라 #reset-button 가시성 변경
        if ($(".drop-down input[type='checkbox']:checked").length > 0) {
            $("#reset-button").show();
        } else {
            $("#reset-button").hide();
        }
    });
    
    // #reset-button 클릭 시 모든 체크박스 선택 해제 및 숨기기
        $("#reset-button").click(function() {
            $(".drop-down input[type='checkbox']").prop("checked", false);
            $("#result").text(""); // 결과 영역 초기화
            $(this).hide();
        });
    
        
});


// 필터링 부분
$(document).ready(function() {
    $(".drop-down input[type='checkbox']").click(function() {
        const selectedItems = [];
        $(".drop-down input[type='checkbox']:checked").each(function() {
            const itemName = $(this).attr('value');
            selectedItems.push(itemName);
        });

        displaySelectedItems(selectedItems);
    });

    function displaySelectedItems(selectedItems) {
        $("#result").empty();

        selectedItems.forEach(function(itemName) {
            const selectedDiv = $('<div class="selected-item">' + itemName + '<span class="close-button"> X </span></div>');
            selectedDiv.find(".close-button").click(function() {
                const itemToRemove = $(this).parent().text().trim();
                removeSelectedItem(itemToRemove);
            });
            $("#result").append(selectedDiv);
        });
    }
});
$(document).ready(function() {
    // 'X' 버튼을 누르면 선택된 아이템 삭제
    $(document).on("click", ".selected-item .remove-item", function() {
        $(this).closest(".selected-item").remove();
        const itemName = $(this).siblings(".item-name").text();
        resetCheckbox(itemName);
        if ($(".drop-down input[type='checkbox']:checked").length == 0){
            $("#reset-button").hide();
        }
    });

    // 체크박스가 변경될 때마다 선택 목록 업데이트
    $(document).on("change", ".drop-down input[type='checkbox']", function() {
        updateSelectedItems();
    });
});

function resetCheckbox(itemName) {
    $(".drop-down input[type='checkbox'][value='" + itemName + "']").prop("checked", false);
}

function updateSelectedItems() {
    const selectedEls = $(".drop-down input[type='checkbox']:checked");

    let result = '';
    selectedEls.each(function() {
        var itemName = $(this).attr('value');
        result += '<div class="selected-item"><span class="item-name">' + itemName + '</span><button class="remove-item">X</button></div>';
    });

    $('#result').html(result);
}
