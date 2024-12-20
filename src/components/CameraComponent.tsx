import  { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const captureImage = () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      setImage(screenshot);
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={captureImage}
      >
        Prendre une photo
      </button>
      {image && <img src={image} alt="Captured" />}
    </div>
  );
};

export default CameraComponent;
