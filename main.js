const bookDialog = document.getElementById('book-dialog')
const newBookBtn = document.getElementById('new-book-btn')
const cardsContainer = document.getElementById('cards-container');
const submitBtn = document.getElementById('submit-btn')
const newTitle = document.getElementById('title')
const newAuthor = document.getElementById('author')
const newPages = document.getElementById('pages')
const newHaveRead = document.getElementById('read')
const form = document.querySelector('form')
const closeDialogBtn =document.getElementById('close-dialog')
const formError = document.getElementById('form-error')

//Books array
const myLibrary=[];

//Default books in array 
let book1 = new book ("Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", 416, true)
let book2 = new book ("Sea of Tranquility", "Emily St. John Mandel", 272, false)
let book3 = new book ("Klara and the Sun", "Kazuo Ishiguro", 320, true)
myLibrary.push(book1, book2, book3)

//Open New Book dialog
newBookBtn.addEventListener("click",()=>{
  bookDialog.showModal()
})

// Close diaglog without sumbitting form data
closeDialogBtn.addEventListener("click", (e) =>{
  form.reset()
  bookDialog.close()
})

//Prevent default form submition and instead, add new book info to myLibrary
submitBtn.addEventListener("click", (e) =>{
    if (newAuthor.value =="" || newTitle.value =="" || newPages.value=="") {
        e.preventDefault()
        formError.innerText = "*Please complete all fields above"
      }
    
      else {
        e.preventDefault()
        let nextBook = new book(newTitle.value, newAuthor.value, newPages.value, newHaveRead.checked);
        form.reset()
        bookDialog.close()
        myLibrary.push(nextBook)
        displayBooks(myLibrary)
      }
    });



//Book constructor function 
function book (title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead
    this.info = function() { 
      return `By ${this.author}\n ${this.pages} pages`
    
  }}


//Add toggle read/unread function to book prototype 
  book.prototype.toggleRead = function () {
    if (this.haveRead == true) this.haveRead = false
    else if (this.haveRead == false) this.haveRead = true
  }



//Display book cards onscreen
  function displayBooks(myLibrary) {

    //prevent duplication of cards when using submitBtn
    while(cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild)
    }

    //assign a card to each book currently in myLibrary
    for (let i=0; i<myLibrary.length; i++){

      const card = document.createElement('div');
      card.classList.add('card');
      cardsContainer.append(card); 

      const deleteContainer = document.createElement('div')
      deleteContainer.classList.add('del-close-container')
      deleteContainer.dataset.indexNumber = [i]
      card.append(deleteContainer)

      const bookImg = document.createElement('img')
      bookImg.classList.add('bookImg')
      bookImg.src ="./images/noun-read-4862547.png"
      deleteContainer.append(bookImg)

      const deleteBtn = document.createElement('button')
      deleteBtn.classList.add('deleteBtns')
      deleteBtn.innerText = "x";
      deleteContainer.append(deleteBtn) 
      
      const textContainer = document.createElement('div');
      textContainer.classList.add('textContainer');
      card.append(textContainer);

      const titleText = document.createElement('h3');
      titleText.classList.add('card-text');
      titleText.innerText = myLibrary[i].title
      textContainer.append(titleText);

      const authorText = document.createElement('p');
      authorText.classList.add('card-text');
      authorText.classList.add('author')
      authorText.innerText = myLibrary[i].author
      textContainer.append(authorText);

      const infoText = document.createElement('p');
      infoText.classList.add('card-text');
      infoText.innerText = myLibrary[i].pages + " pages"
      textContainer.append(infoText);

      const haveReadBtn = document.createElement('button') 
      haveReadBtn.classList.add('haveReadBtns')
      haveReadBtn.dataset.indexNumber = [i]
      card.append(haveReadBtn)

      if (myLibrary[i].haveRead==true) {
        haveReadBtn.innerText = "Read"
        haveReadBtn.style.backgroundColor = "#F4EAE0"
      }
      else {
        haveReadBtn.innerText = "Unread";  
        haveReadBtn.style.color = " #F4EAE0"
        haveReadBtn.style.backgroundColor = "#333333"
        
      }     
    }
  }

  displayBooks(myLibrary);


//Delete book from library
cardsContainer.addEventListener('click', (e) => {
  if (e.target.classList=='deleteBtns') {  
  let cardIndex = e.target.getAttribute('data-index-number')
    myLibrary.splice(cardIndex, 1)
    displayBooks(myLibrary)
  } 
 })

//toggle read/unread for books in the library
cardsContainer.addEventListener('click', (e) => {
  if (e.target.classList=='haveReadBtns') { 
    let cardIndex = e.target.getAttribute('data-index-number')
    myLibrary[cardIndex].toggleRead() 
    displayBooks(myLibrary)
}})
