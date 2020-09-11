document.querySelector('.calendar-icon').addEventListener('click', () => {
    document.querySelector('.item1').classList.toggle('shown');
})

const dateOfMonth = document.querySelector('.dateOfMonth');
const calendarHeader = document.querySelector('.yyyymm');

const calendarNow = new Date();
let nowYear = calendarNow.getFullYear();
let nowMonth = calendarNow.getMonth();
let firstDate = new Date(nowYear, nowMonth, 1);
let lastDate = new Date(nowYear, nowMonth + 1, 0);

function createCalendar() {
    let dateList = [];
    firstDate = new Date(nowYear, nowMonth, 1);
    lastDate = new Date(nowYear, nowMonth + 1, 0);
    for (let i = 0; i < firstDate.getDay(); i++) {
        dateList.push(`<div></div>`)
    }
    for (let i = 1; i <= lastDate.getDate(); i++) {
        const today = new Date(nowYear, nowMonth, i);
        if (today.getDay() === 0 || today.getDay() === 6) {
            dateList.push(`<div class="weekend">${i}</div>`);
            continue;
        }

        if (
            today.getFullYear() === calendarNow.getFullYear()
            &&
            today.getMonth() === calendarNow.getMonth()
            &&
            today.getDate() === calendarNow.getDate()
        ) {
            dateList.push(`<div class="today">${i}</div>`);
            continue;
        }

        dateList.push(`<div>${i}</div>`);
    }
    calendarHeader.innerText = `${nowYear}년 ${nowMonth + 1}월`
    dateOfMonth.innerHTML = dateList.join("");
}

function prevMonth() {
    if (nowMonth === 0) {
        nowYear -= 1;
        nowMonth = 11;
    } else {
        nowMonth -= 1;
    }
    createCalendar();
}

function nextMonth() {
    if (nowMonth === 11) {
        nowYear += 1;
        nowMonth = 0;
    } else {
        nowMonth += 1;
    }
    createCalendar();
}

function refresh() {
    nowYear = calendarNow.getFullYear();
    nowMonth = calendarNow.getMonth();
    createCalendar();
}

document.querySelector('.prev').addEventListener('click', prevMonth);
document.querySelector('.next').addEventListener('click', nextMonth);
document.querySelector('.refresh-icon').addEventListener('click', refresh);
createCalendar();