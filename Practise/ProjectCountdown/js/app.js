const endDate = "31 Aug 2024 11:00 PM"


document.querySelector("#endDate").innerText = endDate;
const inputs = document.querySelectorAll('input');

const clock = () => {
    const end = new Date(endDate);
    const now = new Date()
    //covert into seconds remains overall
    const diff = (end - now) / 1000;
    //check the count did not reach negative if yes return from function
    if (diff < 0) return;
    //convert into days
    const days = Math.floor(diff / 3600 / 24);
    inputs[0].value = days;
    //convert into Hours
    inputs[1].value = Math.floor(diff / 3600) % 24;
    //Convert into minutes after the hours
    inputs[2].value = Math.floor(diff / 60) % 60;
    //Convert into seconds after the minutes
    inputs[3].value = Math.floor(diff) % 60;

}

// Use set interval to call the function for every one seconds
setInterval(() => {
    clock()
}, 1000);
