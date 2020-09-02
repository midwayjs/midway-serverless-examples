import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'react-piano/dist/styles.css';
import './App.css';

export default () => {
  const firstNote = MidiNumbers.fromNote('c4');
  const lastNote = MidiNumbers.fromNote('f6');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  const [width] = React.useState(window.innerWidth);
  var audio = new Audio('')

  const getMetre = (data) => {
    audio.pause() 
    console.log(data)
    fetch('./api/getAudio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({metre: data})
    })
    .then(resp => resp.json())
    .then(({url}) => {
          console.log(url)
          audio = new Audio(url)
          audio.play()  
    })
  }
  const stopAllSound = () => {
    audio.pause() 
  }
  return (
    <div className="App">
      <div className="container">
        <p className="header">网页版钢琴</p>
        <Piano
          className="piano"
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            //console.log(midiNumber)
            const midi = 'midi/'+midiNumber+'.wav';
            var ac = new AudioContext();
            var audio = new Audio(midi);
            audio.play()
          }}
          stopNote={(midiNumber) => {}}
          width={width*0.7}
          keyboardShortcuts={keyboardShortcuts}
        />
        <p className="header2">节奏</p>
        <div className="metreList">
          <Button content='90BPM 4/4拍' className="metre ui big" onClick={(e) => {getMetre("90 BPM 44")}}/>
          <Button content='90BPM 3/4拍' className="metre ui big" onClick={(e) => {getMetre("90 BPM 34")}}/>
          <Button content='按此停止节奏' className="metre ui big" onClick={(e) => {stopAllSound()}}/>
        </div>       
      </div>
    </div>
  );
}