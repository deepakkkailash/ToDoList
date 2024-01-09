import { navbar } from './navbar.js'
 const descriptionDisp = ()=>{
    let des = document.getElementById("MainDes");
    des.style.opacity = "1";

 }
 
 function animationStuff(){
   let panda = document.getElementById("HomePanda")

   panda.addEventListener("animationend",(e)=>{
  
      descriptionDisp();
   })
  
}





document.addEventListener("DOMContentLoaded",()=>{
      animationStuff();
      navbar();
   })


