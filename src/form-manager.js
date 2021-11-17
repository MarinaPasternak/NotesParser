import { Player } from './player.js';
import { Parser } from './parser.js';

export class FormManager {

    constructor() {
        this._playButton = document.getElementById('startPlayMusic');
        this._pauseButton = document.getElementById('pausePlayMusic');
        this._stopButton = document.getElementById('stopPlayMusic');
        this._input = document.getElementById('inputNotesText');
        
        this._player = new Player();
        this._parser = new Parser();
    }
    
    initialize() {
        this._playButton.onclick = async () => {
            this._disableButtons(this._playButton);
            this._enableButtons(this._pauseButton, this._stopButton);
            
            let notes = this._parser.parse(this._getInputText());
            
            await this._player.play(notes, () => { this._onPlayStop(); });
        };
        
        this._pauseButton.onclick = () => {
            this._disableButtons(this._pauseButton);
            this._enableButtons(this._playButton, this._stopButton);
            
            this._player.pause();
        }
        
        this._stopButton.onclick = () => {
            this._player.stop();
        }

        this._input.oninput = () => {
            this._player.stop();
        }
    }
    
    _onPlayStop() {
        this._disableButtons(this._pauseButton, this._stopButton);
        this._enableButtons(this._playButton);
    }
    
    _getInputText() {
        return this._input.value.trim();
    }
    
    _enableButtons(...buttons) {
        for (let button of buttons) {
            button.removeAttribute('disabled');
        }
    }
    
    _disableButtons(...buttons) {
        for (let button of buttons) {
            button.setAttribute('disabled', true);
        }
    }
}