document.getElementById("button1").onclick = () => {
    window.location.replace("https://www.google.com/");
};

document.getElementById("button2").onclick = () => {
    window.document.body.innerHTML = "";
};

//username request (any popup like a prompt or prompt)
let username = prompt("Enter username", "");
let fl_number = false;

//checking username for the contents of numbers
for (let character of username) {
    if (!isNaN(parseInt(character))) {
        fl_number = true;
        break;
    }
}

let result = "";
//  in the presence of numbers in the name, display the name backwards
if (fl_number) {
    for (let i = username.length - 1; i >= 0; i--) {
        result += username[i];
    }
    //else translate letters and numbers through a symbol to upper or lower case
} else {
    for (let i = 0; i < username.length; i++) {
        if (i & 1) {
            result += username[i].toLocaleUpperCase();
        } else {
            result += username[i].toLowerCase();
        }
    }
}

alert(result);