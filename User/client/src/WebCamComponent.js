import React, { useEffect, useRef } from 'react';

const WebcamComponent = ({Action}) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcamjs/1.0.26/webcam.min.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.Webcam.set({
          width: 450,
          height: 300,
          image_format: 'jpeg',
          jpeg_quality: 460,
        });

        window.Webcam.attach(webcamRef.current);
      };
    };

    loadScript();

    // Clean up script on component unmount
    return () => {
      if (window.Webcam) {
        window.Webcam.reset();
      }
    };
  }, []);

  const capture = () => {
    window.Webcam.snap((data_uri) => {
      document.getElementById('results').innerHTML = `<img src="${data_uri}"/>`;
    });
  };

  setInterval(capture,2000)

  return (
    <div className='disp'>
        <div className='abc'>
            <div ref={webcamRef} className='vid'>
                <video className='video' autoPlay>Video Stream Not Available.</video>
            </div>
            <button onClick={capture} className='capimg'>{Action.pro}</button>
        </div>
        <div id='results'>
        </div>
    </div>
       
  );
};

export default WebcamComponent;
