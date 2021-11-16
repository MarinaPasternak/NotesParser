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
                duration.push(1 / fraction * 1,5);
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
    
    function workOnLoad() {
        siparateNotesAndDuration();
        createFrequencyArray();
    }

    document.addEventListener('DOMContentLoaded', workOnLoad);
})();