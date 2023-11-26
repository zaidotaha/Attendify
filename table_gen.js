
document.getElementById("form_add_student").addEventListener("click", add_student);
document.getElementById("form_add_feedback").addEventListener("click", add_feedback);
document.getElementById("form_add_task").addEventListener("click", add_tasks);
document.getElementById("form_edit_student").addEventListener("click", edit_modal_box);

document.addEventListener('DOMContentLoaded', ()=> { 
    // window.alert("hi");
    if(localStorage.length == 0) {
        func2(); generateTable();
    }
    else{
        generateTable();
    }
});

function add_student(){
        student_name = document.getElementById("input_student_name").value;
        solved_tasks = document.getElementById("input_solved_tasks").value;
        absences = document.getElementById("input_absences").value;
        // retrieving new ID from trainer student object and updating its array
        currEmail = localStorage.getItem("current_user");
        // creating new student object
        let new_ID = increment_trainer_student(currEmail);
        newStudentObj = {
            "ID": new_ID,
            "name": student_name,
            "solved_tasks": solved_tasks,
            "absences": absences
        };
        localStorage.setItem("student-"+new_ID, JSON.stringify(newStudentObj));
        // clear input (why doesn't it clear by itself???)
        document.getElementById("input_student_name").value = "";
        document.getElementById("input_solved_tasks").value = "";
        document.getElementById("input_absences").value = "";
        // following command automatically closes after adding
        // document.getElementById("myModal").style.display = "none";
        table_update("student-"+new_ID);
}


function increment_trainer_student(email){
    trainer_students_obj = JSON.parse(localStorage.getItem("students-"+email));
    console.log(trainer_students_obj);
    let new_ID = trainer_students_obj.GennedIDs + 1;
    trainer_students_obj.GennedIDs += 1;
    trainer_students_obj.IDs.push(new_ID);
    localStorage.setItem("students-"+email,JSON.stringify(trainer_students_obj));
    return new_ID;
}

function decrement_trainer_student(email,ID){
    trainer_students_obj = JSON.parse(localStorage.getItem("students-"+email));
    console.log(trainer_students_obj);
    trainer_students_obj.GennedIDs -= 1;
    arr = trainer_students_obj.IDs;
    console.log(arr);
    newarr = arr.filter(function (n) {
        return n != ID;
    });
    console.log(newarr);
    trainer_students_obj.IDs = newarr;
    localStorage.setItem("students-"+email,JSON.stringify(trainer_students_obj));
    location.reload();
}

