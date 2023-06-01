const mobile_nav=document.querySelector(".mobile-nav")  
const header_nav=document.querySelector(".header")    
const Api_key="854575d654ff4fa1aae72f9475d7532a"  
const url="https://newsapi.org/v2/everything?q="   
const searcher=document.getElementById("searcher")

window.addEventListener("load",()=> fetchnews("home"))
async function fetchnews(query){ 
   const res =await fetch(`${url}${query}&apikey=${Api_key}`) 
   const data= await res.json()  
   console.log("this is res "+res)  
   binddata(data.articles)
}
 
function binddata(articles) {   
   console.log(articles)  
   
   const mainholder=document.getElementById("cardskabaap")  
   const template=document.getElementById("card")  
   mainholder.innerHTML=""
   articles.forEach(article => {
      if(!article.urlToImage) return  
      const cardClone= template.content.cloneNode(true)    
      filldataincard(cardClone,article)
      mainholder.appendChild(cardClone)
   });  
}   


function  filldataincard(cardClone,article){ 
      const img= cardClone.querySelector("#news-img")
      const head= cardClone.querySelector("#head")
      const des= cardClone.querySelector("#des")
      const by= cardClone.querySelector("#by")  

      img.src=article.urlToImage  
      head.innerHTML=article.title   
      des.innerHTML=article.description  
      by.innerHTML="-By " + article.source.name  
      cardClone.firstElementChild.addEventListener("click",()=>{ 
         window.open(article.url,"_blank")
      })
 }
let current=document.getElementById("home")   
current.classList.add("activenav")
 function onNavItenClick(id){    
   if(searcher.value!="") { 
      searcher.value=""
   } 
   fetchnews(id)  
   const blue=document.getElementById(id)   
   current?.classList.remove("activenav")  
   current=blue
   current.classList.add("activenav")
 }

 function logInputValue() {   
   current?.classList.remove("activenav")   
   if(searcher.value== "") { 
      fetchnews("home")
   }
   fetchnews(searcher.value)
   console.log(searcher.value);
 }





 const tooglenavbar=()=>{ 
    console.log("working.........")  
    header_nav.classList.toggle("active")
 }

mobile_nav.addEventListener("click" ,()=> tooglenavbar())
