class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onPause = callbacks.onPause;
        }

        this.timeLeft = parseFloat(this.durationInput.value);

        this.durationInput.addEventListener('input', () => {
            this.timeLeft = parseFloat(this.durationInput.value);
        });

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    tick = () => {
        if(this.timeRemaining <= 0){
            this.pause();
        } else {
            this.timeRemaining = this.timeRemaining - .05;
            if(this.onTick) this.onTick(this.timeRemaining);
        }        
    };

    start = () => {
        if(this.onStart) this.onStart(this.timeRemaining);
        this.interval = setInterval(this.tick, 50);
    };

    pause = () => {
        clearInterval(this.interval);
        if(this.onPause) this.onPause();
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }
    
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}