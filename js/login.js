window.onload = function () {
// ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
    const submit = document.querySelector("button[type='submit']");
    submit.onclick = function (event) {
        event.preventDefault();
        const email = document.getElementById("email");
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
        if (reg.test(email.value)){
            let form = document.querySelector("form");
            form.submit()
        }else {
            let wrong = document.querySelector(".wrong");
            wrong.style.setProperty("display","block");
        }
    }
}