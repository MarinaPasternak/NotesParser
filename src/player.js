export class Player {
    constructor() {
        this._iterator = null;
        this._isPaused = false;
        this._onStop = null;
        
        this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this._currentOscillator = null;
    }
    
    async play(notes, onStop) {
        this._isPaused = false;
        this._onStop = onStop;

        if (this._iterator === null) {
            this._iterator = notes[Symbol.iterator]();
        }
        
        await this._playNotes();
    }
    
    pause() {
        this._stopCurrentOscillator();
        
        this._isPaused = true;
    }
    
    stop() {
        this._stopCurrentOscillator();
        this._callOnStop();
        
        this._isPaused = true;
        this._iterator = null;
    }
    
    async _playNotes() {
        while(true) {
            if (this._isPaused) {
                break;
            }
            
            let currentElement = this._iterator.next();
            
            if (currentElement.done) {
                this._iterator = null;
                this._callOnStop();
                
                break;
            }
            
            await this._playNote(currentElement.value);
        }
    }
    
    async _playNote(note) {
        return new Promise( (resolve) => {
            this._currentOscillator = this._audioCtx.createOscillator();
            this._currentOscillator.type = 'sine';
            this._currentOscillator.frequency.setValueAtTime(note.frequency, this._audioCtx.currentTime);
            this._currentOscillator.connect(this._audioCtx.destination);
            this._currentOscillator.start();
            
            let duration = note.duration * 2000;

            setTimeout(
                () => {
                    this._stopCurrentOscillator();
                    resolve();
                }, 
                duration
            );
        });
    }
    
    _stopCurrentOscillator() {
        if (!!this._currentOscillator) {
            this._currentOscillator.stop(0);
            this._currentOscillator = null;
        }
    }
    
    _callOnStop() {
        if (!!this._onStop) {
            this._onStop();
        }
    }
}