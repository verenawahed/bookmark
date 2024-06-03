var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");

var addBtn = document.getElementById("addBtn");
var tableDate = document.getElementById("tableDate");


var bookmarks;
if(localStorage.getItem("bookmarks") !== null){
    bookmarks=[];
}else{
    bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
    displayBook();
};

    

 

addBtn.onclick=function(){
    if(validationInputs(nameInput , "msgName") ==true &&
    validationInputs(urlInput , "msgurl") ==true       ){
        var bookmark = {
            name: nameInput.value,
            url : urlInput.value,
        };
        bookmarks.push(bookmark);
        
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    displayBook()
    clearData()
    console.log(bookmarks);
    }
    }
    

function displayBook() {
    var marks = ``;
    for( var i=1 ; i < bookmarks.length ; i++){
        marks+=`
        <tr>
        <td>${i}</td>
        <td>${bookmarks[i].name}</td>
         <td><button onclick="visiturl('${bookmarks[i].url}')" class="btn  btn-warning btn-sm ">visit</button></a</td>
        <td> <button  onclick="deleteItem(${i})"class="btn btn-danger btn-sm ">Delete</button> </td>
    </tr>`
    }
    tableDate.innerHTML=marks;
    
}
function visiturl(url) {
        
            window.open(url,'_blank');
            localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
            displayBook()
        
}

function deleteItem(index){
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
displayBook()
}
function clearData(){
    nameInput.value = null;
    urlInput.value = null;

    nameInput.classList.remove('is-valid');
    urlInput.classList.remove('is-valid');
}

function validationInputs(element, msgId){
    var text = element.value;
    var regex = {
        bookmarkName:/^[A-Za-z_]{3,}$/,
        bookmarkURL:/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/,
      
    }
      var msg = document.getElementById(msgId);
    if(regex[element.id].test(text) == true){
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      msg.classList.add('d-none');
      return true;
    }
    else{
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      msg.classList.remove('d-none');
      return false;
    }
  }
