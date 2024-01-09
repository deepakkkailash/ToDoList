

import {navbar} from "./navbar.js"

let TargetForm = null
function eventListeners(){
    window.addEventListener("load",()=>{
            let formdivs = document.getElementsByClassName("LoginPageDiv");
            for(let formdiv of Array.from(formdivs)){
                formdiv.style.opacity = 1;
            }
        })
    let buttons = document.getElementsByClassName("LoginPageButton");
    for(let but of Array.from(buttons)){
        but.addEventListener("click",()=>{
            but.style.display = "None";
            switch(but.id){
                case "log":
                
                    TargetForm = document.getElementById("LoginForm")
                    break;
                case "sign":
                    TargetForm = document.getElementById("SignupForm")
                    break;
            }
            TargetForm.style.display = "Flex"
            TargetForm.style.opacity = 1
            SendPost(TargetForm);
        })
       
    }
}

function SendPost(TargetForm){
    TargetForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        let formdata = new FormData(TargetForm)
        console.log(formdata);
        formdata.forEach((value,key)=>{
            console.log(value,key)
        })
        const jsonObject = {}
        formdata.forEach((value,key)=>{
            jsonObject[key]= value;
        })
        if(TargetForm.id=='LoginForm'){
            fetch(`https://unh4ct2nt0.execute-api.us-east-1.amazonaws.com/dev/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(jsonObject)
            }).then((response)=>response.json(),(err)=>{
                console.error("err")
            }).then((data)=>{
                let body = data.body;
                const parsedbody = JSON.parse(data.body);

                if(parsedbody.DataNotFound===true){
                    window.alert("Account doesnt exist! ")
                }
                else{
                    if(parsedbody.success===true){
                        window.open(`YourNotes.html?token=${parsedbody.Token}`)
                    }
                    else{
                            window.alert("Wrong password!")
                        }
                }
                
                
            },(err)=>{
                console.error("errr");
            })
        }
        else{
            fetch(`https://unh4ct2nt0.execute-api.us-east-1.amazonaws.com/dev/signup`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(jsonObject)
            }).then((response)=>response.json(),(err)=>{
                console.err("err")
            }).then((data)=>{
                console.log(data);
            })
        }
   
})
}




document.addEventListener("DOMContentLoaded",()=>{
    navbar();

    eventListeners();
})