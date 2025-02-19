const display = document.getElementById('display');
let starttime = 0, elapsedtime = 0;
let isRunning = false;
let timer = null;


function reset() {
    //reset everything to actual default
    clearInterval(timer); //removes the set interval function on variable timer
    display.innerHTML = '00:00:00:00';
    //now reset rest variables to start counting from 0 again
    starttime = 0;
    elapsedtime = 0;
    isRunning = false;
    timer = null;
}

function start() {
    if(!isRunning) {
        //record the time initally we pressed the button
        starttime = Date.now() - elapsedtime;
        isRunning = true;
        timer = setInterval(update, 10);// update the data every 10 ms
        console.log(starttime, timer);
    }
}

function stop() {
    if(isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

//in order to find the elapsed time, we actually need Date.now() - Date.now() 
// refered this : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#measuring_time_elapsed

function update() {
    const currenttime = Date.now();
    elapsedtime = currenttime - starttime;
    let hours = Math.floor(elapsedtime / (1000*60*60));
    let remaining = elapsedtime % (1000*60*60);
    let minutes = Math.floor(remaining / (1000*60));
    remaining = remaining % (1000*60);
    let seconds = Math.floor(remaining / 1000);
    let milliseconds = Math.floor((remaining % 1000)/10);//display only first 2 digit of milliseconds

    //add 0 padding to each
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = milliseconds.toString().padStart(2, '0');

    //update display
    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}