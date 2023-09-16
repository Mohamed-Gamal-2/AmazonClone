var userData=localStorage.getItem("registerData")
var userDataParsed=JSON.parse(userData)
emailRE = /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/ig
phoneRE = /01(0|1|2|5)[0-9]{8}/ig


submitBtn = document.getElementById("continueBtn")

document.getElementById("EOM").addEventListener("focus",()=>{
    document.getElementById("errorMsg").style.display = "none"
    document.getElementById("incorrectMsg").style.display="none"
})

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault()
    let istrue = function(){
        for(i=0 ; i<userDataParsed.length ; i++){
            if (userDataParsed[i].userEmail == document.getElementById("EOM").value || userDataParsed[i].userPhone == document.getElementById("EOM").value){
                localStorage.setItem("userEmailOrPhone",document.getElementById("EOM").value)
                return true
            } 
        }

    }
    if(document.getElementById("EOM").value == ""){
        document.getElementById("errorMsg").style.display = "block"
    }else if ((emailRE.test(document.getElementById("EOM").value) && istrue()) || (phoneRE.test(document.getElementById("EOM").value) && istrue()) ){
        document.getElementById("signinForm").submit()
    }else{
        if (isNaN(+document.getElementById("EOM").value)){           
            document.getElementById("incorrectMsg").innerHTML =`
            <img src="./images/warning.png" alt="Warning" class="warningImg">
            <div class="incorrectMsgHead">There was a problem</div>
            <div class="incorrectMsgBody">We cannot find an account with that email address.</div>`
            document.getElementById("incorrectMsg").style.display="block"
        }else{
            document.getElementById("incorrectMsg").innerHTML =`
            <img src="./images/warning.png" alt="Warning" class="warningImg">
            <div class="incorrectMsgHead">Incorrect phone number</div>
            <div class="incorrectMsgBody">The phone number you entered cannot be used to sign in. Please check that the number you entered is correct or sign in with your email instead.</div>`
            document.getElementById("incorrectMsg").style.display="block"
        }
    }

})
