
document.addEventListener('DOMContentLoaded', ()=> { 
    if(localStorage.length == 0) {
        func2(); generateTable();
    }
    else{
        generateTable();
    }
});

function generateTable(){
    window.alert("hi");
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
            for(let i = 0 ; i < 5 ; i++){
                column[i] = new_row.insertCell(i);
                column[i].innerHTML = data[i];
            }
            column[0].classList.add("corner1");
            column[4].classList.add("corner2"); 
        }
        student_obj = JSON.parse(localStorage.getItem("student-"+String(student_array[row_nums-1]))); 
        console.log(student_obj);
        let data = [student_obj.ID, student_obj.name, student_obj.solved_tasks,total_tasks,student_obj.absences,""];
        console.log(data);
        table = document.getElementById("table");
        let bottom_row = table.insertRow(row_nums);
        bottom_row.id = "bottom-row";
        let column = [];
        for(let i = 0 ; i < 5 ; i++){
            column[i] = bottom_row.insertCell(i);
            column[i].innerHTML = data[i];
        }
        column[0].classList.add("corner1");
        column[4].classList.add("corner2");     
        column[3].classList.add = "tasks_column";
    }
}
