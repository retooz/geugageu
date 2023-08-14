$(function () {
  let alert = $('#alert')
  alert.hide();
  $('input').keyup(() => {
    let pwd1 = $('#pwd1').val();
    let pwd2 = $('#pwd2').val();
    if (pwd1 != "" && pwd2 != "") {
      if (pwd1.length > 7) {
        if (pwd1 == pwd2) {
          alert.hide()
        } else {
          alert.show()
          alert.text('비밀번호가 일치하지 않습니다.')
        }
      } else {
        alert.show()
        alert.text('비밀번호를 8자 이상 입력해주세요.')
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

  $('#age-check').change(function () {
    if ($('#age-check').is(':checked') && $('#agree').is(':checked')) {
      $('#all').prop('checked', true)
    } else {
      $('#all').prop('checked', false)
    }
  })

  $('#agree').change(function () {
    if ($('#age-check').is(':checked') && $('#agree').is(':checked')) {
      $('#all').prop('checked', true)
    } else {
      $('#all').prop('checked', false)
    }
  })
})

