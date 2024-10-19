import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const Aiproctor = () => {
  const videoRef = useRef(null);
  const statusRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioAnalyzerRef = useRef(null);
  const audioDataArrayRef = useRef(new Uint8Array(256));

  const [status, setStatus] = useState('');
  const [faceStatus, setFaceStatus] = useState('face detected.');
  const [audioStatus, setAudioStatus] = useState('Audio levels are normal.');
  const [leftEyeX, setLeftEyeX] = useState(0);
  const [rightEyeX, setRightEyeX] = useState(0);
  const [noseTipX, setNoseTipX] = useState(0);
  const [leftEyeY, setLeftEyeY] = useState(0);
  const [rightEyeY, setRightEyeY] = useState(0);
  const [noseTipY, setNoseTipY] = useState(0);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;

        // Initialize audio context and analyzer
        audioContextRef.current = new AudioContext();
        audioAnalyzerRef.current = audioContextRef.current.createAnalyser();
        audioDataArrayRef.current = new Uint8Array(audioAnalyzerRef.current.frequencyBinCount);

        // Initialize audio monitoring
        const audioSource = audioContextRef.current.createMediaStreamSource(stream);
        audioSource.connect(audioAnalyzerRef.current);
      })
      .catch(error => console.error('Error getting user media:', error));
  }, []);

  useEffect(() => {
    const loadModelAsync = async () => {
      const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
      detectFaces(model);
    };
    loadModelAsync();
  }, []);

  const detectFaces = async (model) => {
    try {
      const predictions = await model.estimateFaces({
        input: videoRef.current,
        returnTensors: false,
        flipHorizontal: false
      });

      if (predictions.length > 0) {
        const face = predictions[0];

        let faceFeatures = {
          noseTip: face.landmarks[0],
          leftEye: face.landmarks[1],
          rightEye: face.landmarks[2]
        };

        const noseTip = faceFeatures.noseTip;
        const leftEye = faceFeatures.leftEye;
        const rightEye = faceFeatures.rightEye;

        setLeftEyeX(leftEye.x);
        setRightEyeX(rightEye.x);
        setNoseTipX(noseTip.x);
        setLeftEyeY(leftEye.y);
        setRightEyeY(rightEye.y);
        setNoseTipY(noseTip.y);

        let faceStatus;
        if (Math.abs(leftEyeX - rightEyeX) < 10) {
          if (noseTipY < leftEyeY && noseTipY < rightEyeY) {
            faceStatus = "Suspicious activity detected - Looking Up";
          } else if (noseTipY > leftEyeY && noseTipY > rightEyeY) {
            faceStatus = "Suspicious activity detected - Looking Down";
          } else {
            faceStatus = "Normal";
          }
        } else if (leftEyeX < rightEyeX) {
          if (noseTipX < leftEyeX) {
            faceStatus = "Suspicious activity detected - Looking Left";
          } else {
            faceStatus = "Suspicious activity detected - Looking Right";
          }
        } else {
          if (noseTipX < rightEyeX) {
            faceStatus = "Suspicious activity detected - Looking Right";
          } else {
            faceStatus = "Suspicious activity detected - Looking Left";
          }
        }

        setFaceStatus(faceStatus);
      } else {
        setFaceStatus("No face detected.");
      }

      requestAnimationFrame(() => detectFaces(model));
    } catch (error) {
      console.error(error);
    }
  };

  const monitorAudioLevels = () => {
    try {
      audioAnalyzerRef.current.getByteFrequencyData(audioDataArrayRef.current);

      const averageVolume = audioDataArrayRef.current.reduce((a, b) => a + b, 0) / audioDataArrayRef.current.length;

      if (averageVolume > 20) {
        setAudioStatus("Audio levels are high.");
      } else {
        setAudioStatus("Audio levels are normal.");
      }

      requestAnimationFrame(monitorAudioLevels);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    monitorAudioLevels();
  }, []);

  return (
    <div>
      <video ref={videoRef} width="350" height="250" autoPlay muted/>
      <p>
        Face Status: {faceStatus}
      </p>
      <p>
        Audio Status: {audioStatus}
      </p>
    </div>
  );
};

export default Aiproctor;