import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import * as cam from "@mediapipe/camera_utils";
import defaultImg from "../vback.jpg";

const style = {
  width: 640,
  height: 480,
  transform: "scaleX(-1)",
};

const Selfie = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();
  const [imageURL, setimageURL] = useState(defaultImg);

  const onResults = async (results) => {
    const img = document.getElementById("vbackground");
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = "destination-over";
    canvasCtx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.restore();
  };

  useEffect(() => {
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
    });

    selfieSegmentation.onResults(onResults);

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await selfieSegmentation.send({ image: webcamRef.current.video });
        },
        width: 1280,
        height: 720,
      });

      camera.start();
    }
  }, []);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimageURL(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="container">
      <div className="videoContainer">
        <div className="videoContent">
          <div className="video">
            <Webcam ref={webcamRef} style={style} />
            <canvas ref={canvasRef} style={style} />
          </div>
        </div>
      </div>

      <div className="backgroundContainer">
        <div className="backgrounds">
          <img id="vbackground" src={imageURL} alt="The Screan" className="background" />
        </div>
        <label htmlFor="contained-button-file" className="file-upload">
          <input accept="image/*" id="contained-button-file" multiple type="file" onChange={imageHandler} />
          Choose Background
        </label>
      </div>
    </div>
  );
};

export default Selfie;
