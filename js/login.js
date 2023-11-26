if(localStorage.length == 0){
    func2();
}

function login_function(){
     user = document.getElementById("email-signup").value;
     pss = document.getElementById("password-signup").value;
     if(isKeyInLocalStorage(user)){
        localStorage.setItem("current_user",user);
        obj = JSON.parse(localStorage.getItem(user));
        if(obj["is_admin?"]=="yes"){
            window.location.href = 'team leader home page.html';
        }
        else{
            window.location.href = 'Home-Trainer.html';
        }
     }
}


function isKeyInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
}