function generateTable(){
    currEmail = localStorage.getItem("current_user");
    trainer_students_obj = JSON.parse(localStorage.getItem("students-"+currEmail));
    console.log(trainer_students_obj);
    let row_nums = trainer_students_obj.GennedIDs;
    let student_array = trainer_students_obj.IDs;
    let total_tasks = trainer_students_obj.Total_tasks;
    console.log(row_nums);
    console.log(total_tasks);
    if(row_nums==0){
        document.getElementById("empty-row").style.display = "table-row";
    }
    else{
        for(let j = 0 ; j < row_nums - 1 ; j++){
            student_obj = JSON.parse(localStorage.getItem("student-"+String(student_array[j]))); 
            let data = [student_obj.ID, student_obj.name, student_obj.solved_tasks,total_tasks,student_obj.absences,""];
            table = document.getElementById("table");
            let new_row = table.insertRow(j+1);
            let column = [];
            for(let i = 0 ; i < 6 ; i++){
                column[i] = new_row.insertCell(i);
                column[i].innerHTML = data[i];
            }
            column[0].classList.add("corner1");
            column[5].classList.add("corner2"); 
            column[3].classList.add = "tasks_column";
            new_row.cells[2].appendChild(generate_plus_icon());
            new_row.cells[5].appendChild(generate_edit_delete_icon());
            new_row.cells[5].classList.add("edit-delete-student-class");
            new_row.cells[2].classList.add("third-item");
            document.getElementsByClassName("add-task-class")[j].addEventListener("click",() => Add_Solved_Task(j));
            document.getElementsByClassName("edit-icon")[j].addEventListener("click",() => Edit_Student(j));
            document.getElementsByClassName("delete-icon")[j].addEventListener("click",() => Delete_Student(j));
        }
        student_obj = JSON.parse(localStorage.getItem("student-"+String(student_array[row_nums-1]))); 
        console.log(student_obj);
        let data = [student_obj.ID, student_obj.name, student_obj.solved_tasks,total_tasks,student_obj.absences,""];
        console.log(data);
        table = document.getElementById("table");
        let bottom_row = table.insertRow(row_nums);
        bottom_row.id = "bottom-row";
        let column = [];
        for(let i = 0 ; i < 6 ; i++){
            column[i] = bottom_row.insertCell(i);
            column[i].innerHTML = data[i];
        }
        column[0].classList.add("corner1");
        column[5].classList.add("corner2");     
        column[3].classList.add = "tasks_column";
        bottom_row.cells[2].appendChild(generate_plus_icon());
        bottom_row.cells[5].appendChild(generate_edit_delete_icon());
        bottom_row.cells[5].classList.add("edit-delete-student-class");
        bottom_row.cells[2].classList.add("third-item");
        document.getElementsByClassName("add-task-class")[row_nums-1].addEventListener("click",() => Add_Solved_Task(row_nums-1));
        document.getElementsByClassName("edit-icon")[row_nums-1].addEventListener("click",() => Edit_Student(row_nums-1));
        document.getElementsByClassName("delete-icon")[row_nums-1].addEventListener("click",() => Delete_Student(row_nums-1));
    }
}

function table_update(student_key){
    student_obj = JSON.parse(localStorage.getItem(student_key));
    
    currEmail = localStorage.getItem("current_user");
    trainer_students_obj = JSON.parse(localStorage.getItem("students-"+currEmail));
    let total_tasks = trainer_students_obj.Total_tasks;
    let data = [student_obj.ID, student_obj.name, student_obj.solved_tasks,total_tasks,student_obj.absences,""];
    let row_nums = trainer_students_obj.GennedIDs;
    if(row_nums==1){
        document.getElementById("empty-row").style.display = "none";
        table = document.getElementById("table");
        let bottom_row = table.insertRow(1);
        bottom_row.id = "bottom-row";
        let column = [];
        for(let i = 0 ; i < 6 ; i++){
            column[i] = bottom_row.insertCell(i);
            column[i].innerHTML = data[i];   
        }
        column[0].classList.add("corner1");
        column[5].classList.add("corner2"); 
        column[3].classList.add = "tasks_column";
        bottom_row.cells[2].appendChild(generate_plus_icon());
        bottom_row.cells[5].appendChild(generate_edit_delete_icon());
        bottom_row.cells[5].classList.add("edit-delete-student-class");
        bottom_row.cells[2].classList.add("third-item");
        document.getElementsByClassName("add-task-class")[0].addEventListener("click",() => Add_Solved_Task(0));
        document.getElementsByClassName("edit-icon")[0].addEventListener("click",() => Edit_Student(0));
        document.getElementsByClassName("delete-icon")[0].addEventListener("click",() => Delete_Student(0));
    }
    else{
        table = document.getElementById("table");
        console.log(row_nums-1);
        table.rows[row_nums-1].cells[0].classList.remove('corner1');
        table.rows[row_nums-1].cells[5].classList.remove('corner2');
        // the next two lines are necessary for some odd reasons
        table.rows[row_nums-1].style.paddingTop = "11px";
        table.rows[row_nums-1].style.paddingTop = "12px";
        let new_row = table.insertRow(row_nums);
        new_row.id = "bottom-row";
        let column = [];
        for(let i = 0 ; i < 6 ; i++){
            column[i] = new_row.insertCell(i);
            column[i].innerHTML = data[i];
        }
        column[0].classList.add("corner1");
        column[5].classList.add("corner2");
        column[3].classList.add = "tasks_column";
        new_row.cells[2].appendChild(generate_plus_icon());
        new_row.cells[5].appendChild(generate_edit_delete_icon());
        new_row.cells[5].classList.add("edit-delete-student-class");
        new_row.cells[2].classList.add("third-item");
        document.getElementsByClassName("add-task-class")[row_nums-1].addEventListener("click", () => Add_Solved_Task(row_nums-1));
        document.getElementsByClassName("edit-icon")[row_nums-1].addEventListener("click",() => Edit_Student(row_nums-1));
        document.getElementsByClassName("delete-icon")[row_nums-1].addEventListener("click",() => Delete_Student(row_nums-1));

    }
}

