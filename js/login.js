if(localStorage.length == 0){
    func2();
}

function login_function() {
    if (validateLogin()) {
        user = document.getElementById("email-login").value;
        pss = document.getElementById("password-login").value;

        if (isKeyInLocalStorage(user)) {
            localStorage.setItem("current_user", user);
            obj = JSON.parse(localStorage.getItem(user));
            if (obj["is_admin?"] == "yes") {
                Swal.fire({
                    heightAuto: false,
                    icon: "success",
                    title: "Login Success"
                }).then(() => {
                        window.location.href = 'team leader home page.html';
                });
            } else {
                Swal.fire({
                    heightAuto: false,
                    icon: "success",
                    title: "Login Success"
                }).then(() => {
                        window.location.href = 'Home-Trainer.html';
                });
            }
        }
    } 
}

function isKeyInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
}

function validateLogin() {
    user = document.getElementById("email-login").value;
    pass = document.getElementById("password-login").value;

    let emailError = document.getElementById("email_error");
    let passError = document.getElementById("pass_error");

    if (user === "") {
        document.getElementById("email-login").style.border = "1px solid red";
        emailError.style.display = "block";
        document.getElementById("email-login").focus();
        return false;
    } else {
        document.getElementById("email-login").style.border = "";
        emailError.style.display = "none";
    }

    if (pass === "") {
        document.getElementById("password-login").style.border = "1px solid red";
        passError.style.display = "block";
        document.getElementById("password-login").focus();
        return false;
    } else {
        document.getElementById("password-login").style.border = "";
        passError.style.display = "none";
    }

    if (isKeyInLocalStorage(user)) {
        obj = JSON.parse(localStorage.getItem(user));
        if (obj.password !== pass) {
            passError.innerHTML = "Password is not correct";
            document.getElementById("password-login").style.border = "1px solid red";
            passError.style.display = "block";
            document.getElementById("password-login").focus();
            return false;
        }
    } else {
        emailError.innerHTML = "Email not found";
        document.getElementById("email-login").style.border = "1px solid red";
        emailError.style.display = "block";
        document.getElementById("email-login").focus();
        return false;
    }
    return true;
}