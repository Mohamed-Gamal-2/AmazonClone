var userData=localStorage.getItem("registerData")
var userDataParsed=JSON.parse(userData)

document.getElementById("password").addEventListener("focus",()=>{
    document.getElementById("incorrectMsg").style.display="none"
})

let istrue = function(){
    for(i in userDataParsed){
        if(localStorage.getItem("userEmailOrPhone") == userDataParsed[i].userEmail || localStorage.getItem("userEmailOrPhone") == userDataParsed[i].userPhone) return i
    }
}

document.getElementById("userNameInput").innerHTML = userDataParsed[istrue()].userEmail
var isLogin=false
document.getElementById("SignInBtn").addEventListener("click", (event)=>{
    event.preventDefault()

    if(document.getElementById("password").value == userDataParsed[istrue()].userPassword ){
        document.getElementById("signinForm").submit()
        isLogin=true
        localStorage.setItem("isLogIn",isLogin)
    }else{
        document.getElementById("incorrectMsg").innerHTML =`
        <img src="./images/warning.png" alt="Warning" class="warningImg">
        <div class="incorrectMsgHead">There was a problem</div>
        <div class="incorrectMsgBody">Your password is incorrect.</div>`
        document.getElementById("incorrectMsg").style.display="block"
    }
})
document.getElementById("showPW").addEventListener("change",()=>{
    if(document.getElementById("password").type == "text"){

        document.getElementById("password").type = "password"
    }else document.getElementById("password").type = "text"
})

