
export function navbar(){
    let navbarcontent = document.getElementsByClassName("NavbarItem");
 
    let navbarcontentarr = Array.from(navbarcontent)
 
 
    for(let v of navbarcontentarr){
       v.addEventListener("click",()=>{
          switch(v.id){
             case "Home":
                   window.open("index.html");
                   break;
             case "Login":
                   window.open("Login.html");
                   break;
             case "YourNotes":
                   window.open("YourNotes.html");
                   break;
             case "Friends":
                   window.open("Friends.html");
                   break;
             case "ProgressPro":
                   console.log("1");
                   break;
          }
       })
       
    }
 }