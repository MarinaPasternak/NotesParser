import frequencyData from './notesfrequency.js'

(function() {
    let notes = [];
    let duration = [];
    let frequency = [];
    const inputNotesText = document.getElementById('inputNotesText').value;

    function splitNote(note) {
        return note.split('/');
    }

    function siparateNotesAndDuration() {
        let notesWithDuration = inputNotesText.split(' ');
        
        notesWithDuration.forEach( (currentNote) => {
            const [ note, fraction ] = splitNote(currentNote);
            
            notes.push(note);

            if (fraction.includes('.')) {
                duration.push((1 / fraction) * 1,5);
            } else {
                duration.push(1 / fraction);
            }
            
        });
    }

    function createFrequencyArray() {
        notes.forEach( (currentNote) => {
            if (frequencyData.hasOwnProperty(currentNote)) {
                frequency.push(frequencyData[currentNote]);
            }
        });        
    }

    function createSoundOfNote(frequencyValue, durationValue) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        let prevTime = 0;
        audioCtx.resume().then(function() {
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(frequencyValue, audioCtx.currentTime); // value in hertz
            oscillator.connect(audioCtx.destination);
            oscillator.start(prevTime);
            if (durationValue >= 1) {
                oscillator.stop(durationValue);
                prevTime = audioCtx.currentTime + durationValue;
            }  else {
                oscillator.stop(durationValue * 10);
                prevTime = audioCtx.currentTime + durationValue*10;
            } 
        });
    }

    function workOnLoad() {
        siparateNotesAndDuration();
        createFrequencyArray();

        document.getElementById('start').onclick = function() {
            for (let i = 0; i < frequency.length; i++) {
                createSoundOfNote(frequency[i], duration[i]);
            }
        };
    }

    document.addEventListener('DOMContentLoaded', workOnLoad);
})();