import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RotateCcw } from "lucide-react";

interface Props {
  onCapture: (image: string) => void;
}

export default function SelfieCapture({ onCapture }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      onCapture(imageSrc);
    }
  };

  const handleRetake = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center space-y-6">
      {!preview ? (
        <>
          {/* Live Webcam Preview */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-300 shadow-lg">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={capture}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <Camera size={16} />
            Capture Selfie
          </button>
        </>
      ) : (
        <>
          {/* Captured Image Preview */}
          <div className="relative w-full flex justify-center items-center aspect-video">
            <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-orange-300 border border-gray-200">
              <img
                src={preview}
                alt="Captured Selfie"
                className="object-cover w-[320px] h-[240px] rounded-2xl"
              />
            </div>
          </div>

          <div className="flex justify-between items-center w-full px-1">
            <button
              onClick={handleRetake}
              className="text-sm text-orange-600 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={18} />
              Retake
            </button>
          </div>
        </>
      )}
    </div>
  );
}
