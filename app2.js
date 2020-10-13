
   
console.log("Welcome to notes app. This is app.js");
showNotes();


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";

  showNotes();
});


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    let col;
      if(localStorage.getItem("color")==null)
       { 
            col=[];
       }
       else{

        col=JSON.parse(localStorage.getItem("color"));
       }
    // console.log(col)
  notesObj.forEach(function(element, index) {
            html += `
                    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                            <div class="card-body">
                            
                                
                                <h5 class="card-title">Note ${index + 1}</h5>
                                <i  id= ${index} class="fa fa-heart"  onclick="addFav(this.id)" style="font-size:30px;color:	${col[index]};"></i>
                               

                                
                                <p class="card-text"> ${element}</p>
                                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                            </div>
                        </div>`;
  });
        let notesElm = document.getElementById("notes");
        if (notesObj.length != 0) {
          notesElm.innerHTML = html;
        } else {
          notesElm.innerHTML =`No Notes Added`;
        }





        let color=JSON.parse(localStorage.getItem("color"));

        
      
      
      
      }


// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  let col=localStorage.getItem("color");
  if(col==null)
  {
    colo=[];
  }
  else
  {
    colo=JSON.parse(col);
  }
  colo.splice(index, 1);
  localStorage.setItem("color",JSON.stringify(colo))
 
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        
    })
})


function addFav(ind)
{
 
  let fav =document.querySelectorAll('i');
  let color=[];

  fav.forEach(function(element,index){
      
      
  if(index==ind){
    // console.log(ind,index)
    // console.log(element.style.color)
    if(element.style.color!="rgb(255, 0, 0)")
    { 
      console.log("red");
       element.style.color="#FF0000";

    }
    else
    {
      element.style.color="#000000";
  //  console.log("yellow");

    }

  }

  color.push(element.style.color);
 
   


  })

  localStorage.setItem("color",JSON.stringify(color));


 }



/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 