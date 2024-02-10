//initializeApp function I imported them from the firebase-app module and I used them to initialize a firebase app with configuration settings.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// imported these functions from the firebase-database module and I used them for interacting with the Firebase Realtime Database.
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//specifying the URL of the Firebase Realtime Database for a Firebase app. This URL is for initializing the Firebase app with the correct database configuration. 
const appSettings = {
    databaseURL: "https://gggg-2164a-default-rtdb.europe-west1.firebasedatabase.app/"
}

// Initializes a firebase app with the configuration settings provided in the appSettings object.
const app = initializeApp(appSettings)
//Obtains a reference to the firebase Realtime Database associated with the initialized app.
const database = getDatabase(app)
// it create a reference (shoppingListInDB) to the "shoppingList" path in the firebase Realtime Database.
const shoppingListInDB = ref(database, "shoppingList")

// we need add the HTML element representation that have the ID "input-field.", this element is an input field where users can enter items to add to a shopping list.
const inputFieldEl = document.getElementById("input-field")
//also here we need the HTML element with the ID "add-button.", this element is a button that users can click to add the item entered in the input field to the shopping list.
const addButtonEl = document.getElementById("add-button")
// even here we add the HTML element that has ID "shopping-list.", this element is a container where the shopping list items will be displayed.
const shoppingListEl = document.getElementById("shopping-list")

// when the button (addButtonEl) is clicked, the code grabs the value from an input field, pushes it to a specific location in the Firebase Realtime Database (shoppingListInDB), and then clears the input field for the next entry.
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

// the code listens for changes in the specified Firebase Realtime Database reference, processes the data if it exists, and updates the shopping list element accordingly. If no data exists, it displays a message indicating the absence of items "No items listed...yet.
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items listed... yet"
    }
})


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {  //add a new list item to a shopping list in the HTML document.
    let itemID = item[0]       // item to be added to the shopping list. It is assumed to have two elements: item[0] for the item ID and item[1] for the item value.
    let itemValue = item[1]
    
    let newEl = document.createElement("li")  // The function creates a new list item element (<li>)
    
    newEl.textContent = itemValue   // set the text content of the newly created list item to the value of item[1] (the item's value).
    
    newEl.addEventListener("click", function() {    //An event listener is added to the new list item. When the list item is clicked, the listener is triggered.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)  //append the new list item to the shopping list element (shoppingListEl).
}




//All in all whatever I did here is recorded in my Firebase Realtime Database, we linked my js with Firebase.