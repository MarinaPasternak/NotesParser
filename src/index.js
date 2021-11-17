import frequencyData from './notesfrequency.js'

(function() {
    let notes = [];
    let durationAndFrequency = [];
    let inputNotesText = document.getElementById('inputNotesText').value.trim();
    
    const buttonPlayMusic = document.getElementById('startPlayMusic');
    const buttonPauseMusic = document.getElementById('pausePlayMusic');
    const buttonStopMusic = document.getElementById('stopPlayMusic');

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function getInputText() {
        inputNotesText = document.getElementById('inputNotesText').value.trim();
        siparateNotesAndDuration()
    }

    function splitNote(note) {
        return note.split('/');
    }

    function siparateNotesAndDuration() {
        notes = [];
        durationAndFrequency = [];
        let notesWithDuration = inputNotesText.split(' ');
        
        notesWithDuration.forEach( (currentNote) => {
            const [ note, fraction ] = splitNote(currentNote);
            
            notes.push(note);

            if (fraction.includes('.')) {
                if (frequencyData.hasOwnProperty(note)) {
                    durationAndFrequency.push({ 
                        'duration': (1 / fraction * 1,5),
                        'frequency': frequencyData[note]
                    });
                }
            } else {
                if (frequencyData.hasOwnProperty(note)) {
                    durationAndFrequency.push({ 
                        'duration': 1 / fraction,
                        'frequency': frequencyData[note]
                    });
                }
            }
        });
    }


    function createSoundOfNote(frequencyValue, durationValue) {
        return new Promise( (resolve, reject) => {
            const oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequencyValue, audioCtx.currentTime); // value in hertz
            oscillator.connect(audioCtx.destination);
            oscillator.start();
            let duration = durationValue >= 1 ? durationValue: durationValue * 2000;

            if (buttonPlayMusic.getAttribute('doesItNeedToCountinuePlay') === 'false') {
                oscillator.stop();
            } else {
                setTimeout(() => {
                    oscillator.stop(0);
                    resolve();
                }, duration);
            }
        });
    }

    function makeButtonDisabled(btn) {
        btn.setAttribute('disabled', true);
    }

    function makeButtonActive(btn) {
        btn.removeAttribute('disabled');
    }

    function workOnLoad() {
        siparateNotesAndDuration();

        
        let iteratorNotes = durationAndFrequency[Symbol.iterator]();

        buttonPlayMusic.onclick = async function() {
            makeButtonDisabled(this);
            makeButtonActive(buttonPauseMusic);
            makeButtonActive(buttonStopMusic);

            getInputText();

            this.setAttribute('doesItNeedToCountinuePlay', true);

            let notesIteretion = iteratorNotes.next();

            while(!notesIteretion.done) {
                if (this.getAttribute('doesItNeedToCountinuePlay') === 'true') {
                    await createSoundOfNote(notesIteretion.value.frequency, notesIteretion.value.duration);
                    notesIteretion = iteratorNotes.next();
                } else {
                    break;
                }
            }
            makeButtonActive(this);
            makeButtonDisabled(buttonPauseMusic);
            makeButtonDisabled(buttonStopMusic);
        };

        buttonStopMusic.onclick = function() {
            buttonPlayMusic.setAttribute('doesItNeedToCountinuePlay', false);
            makeButtonDisabled(buttonStopMusic);
            makeButtonActive(buttonPauseMusic);
            makeButtonActive(buttonPlayMusic);
        };

        buttonPauseMusic.onclick = function() {

            buttonPlayMusic.setAttribute('doesItNeedToCountinuePlay', false);
            makeButtonDisabled(buttonPauseMusic);
            makeButtonActive(buttonStopMusic);
            makeButtonActive(buttonPlayMusic);
        };
    }

    document.addEventListener('DOMContentLoaded', workOnLoad);
})();