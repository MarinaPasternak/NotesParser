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

    function GuitarString(frequency, duration=1., sample_rate=44100, toType=False) {
        let noise = Math.random(-1, 1);
        let samplesLength = int(sample_rate*duration);
        let samples = [samplesLength];

        for (let i in samples) {
            samples[i] = noise[i]
        }
        for i in range(len(noise), len(samples)):
            # В начале i меньше длины шума, поэтому мы берем значения из шума.
            # Но потом, когда i больше длины шума, мы уже берем посчитанные нами новые значения.
            samples[i] = (samples[i-len(noise)]+samples[i-len(noise)-1])/2
    
        if toType:
            samples = samples / np.max(np.abs(samples))  # Нормируем от -1 до 1
            return np.int16(samples * 32767)             # Переводим в тип данных int16
        else:
            return samples

    }

    document.addEventListener('DOMContentLoaded', workOnLoad);
})();