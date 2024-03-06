function counterModified(){
    let counter = 0;
    setInterval( function displaysTime(){
        counter++;
        console.log("Counter: ", counter);
    }, 1000);
}


counterModified();