function showClock(){
    setInterval(() => {
        const now = new Date();
        // Get hours, minutes, and seconds
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        
        // Add leading zero if needed
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        // Construct the time string in HH:MM:SS format
        const timeString = hours + ':' + minutes + ':' + seconds;
        console.log("Clock: " , timeString);
    } , 1000);
}

showClock();