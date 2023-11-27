class account{
    constructor(email,fname,lname,password,role="trainer"){
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.role = role;
    }
    
    editAccount(newFname, newLname, newPassword, newRole) {
        if (newFname) {
            this.fname = newFname;
        }
        if (newLname) {
            this.lname = newLname;
        }
        if (newPassword) {
            this.password = newPassword;
        }
        if (newRole) {
            this.role = newRole;
        }
    }
}

class student{
    constructor(std_ID,full_name,solved_tasks=0,absences=0){
        this.std_ID = std_ID;
        this.full_name = full_name;
        this.solved_tasks = solved_tasks;
        this.absences = absences;
    }

    editStudent(newFullName, newSolvedTasks, newAbsences) {
        if (newFullName) {
            this.full_name = newFullName;
        }
        if (newSolvedTasks !== undefined) {
            this.solved_tasks = newSolvedTasks;
        }
        if (newAbsences !== undefined) {
            this.absences = newAbsences;
        }
    }
}


class feedback{
    constructor(feedbackID,student_name,trainer_name,FbDate){
        this.feedbackID = feedbackID;
        this.student_name = student_name;
        this.trainer_name = trainer_name;
        this.Date = FbDate;
    }
}


function newfunc(){
    // create current user, empty, when successfully logging in it changes
    sessionStorage.setItem("current_user","");
    // create array of accounts, create admin login in them
    let admin = new account("admin@email.com","fadmin","ladmin","password","admin");
    accounts = {
        "arr":[],
        "numberOfAccounts": 0
    };
    accounts.arr.push(admin);
    sessionStorage.setItem("accounts",JSON.stringify(accounts));
    // create array of students
    students = {
        "arr":[],
        "numberOfStudents": 0
    }
    sessionStorage.setItem("accounts",JSON.stringify(students));
    // create array of feedback, store in local storage
    feedbacks = {
        "arr":[],
        "numberOfFeedbacks": 0
    }
    sessionStorage.setItem("accounts",JSON.stringify(students));

    let x  = new feedback(5,"zaid","ahmad",Date.now()); console.log(x);
    x  = new feedback(5,"zaid","ahmad",Date.now()); console.log(x);
    x  = new student(5,"zaid taha",6,7); console.log(x);
}