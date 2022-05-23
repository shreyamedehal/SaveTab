let myLeads = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")

//get the leads from local storage 
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//even if we refresh leads are intact on the page
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

//listen to the double clicks on the delete btn
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads) //because myLeads is an empty array
})

inputbtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    //save leads to local storage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    //verify
    //console.log(localStorage.getItem("myLeads"))
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems +=
            `<li>
            <a target='_blank' href='${leads[i]}'> 
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}
