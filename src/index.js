(function() {
    let notes = [];
    let duration = [];
    const inputNotesText = document.getElementById('inputNotesText').value;

    function splitNote(note) {
        return note.split('/');
    }
    
    function workOnLoad() {
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
        console.log(notes);
        console.log(duration);
    }

    document.addEventListener('DOMContentLoaded', workOnLoad);
})();