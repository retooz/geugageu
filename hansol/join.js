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



// //비밀번호
// function checkPasswordValid() {
//     var pw = document.getElementById('inputPassword').value;
//     var regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
//     if (!regex.test(pw)) {
//       alert('비밀번호는 2가지 이상의 문자 조합(영문자, 숫자, 특수문자)으로 8~20자 이내로 입력해주세요.');
//       document.getElementById('inputPassword').value = '';
//       document.getElementById('inputPasswordCheck').value = '';
//       document.getElementById('inputPassword').focus();
//       return false;
//     }
//     else {
//       return true;
//     }
//   }
  
//   var inputPassword = document.getElementById('inputPassword');
//   var inputPasswordCheck = document.getElementById('inputPasswordCheck');
//   inputPassword.addEventListener('blur', checkPasswordValid);
  
//   inputPasswordCheck.addEventListener('blur', function () {
//     var pw = document.getElementById('inputPassword').value;
//     var pwCheck = inputPasswordCheck.value;
//     if (pw !== pwCheck) {
//       alert('입력하신 비밀번호와 일치하지 않습니다.');
//       inputPasswordCheck.value = '';
//       inputPasswordCheck.focus();
//       return false;
//     }
//     else {
//       return true;
//     }
//   });




//1. 내가 필요한 가구는?
let todoList =[]

            const render = ()=>{
                let planList = $("#planList");
                let text = " "
                //배열에 저장된 내용을 토대로 태그 형식으로 만들어줌!
                for(let i = 0; i < todoList.length; i++){
                text += `${todoList[i]}<button onclick='deleteList(${i})'>삭제</button>`;  
                }
                planList.html(text);
// 해결하지 못한 문제 선택 시 값이 planList로 나오게하고싶어요.
            // let inputPlan = $("#inputPlan select").val(); 
            let inputPlan = $("#inputPlan select option:selected");
            todoList.push(inputPlan.val()); 
            }
     
            const list=()=>{
            let inputPlan =  $("#inputPlan");
            todoList.push(inputPlan.val()) //사용자가 입력한 내용을 배열에 저장

            render();
            //3. 사용자가 입력한 내용이 되었다면 input 태그의 내용을 비우고 싶습니다!
            //4. 삭제버튼 -> 해당하는 내용만 삭제
            //4-1. innerHTML 출력할 때 리스트를 통해서 출력 되게끔
            //4-2. 삭제버튼이 눌려지면 splice 이용해서 요소 삭제!
            inputPlan.val("");
            inputPlan.focus();
        }
        //삭제 기능 
        const deleteList = (index) =>{
            // index =>삭제 버튼의 위치
            todoList.splice(index, 1);
            //삭제한 내용을 토대로 다시 출력!!
            render();
        }