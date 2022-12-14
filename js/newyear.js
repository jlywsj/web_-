let nowdate = new Date();
let nextdate = new Date(2023, 0, 22, 0, 0, 0);
console.log(nowdate);
console.log(nextdate);

// 获取当前的毫秒值
let nowMs = nowdate.getTime();

// 获取年初的毫秒值
let nextMs = nextdate.getTime();

var diffS = Math.floor((nextMs - nowMs) / 1000);

window.onload = function () {
    var day = document.querySelector(".newyearbox .container  .day");
    var hour = document.querySelector(".newyearbox .container  .hour");
    var minute = document.querySelector(".newyearbox .container  .minute");
    var seconds = document.querySelector(".newyearbox .container  .seconds");

    setInterval(function () {
        setTime();
    }, 1000);

    function setTime() {
        day.innerHTML = " " + Math.floor(diffS / 86400);
        hour.innerHTML = " " + Math.floor(diffS / 60 / 60 % 24);
        minute.innerHTML = " " + Math.floor(diffS / 60 % 60);
        seconds.innerHTML = " " + Math.floor(diffS % 60);
        diffS--;
    }
}