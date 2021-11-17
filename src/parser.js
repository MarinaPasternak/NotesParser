import frequencyData from './notes-frequency.js'

export class Parser {
    parse(notesText) {
        let result = [];

        let notes = notesText.split(' ');
        
        for (let currentNote of notes) {
            const [ note, fraction ] = this._splitNote(currentNote);
            
            let duration = fraction.endsWith('.') ? (1 / fraction * 1.5) : 1 / fraction;

            result.push({
                'duration': duration,
                'frequency': frequencyData[note]
            });
        }
        
        return result;
    }

    _splitNote(note) {
        return note.split('/');
    }
}