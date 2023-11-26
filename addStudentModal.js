
var modal = document.getElementById("myModal"); 

var btn = document.getElementById("add_student");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "flex";
  
  modal.style.justifyContent = "center";
  modal.style.align = "center";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal){
    modal.style.display = "none";
  }
  else if(event.target == modal2){
    modal2.style.display = "none";
  }
  else if(event.target == modal3){
    modal3.style.display = "none";
  }
  else if(event.target == modal4){
    modal4.style.display = "none";
    document.getElementById("std_key").value = "";
  }
}

var modal2 = document.getElementById("myModal2"); 

var btn2 = document.getElementById("add_tasks");

var span2 = document.getElementsByClassName("close")[1];

btn2.onclick = function() {
  modal2.style.display = "flex";   
  
  modal2.style.justifyContent = "center";
  modal2.style.align = "center";
}

span2.onclick = function() {
  modal2.style.display = "none";
}


var modal3 = document.getElementById("myModal3"); 

var btn3 = document.getElementById("add_feedback");

var span3 = document.getElementsByClassName("close")[2];

btn3.onclick = function() {
  modal3.style.display = "flex";   
  
  modal3.style.justifyContent = "center";
  modal3.style.align = "center";
  generatestudentlist();
}

span3.onclick = function() {
  modal3.style.display = "none";
}



function generatestudentlist(){
  email = localStorage.getItem("current_user");
  drop_down_list = document.getElementById("student_list_dropdown");
  drop_down_list.innerHTML = "";
  student_array = JSON.parse(localStorage.getItem("students-"+email)).IDs;
  for(ID in student_array){
    console.log(typeof ID);
    studentName = JSON.parse(localStorage.getItem("student-"+String(Number(ID)+1))).name;
    new_option = document.createElement("option");
    new_option.text = studentName;
    drop_down_list.add(new_option,drop_down_list[-1]);
  }
}

var modal4 = document.getElementById("myModal4");

var span4 = document.getElementsByClassName("close")[3];

span4.onclick = function() {
  modal4.style.display = "none";
  document.getElementById("std_key").value = "";
  document.getElementById("row").value = "";
}


function Add_Solved_Task(x){
  table = document.getElementById("table");
  ID = table.rows[x+1].cells[0].innerHTML;
  student_obj = JSON.parse(localStorage.getItem("student-"+ID));
  console.log(student_obj);
  student_obj.solved_tasks = Number(student_obj.solved_tasks)+Number(1);
  localStorage.setItem("student-"+ID, JSON.stringify(student_obj));
  table.rows[x+1].cells[2].innerHTML = student_obj.solved_tasks;
  table.rows[x+1].cells[2].appendChild(generate_plus_icon());
  document.getElementsByClassName("add-task-class")[x].addEventListener("click", () => Add_Solved_Task(x));
}  

function Delete_Student(x){
  table = document.getElementById("table");
  ID = table.rows[x+1].cells[0].innerHTML;
  localStorage.removeItem("student-"+ID);
  decrement_trainer_student(localStorage.getItem("current_user"),ID);

}  




function Edit_Student(x){
  modal4.style.display = "flex";   
  modal4.style.justifyContent = "center";
  modal4.style.align = "center";

  table = document.getElementById("table");
  ID = table.rows[x+1].cells[0].innerHTML;
  student_key = "student-"+ID;
  document.getElementById("std_key").value = student_key;
  document.getElementById("row").value = x+1;

  student_obj = JSON.parse(localStorage.getItem(student_key));
  document.getElementById("input_student_name_edit").value = student_obj.name;
  document.getElementById("input_solved_tasks_edit").value = student_obj.solved_tasks;
  document.getElementById("input_absences_edit").value = student_obj.absences;

} 

function edit_modal_box() {
  student_key = document.getElementById("std_key").value;
  x = document.getElementById("row").value;
  student_name = document.getElementById("input_student_name_edit").value;
  solved_tasks = document.getElementById("input_solved_tasks_edit").value;
  absences = document.getElementById("input_absences_edit").value;

  student_obj = JSON.parse(localStorage.getItem(student_key));
  student_obj.name = student_name;
  student_obj.solved_tasks = solved_tasks;
  student_obj.absences = absences;
  localStorage.setItem(student_key,JSON.stringify(student_obj));
  
  document.getElementById("input_student_name_edit").value = "";
  document.getElementById("input_solved_tasks_edit").value = "";
  document.getElementById("input_absences_edit").value = "";

  document.getElementById("table");
  table.rows[x].cells[1].innerHTML = student_name;
  table.rows[x].cells[2].innerHTML = solved_tasks;
  table.rows[x].cells[2].appendChild(generate_plus_icon());
  document.getElementsByClassName("add-task-class")[x-1].addEventListener("click", () => Add_Solved_Task(x-1));
  table.rows[x].cells[4].innerHTML = absences;

  document.getElementById("myModal4").style.display = "none";

}

