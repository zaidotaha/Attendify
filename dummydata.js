
function func2(){
    
    localStorage.setItem["current_user"] = "email@email1.com"; // normally, it should be gotten from login

    obj = {"fname":"first","lname":"last","email":"email@email.com","password":"password", "is_admin?":"yes"};
    localStorage.setItem("email@email.com",JSON.stringify(obj)); 
    for(let i = 0 ; i < 10 ; i++){
        obj = {"fname":"first"+String(i),"lname":"last"+String(i),"email":"email@email"+String(i)+".com","password":"password"+String(i), "is_admin?":"no"};
        localStorage.setItem("email@email"+String(i)+".com",JSON.stringify(obj));
        localStorage.setItem("students-"+"email@email"+String(i)+".com",JSON.stringify({"IDs":[],"GennedIDs":0,"Total_tasks":0}));
        localStorage.setItem("feedback-"+"email@email"+String(i)+".com",JSON.stringify({"FeedbackIDs":[],"GennedFeedbacks":0}));
    }
    //temporary measure
    localStorage.setItem("current_user","email@email0.com");   
}

