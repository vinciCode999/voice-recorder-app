import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { ReactMic } from 'react-mic';

export default function ReactRecorder() {
  const [voice, setVoice] = useState(false);
  const [recordLink, setRecordLink] = useState("");
  const [timer, setTimer] = useState(0);

  // Handlers
  const handleStartRecord = () => {
    setVoice(true);
    setRecordLink("");
    setTimer(0); // Reset timer
  };

  const handleStopRecord = () => {
    setVoice(false);
  };

  const handleClearRecord = () => {
    setVoice(false);
    setRecordLink("");
    setTimer(0); // Reset timer
  };

  const onStop = (blob) => {
    console.log(blob);
    setRecordLink(blob.blobURL);
  };

  // Timer Effect
  useEffect(() => {
    let interval;
    if (voice) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on unmount or stop
  }, [voice]);

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-sm mx-auto text-black border px-5 py-2 text-center bg-gray-200 rounded-md">
      <h3 className="text-center text-md font-bold text-[#0B9265] uppercase">
        Record a Voice Message
      </h3>
      <div className="mt-4">
        <ReactMic
          record={voice}
          onStop={onStop}
          className="w-full"
          mimeType="audio/mp3"
          strokeColor="#098D61"
          preload="auto"
        />
      </div>

      {voice && (
        <div className="mt-2 text-sm font-semibold text-[tomato]">
          Recording: {formatTime(timer)} {`seconds`}
        </div>
      )}

      <div className="mt-4">
        {recordLink ? (
          <Button
            gradientMonochrome="lime"
            className="text-white float-right rounded-tl-full rounded-bl-full"
            onClick={handleClearRecord}
          >
            Clear
          </Button>
        ) : null}
      </div>
      <div className="w-full mt-4">
        {voice ? (
          <Button onClick={handleStopRecord} gradientMonochrome="failure">
            stop
          </Button>
        ) : (
          <Button onClick={handleStartRecord} gradientMonochrome="success"  className='rounded-tr-full rounded-br-full'>
            start
          </Button>
        )}
      </div>

      <div className="mt-4 mb-4">
        {recordLink ? (
          <audio controls src={recordLink} className="w-full" />
        ) : null}
      </div>
    </div>
  );
}
