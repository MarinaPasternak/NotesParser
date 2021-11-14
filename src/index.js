(function() {
    let notes = [];
    const inputNotesText = document.getElementById('inputNotesText').value;

    function createNotesObject (notesText) {
        let notesArray = notesText.split(' ');
        return notesArray;
    }
    
    function workOnLoad() {
        notes = createNotesObject (inputNotesText);
        console.log(notes);
    }

    document.addEventListener('DOMContentLoaded', workOnLoad);
})();