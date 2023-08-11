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


$(function(){
  $('#alert-success').hide();
  $('#alert-danger').hide();
  $('input').keyup(function(){
    var pwd1=$('#pwd1').val();
    var pwd2=$('#pwd2').val();
    if(pwd1 != "" || pwd2 != ""){
      if(pwd1 == pwd2){
        $('#alert-success').show();
        $('#alert-danger').hide();
        $('submit').removeAttr("disabled");
      } else{
        $('#alert-success').hide();
        $('#alert-danger').show();
        $('submit').attr("disabled", "disabled");
      }
    }

  })

})


//1. 내가 필요한 가구는?
let todoList =[]

const render = ()=>{
    let planList = $("#planList");
    let text = " "
    for(let i = 0; i < todoList.length; i++){
      text += `${todoList[i]}<button class="del-btn" onclick='deleteList(${i})'>삭제</button>`;    
    }
    planList.html(text);
}

const list=()=>{
  let inputPlan =  $("#inputPlan");
  let inputPlan2 = $("option:selected");
  todoList.push(inputPlan2.val());

  render();
  inputPlan.val("");
  inputPlan.focus();
}
//삭제 기능 
const deleteList = (index) =>{
    todoList.splice(index, 1);
    render();
}