function generate_plus_icon(){
    
    div = document.createElement("div");
    i = document.createElement("i");
    i.classList.add("fa-solid"); i.classList.add("fa-circle-plus"); i.classList.add("add-task-class");
    div.appendChild(i);
    return div;
}

function generate_edit_delete_icon(){
    
    div = document.createElement("div");
    i = document.createElement("i");
    i.classList.add("fa-solid"); i.classList.add("fa-pen-to-square"); i.classList.add("orange-hover"); i.classList.add("edit-icon");
    div.appendChild(i);
    i = document.createElement("i");
    i.classList.add("fa-solid"); i.classList.add("fa-trash"); i.classList.add("red-hover");  i.classList.add("delete-icon");
    div.appendChild(i);
    return div;
}

 

function add_feedback(){
    student_name = document.getElementById("student_list_dropdown").value;
    Feedback = document.getElementById("input_feedback_text").value;
    console.log(Feedback);
    
    currEmail = localStorage.getItem("current_user");
    // creating new student object
    let new_ID = increment_trainer_feedback(currEmail);
    currentDate = new Date();
    day = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
    today = day+" "+month+" "+year;
    newFeedbackObj = {
        "FeedbackID": new_ID,
        "name": student_name,
        "Date": today,
        "Feedback": Feedback
    };
    localStorage.setItem("feedback-"+new_ID, JSON.stringify(newFeedbackObj));
    // clear input (why doesn't it clear by itself???)
    document.getElementById("student_list_dropdown").value = "";
    document.getElementById("input_feedback_text").value = "";
    // following command automatically closes after adding
    // document.getElementById("myModal3").style.display = "none";
}

function increment_trainer_feedback(email){
    trainer_feedback_obj = JSON.parse(localStorage.getItem("feedback-"+email));
    // console.log(trainer_students_obj);
    let new_ID = trainer_feedback_obj.GennedFeedbacks + 1;
    trainer_feedback_obj.GennedFeedbacks += 1;
    trainer_feedback_obj.FeedbackIDs.push(new_ID);
    localStorage.setItem("feedback-"+email,JSON.stringify(trainer_feedback_obj));
    return new_ID;
}

function add_tasks(){
    tasks = document.getElementById("input_tasks_added").value;
    currEmail = localStorage.getItem("current_user");
    trainer_students_obj = JSON.parse(localStorage.getItem("students-"+currEmail)); 

    console.log(tasks);
    console.log(trainer_students_obj.Total_tasks);

    tasks = Number(trainer_students_obj.Total_tasks) + Number(tasks);
    console.log(tasks);
    trainer_students_obj.Total_tasks = tasks;

    localStorage.setItem("students-"+currEmail, JSON.stringify(trainer_students_obj));
    console.log(JSON.parse(localStorage.getItem("students-"+currEmail)));
    
    table = document.getElementById("table");
    length = table.rows.length;
    console.log(length);
    for(let i = 1 ; i <  length-1 ; i++){
        table.rows[i].cells[3].innerHTML = tasks;
    }
    document.getElementById("input_tasks_added").value = "";
    document.getElementById("myModal2").style.display = "none";
}