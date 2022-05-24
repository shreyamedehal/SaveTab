let myLinks = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")

//get the links from local storage 
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

//even if we refresh links are intact on the page
if(linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLinks=[]
    render(myLinks)
})

inputbtn.addEventListener("click", function () {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    //save links to local storage 
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
    //verify
    //console.log(localStorage.getItem("myLinks"))
})

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems +=
            `<li>
            <a target='_blank' href='${links[i]}'> 
                ${links[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

