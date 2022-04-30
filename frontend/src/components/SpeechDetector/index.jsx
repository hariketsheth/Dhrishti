import React, { useEffect, useRef, useState } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import start from '../../assets/start.png';

import './style.scss';

const visualValueCount = 9;

const SpeechDetector = (props) => {
  const [clicked, setClicked] = useState(false);
  const visualizerRef = useRef(null);

  const processFrame = ( data ) => {
    const values = Object.values( data );
    const dataMap = { 0: 5, 1: 2, 2: 0, 3: 3, 4: 5, 5: 2, 6: 0, 7: 3, 8: 5 };
    const visualElements = document.querySelectorAll( '#visualizer > div' );
    for ( let i = 0; i < visualValueCount; ++i ) {
      const value = values[ dataMap[ i ] ] / 255;
      if (visualElements && visualElements[ i ]) {
        const elmStyles = visualElements[ i ].style;
        elmStyles.height = `${value * 60}px`;
      }
      //elmStyles.transform = `scaleY( ${ value } )`;
      //elmStyles.opacity = Math.max( .25, value )
    }
  };

  const startRecording = () => {
    props.startRecording();
    props.startTimer();
    setClicked(true);
    SpeechRecognition.startListening({ continuous: true });
    const audioContext = new AudioContext();
    navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
    .then((stream) => {
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource( stream );
      source.connect( analyser );
      analyser.smoothingTimeConstant = 0.5
      analyser.fftSize = 32;
      const initRenderLoop = (analyser) => {
        console.log(stream);
        const frequencyData = new Uint8Array( analyser.frequencyBinCount );
    
        const renderFrame = () => {
          analyser.getByteFrequencyData( frequencyData );
          processFrame( frequencyData );
    
          requestAnimationFrame( renderFrame );
        };
        requestAnimationFrame( renderFrame );
      }

      initRenderLoop( analyser );
    } )
    .catch( ( error ) => {
      console.log(error);
    } );
  };

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    props.setCurrentTranscript((transcriptinput) => {
      return transcriptinput + ' ' + transcript;
    })
    if (transcript.length > 130) {
      resetTranscript();
    }
  }, [transcript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <>
      <div className="speech-detector">
        <div id="visualizer" ref={visualizerRef}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="speech-content">
          <div>
          <h1>Live Transcript</h1>
          <span>{transcript}&nbsp;</span>
          </div>
        </div>
      </div>
      {!clicked ? <img onClick={startRecording} id="start-recording" src={start} /> : null}
    </>
  )
}

export default SpeechDetector;