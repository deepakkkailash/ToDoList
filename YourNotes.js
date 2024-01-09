
import { navbar } from './navbar.js'
const urlsearch = new URLSearchParams(window.location.search);
const token = urlsearch.get("token");
console.log(token);

let jobs = new Map();

const setHead = ()=>{
    let head = document.getElementById('headInp');
    head.addEventListener("keypress",(event)=>{
        if(event.key==="Enter"){
            let newHead = document.createElement("h1");
            newHead.id = head.id;
            newHead.innerText = head.value;
       
            newHead.style.fontWeight = "bolder";
            newHead.style.textAlign = "center";
            head.parentNode.replaceChild(newHead,head);


        }
    })
}


const addStuff = ()=>{
    let count=1;
    let btn = document.getElementById("AddToDo")

    btn.addEventListener("click",(event)=>{
    
        event.preventDefault()
        let div = document.createElement("div");
        div.className = "Atodo"
        
    
        let inp = document.createElement("input");
        inp.name = `todoNo${count}`
        inp.style.padding = "20px";

        inp.style.borderRadius = "12px"
        inp.id = `todoNo${count}`

        let done = document.createElement("button");
        done.innerText = "Done";
        done.style.padding = "20px";
        done.style.backgroundColor = "green";
        done.style.width = "20%";
        done.id = `DonefortodoNo${count}`
        done.style.borderRadius = "12px";
        done.addEventListener("click",(event)=>{
           DoneClick(event);
        });
        inp.addEventListener("keypress",(event)=>{
            if(event.key=='Enter'){
              DoneInput(event);
            }
        })
        let form = document.getElementById("Notesection");
        div.append(inp);
        div.append(done);
        form.append(div);
        console.log(btn.style.top)

        count+=1;

    })
}


var count=1;
function createElem( value,state){
    if(value==="loglevel"){
        null
    }
    else{
        
        let notesection = document.getElementById("Notesection");
        let div = document.createElement("div");
        div.className = "Atodo";
        let newDiv = document.createElement("div");
        let done = document.createElement("button");
        done.innerText = "Done";
        done.style.padding = "20px";
        done.style.backgroundColor = "green";
        done.style.width = "20%";
        done.style.borderRadius = "12px";
        done.addEventListener("click",(event)=>{
           DoneClick(event);
        });
    
        newDiv.innerHTML = `<strong>${value}</strong>`
        newDiv.style.border = '2px solid Black';
        newDiv.style.padding = "20px";
        newDiv.style.borderRadius="12px";
        newDiv.style.backgroundColor = "orange";
        newDiv.style.transform = "skew(20deg)";
        newDiv.style.transition = 'transform 1s ease-in '
        newDiv.id=`todoNo${count}`
        done.id = `DoneForToDo${count}`
        if(state==="Done"){
            newDiv.style.textDecoration = "line-through";
        }
        div.append(newDiv)
        div.append(done)
    
        notesection.append(div);
        count+=1;

    }
    
  

}
const DoneInput = (event)=>{
    
    let old = event.target;
    let value = old.value;
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<strong>${value}</strong>`
    jobs.set(value,"Pending");
    newDiv.style.border = '2px solid Black';
    newDiv.style.padding = "20px";
    newDiv.style.borderRadius="12px";
    newDiv.style.backgroundColor = "orange";
    newDiv.style.transform = "skew(20deg)";
    newDiv.style.transition = 'transform 1s ease-in '
    newDiv.id = old.id;
    newDiv.name = old.name;
    old.style.display = "None"; 
    old.parentNode.replaceChild(newDiv,old);
   

}
const DoneClick = (event)=>{
    let id= event.target.id[event.target.id.length-1];
    let targetelem = document.getElementById(`todoNo${id}`);
    jobs.set(targetelem.innerText,"Done");
    targetelem.style.textDecoration = "line-through";

}

const closesesh = ()=>{
    let close = document.getElementById("done");

    close.addEventListener("click",()=>{
        for(var [job,state] of jobs.entries()){
            localStorage.setItem(job,state);
        }
        localStorage.setItem("Head",document.getElementById("headInp").innerText)
    })
    
  
}

const localStorageRetrieval = ()=>{
    const items = {...localStorage};

    for(const key in items){
        if(key!="Head"){
            
            createElem(key,items[key])
        }
        else{   
            let recoveredHeading = document.createElement("h1");
            recoveredHeading.innerHTML =`<strong>${items[key]}</strong`
            recoveredHeading.style.fontWeight = "bolder";
            recoveredHeading.style.textAlign = "center";
            document.getElementById("headInp").parentElement.replaceChild(recoveredHeading,document.getElementById("headInp")) 
        }
       
    }
    

}

document.addEventListener("DOMContentLoaded",()=>{
    navbar();
    addStuff();
    setHead();
    closesesh()
    localStorageRetrieval();


    
})


