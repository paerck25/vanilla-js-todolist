let clock = document.querySelector('.clock');
let days = document.querySelector('.days');
let hm = document.querySelector('.hm');
let seconds = document.querySelector('.seconds');

const week = ['일','월','화','수','목','금','토'];


function now() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let date = today.getDate();
    let day = week[today.getDay()];
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    days.innerText = `${year}년 ${month}월 ${date}일 ${day}요일`
    hm.innerText = `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}`
    seconds.innerText = `${s > 9 ? s : '0' + s}`
}

function tiktok() {
    setInterval(now, 1000);
}

now();
tiktok();