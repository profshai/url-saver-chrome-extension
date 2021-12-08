

let myLeads = []

// We get the various HTML elements using their IDs
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
// JSON.parse to turn string array into a JavaScript array
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// When there is a click event on the tab button
tabBtn.addEventListener("click", function() {

    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
      // Grabing the url from a website
        myLeads.push(tabs[0].url)
        // Saving to the local storage so data doesn't disappear after refresh
        // We used stringify to turn the array data into a string
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

// We want the function to be resuable by passing it a parameter
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
      // We used template strings
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// When there is a double tab event on the delete button
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// When there is a click event on the input button
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
