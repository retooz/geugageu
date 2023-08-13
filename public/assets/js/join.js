// let pw = prompt("비밀번호 입력해줘")
//         if(pw.length >= 15){
//             alert("매우 안전한 비밀번호")
//         } else if(pw.length >= 8){
//             alert("약간 안전한 비밀번호")
//         } else{
//             alert("비밀번호 8자리 이상 설정해줘")
//         }

//아이디
// function checkIdValid() {
//     var id = $('#id').val;
//     var regex = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;
//     if (!regex.test(id)) {
//       alert('아이디는 영문자와 숫자를 조합하여 6~20자 이내로 입력해주세요.');
//       $('#id').val = '';
//       $('#id').focus();
//       return false;
//     }
//     else {
//       return true;
//     }
//   }

//   var inputId = $('#id');
//   $('#inputId').on('blur', checkIdValid);


$(function () {
  let alert = $('#alert')
  alert.hide();
  $('input').keyup(() => {
    let pwd1 = $('#pwd1').val();
    let pwd2 = $('#pwd2').val();
    console.log(pwd1.length)
    if (pwd1 != "" && pwd2 != "") {
      if (pwd1 == pwd2) {
        if (pwd1.length > 7) {
          alert.hide()
        } else {
          alert.show()
          alert.text('비밀번호가 일치하지 않습니다.')
        }
      } else {
        alert.show()
        alert.text('비밀번호가 일치하지 않습니다.')
      }
    } else {
      alert.show()
      alert.text('비밀번호를 입력해주세요.')
    }
  })
})

$(document).ready(() => {
  $('#furniture-button').click(() => {
    $('.dropdown-container').toggle()
  })

  $('#all').change(function () {
    if ($(this).is(':checked')) {
      $('#age-check').prop("checked", true);
      $('#agree').prop('checked', true)
    }
    else {
      $('#age-check').prop("checked", false);
      $('#agree').prop('checked', false)
    }
  })

  $('#age-check').change(function() {
    if($('#age-check').is(':checked') && $('#agree').is(':checked')) {
      $('#all').prop('checked', true)
    } else {
      $('#all').prop('checked', false)
    }
  })

  $('#agree').change(function() {
    if($('#age-check').is(':checked') && $('#agree').is(':checked')) {
      $('#all').prop('checked', true)
    } else {
      $('#all').prop('checked', false)
    }
  })
})

