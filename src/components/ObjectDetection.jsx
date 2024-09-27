import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocossload } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderObjectPositions } from "../utils";

let interval;
const ObjectDetection = () => {
  const webRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const showVideo = () => {
    if (webRef.current !== null && webRef.current.video?.readyState === 4) {
      const videoHeight = webRef.current.video.videoHeight;
      const videoWidth = webRef.current.video.videoWidth;
      webRef.current.video.width = videoWidth;
      webRef.current.video.height = videoHeight;
    }
  };

  const initializeCoco = async () => {
    setLoading(true);
    const result = await cocossload();
    console.log(result);
    setLoading(false);
    interval = setInterval(() => {
      runObjectDetection(result);
    }, 500);
  };

  async function runObjectDetection(result) {
    if (
      canvasRef.current &&
      webRef.current !== null &&
      webRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webRef.current.video.videoWidth;
      canvasRef.current.height = webRef.current.video.videoHeight;
      // find all detected objects
      const detectObjects = await result.detect(
        webRef.current.video,
        undefined
        // 0.6
      );
      const objects = detectObjects.map((obj) => obj.class);
      console.log("objects", objects);
      const context = canvasRef?.current?.getContext("2d");
      renderObjectPositions(context, detectObjects);
    }
  }

  useEffect(() => {
    initializeCoco();
    showVideo();
  }, []);

  return (
    <div className="my-8">
      {loading ? (
        <h1>loading.....</h1>
      ) : (
        <div className="relative flex items-center justify-center gradient p-2 rounded-md">
          <Webcam ref={webRef} className="rounded-md w-full lg:h-[680px]" />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-9999 w-full lg:h-[680px]"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
