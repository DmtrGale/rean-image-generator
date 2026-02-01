// If you're here to nick this code to make something similar, go right ahead, I don't mind one bit
// but you REALLY should find something better. Also, go listen to Fym by Azure.
// Shoddy code by: bsky.app/profile/DmtrGale

const baseImg = new Image();
baseImg.src = 'img/base.png';

const weekImg = new Image();
weekImg.src = 'img/week.png';

const yearImg = new Image();
yearImg.src = 'img/year.png';

let today = new Date();
let day = String(today.getDate()).padStart(2, '0');

const dayOfTheWeekNumber = today.getDay();
const daysOfTheWeekNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const todaysDayText = daysOfTheWeekNames[today.getDay()];

const days = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];

for(var i = 0; i < daysOfTheWeekNames.length; ++i){
    days[i].src = 'img/days/' + daysOfTheWeekNames[i] + '.png';
}

let mm = String(today.getMonth());
const monthNames = ["jan","feb","mar","apr","may","jun","jul", "aug", "sep", "oct", "dec", "nov"];
const thisMonth = monthNames[mm];

const months = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
for(var i = 0; i < monthNames.length; ++i){
    months[i].src = 'img/months/' + monthNames[i] + '.png';
}

const leftNum = [new Image(), new Image(), new Image(), new Image()];

for(var i = 0; i <= 3; ++i) {
    leftNum[i].src = 'img/numbers/left' + (i) + '.png';
}

const rightNum = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];

for(var i = 0; i <= 9; ++i) {
    rightNum[i].src = 'img/numbers/right' + (i) + '.png';
}

document.getElementById('monthsSelect').selectedIndex = mm;
document.getElementById('dayInput').value = day;

const modeOffsetX = '616';
const modeOffsetY = '24';

const weekDayOffsetX = '1322';
const weekDayOffsetY = '150';

const monthOffsetX = '1333';
const monthOffsetY = '148';

const leftNumOffsetX = '1737';
const leftNumOffsetY = '181';

const rightNumOffsetX = '1813';
const rightNumOffsetY = '177';

var c = document.getElementById('reanImage');
var ctx = c.getContext('2d');

function drawFullImage(weekOrYear, dayOrMonthNumber, leftNumber, rightNumber) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(baseImg, 0, 0);
    if (weekOrYear == 'week') {
        ctx.drawImage(weekImg, modeOffsetX,modeOffsetY);
        ctx.drawImage(days[dayOrMonthNumber], weekDayOffsetX, weekDayOffsetY);
    } else if (weekOrYear == 'year') {
        ctx.drawImage(yearImg, modeOffsetX,modeOffsetY);
        ctx.drawImage(months[dayOrMonthNumber], monthOffsetX, monthOffsetY);
        ctx.drawImage(leftNum[leftNumber], leftNumOffsetX, leftNumOffsetY);
        ctx.drawImage(rightNum[rightNumber], rightNumOffsetX, rightNumOffsetY);
    } else {
        alert("It's dangerous to go without an error! Take this.\nVar isn't week or year:\nfunction drawFullImage(" + weekOrYear + ", " + dayOrMonthNumber + ", " + leftNumber + ", " + rightNumber + ")");
    }
}

function eliminateBadDays(month, day) {
    if(day < 1){
        return 1;
    }
    switch(month) {
        case 'jan': 
        case 'mar':
        case 'may':
        case 'jul':
        case 'aug':
        case 'oct':
        case 'dec':
            if(day > 31){
                return 31
            } else {
                return day;
            }
        case 'apr':
        case 'jun':
        case 'sep':
        case 'nov':
            if(day > 30){
                return 30
            } else {
                return day;
            }
        case 'feb':
            if(day > 29){
                return 29
            } else {
                return day;
            }
        default:
            alert("If you see this I've fucked up probably :)\nCouldn't find month:\nfunction eliminateBadDays(" + month + ", " + day + ")");
            return 1;
    }
}

function downloadImage() {
    const img = c.toDataURL('image/png');
    document.getElementById('downloadButton').href = img;
}

//Fun fact: there used to be a long winded comment here about a hack that didn't actually work

function drawMonthImage() {
    var temp = Number(document.getElementById('dayInput').value);
    var theMonth = monthNames[document.getElementById('monthsSelect').value];
    temp = eliminateBadDays(theMonth, temp);
    temp = String(temp).padStart(2, '0');
    drawFullImage('year', document.getElementById('monthsSelect').value, temp.charAt(0), temp.charAt(1));
}

function loadTodayWeekDayImage() {
    drawFullImage('week', dayOfTheWeekNumber);
}

document.querySelectorAll('.todayMonthButton').forEach((button) => {
    button.addEventListener('click', (event) => {
        document.getElementById('monthsSelect').selectedIndex = mm;
        document.getElementById('dayInput').value = day;
    });
});

document.querySelectorAll('.todayWeekdayButton').forEach((button) => {
    button.addEventListener('click', (event) => {
        drawFullImage('week', dayOfTheWeekNumber);
    });
});

document.querySelectorAll('.weekDayButton').forEach((button) => {
    button.addEventListener('click', (event) => {
        drawFullImage('week', event.target.value);
    });
});

document.getElementById('dayInput').addEventListener('change', drawMonthImage());

var iconNumber = day % 3;
document.getElementById('iconLink').href = 'img/icons/' + iconNumber + '.ico';


//snooPINGAS usual, I see?


