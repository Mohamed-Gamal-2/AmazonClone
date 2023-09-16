var userName=document.custom_form.userName;
var email=document.custom_form.email;
var phone=document.custom_form.phone;
var password=document.custom_form.password;
var conditions=document.custom_form.conditions;
var registerData=[]
if (localStorage.getItem("registerData") == null) {
 var registerData = [];
}
else {
 var registerData = JSON.parse(localStorage.getItem("registerData"))
}
function FormValidation(){
  //userName validation
  if (userName.value == "") {
    userName.nextElementSibling.style.display = "block";
    userName.style.border = "1px solid #f00";
    return false
  }else{
    userName.nextElementSibling.style.display = "none";
    userName.style.border = "1px solid transparent";
  }
  //email validation
  if (!email.value.match(/^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/) || email.value == "" || searchEmail()) {
    email.nextElementSibling.style.display = "block";
    email.style.border = "1px solid #f00";
    return false
  }
  else{
    email.nextElementSibling.style.display = "none";
    email.style.border = "1px solid transparent";
  }
  //phone no validation
  if (!phone.value.match(/^01[0125][0-9]{8}$/) || phone.value == "") {
    phone.nextElementSibling.style.display = "block";
    phone.style.border = "1px solid #f00";
    return false
  }else{
    phone.nextElementSibling.style.display = "none";
    phone.style.border = "1px solid transparent";
  }
  if (!password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) || password.value == "") {
    password.nextElementSibling.style.display = "block";
    password.style.border = "1px solid #f00";
    return false
  }else{
    password.nextElementSibling.style.display = "none";
    password.style.border = "1px solid transparent";
  }
  var objData={
      userName:userName.value,
      userEmail:email.value,
      userPhone:phone.value,
      userPassword:password.value
  }
  registerData.push(objData)
  localStorage.setItem("registerData", JSON.stringify(registerData))
  console.log(registerData)
  
}
function searchEmail(){
  var user=registerData.find(item=>item.userEmail==email.value)
  if(user){
  return true;
}
  console.log(user)
}
