function stringReverse(str) {
    var listOfChars = str.split('');
    var reverseList = listOfChars.reverse()
    return reverseList.join("");
    
}

function checkPalindrome(str) {
    if (str === stringReverse(str)) {
        return true;
    }
    return false;
}

function dateToString(date) {
    var dateString = { day: '', month: '', year: ''};

    if (date.day < 10) {
        dateString.day = "0" + date.day;  
    } 
    else {
        dateString.day = date.day.toString();
    }

    if (date.month < 10) {
        dateString.month = "0" + date.month;
    } 
    else {
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();

    return dateString;
}

function getAllDateFormats(date) {
    var dateString = dateToString(date);

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2); 
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var dateArr = getAllDateFormats(date);
    var isPalindrome = false;

    for (var i = 0; i < dateArr.length; i++) {
        if (checkPalindrome(dateArr[i])) {
            return true;
        }
    }
    return false;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    } else {
        return false;
    }
}

function getNextDate(date) {

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    // Checks february, leap and non leap years

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {    // check if the day exceeds the max days in month
            day = 1;
            month++;
        }

        // Handle 31 December to 1 January transition
        if (month > 12) {
            month = 1;
            year++;
        }
    }
    return {
        day: day,
        month: month,
        year: year,
    };
}

function getNextPalindromeDate(date) {
    var counterNext = 0;
    var nextDate = getNextDate(date);

    while (1) {                                            // infinte loop to check next palindrome
        counterNext++;
        var isPalindromeDate = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindromeDate) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counterNext, nextDate];
}

function getPreviousDate(date) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    if (day < 1) {
        month--;
        day = daysInMonth[month - 1];
        if (month < 1) {
            day = 31;
            month = 12;
            year--;
        }
        if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        }
    }
    return {
        day: day,
        month: month,
        year: year,
    };
}

function getPreviousPalindromeDate(date) {
    var counterPrev = 0;
    var previousDate = getPreviousDate(date);

    while (1) {
        counterPrev++;
        var isPalindromeDate = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindromeDate) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [counterPrev, previousDate];
}

function getNearestPalindrome(date) {
    var [counterPrev, previousDate] = getPreviousPalindromeDate(date);
    var [counterNext, nextDate] = getNextPalindromeDate(date);

    if (counterPrev < counterNext) {
        return [counterPrev, previousDate];
    } else {
        return [counterNext, nextDate];
    }
}

const birthDay = document.querySelector("#birthday");
const check = document.querySelector("#check");
const output = document.querySelector("#output");

function clickHandler(e) {
    var bdayStr = birthDay.value;

    if (bdayStr !== "") {
        var dateList = bdayStr.split("-");
        var date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0]),
        };
        // console.table(date);

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            output.innerText = "Wow! Your Birthday is a Palindrome 🤩";
        } else {
            var [counter, palindromeDate] = getNearestPalindrome(date);
            output.innerText = `Oops! Not a palindrome.😞 Nearest Palindrome date is ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}. You missed by ${counter} days.`;
        }
    } else {
        output.innerText = "Please enter a date";
    }
}

check.addEventListener("click", clickHandler);

