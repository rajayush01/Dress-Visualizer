// src/App.js
import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImagePreview from './components/ImagePreview';
import Spinner from './components/Spinner';
import { motion } from 'framer-motion';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { fabric } from 'fabric';

const App = () => {
  const [humanImage, setHumanImage] = useState(null);
  const [fabricImage, setFabricImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const { editor, onReady } = useFabricJSEditor();

  const handleImageUpload = (image, type) => {
    if (type === 'human') {
      setHumanImage(image);
    } else if (type === 'fabric') {
      setFabricImage(image);
    }
  };

  const processImages = () => {
    if (!humanImage || !fabricImage) {
      alert('Please upload both human and fabric images.');
      return;
    }

    setLoading(true);
    setIsProcessed(false);

    if (!editor) {
      alert('Fabric.js is not loaded yet');
      setLoading(false);
      return;
    }

    editor.canvas.clear();

    fabric.Image.fromURL(humanImage, (humanImg) => {
      humanImg.set({ crossOrigin: 'anonymous' });

      // Set canvas dimensions based on human image dimensions
      editor.canvas.setWidth(humanImg.width);
      editor.canvas.setHeight(humanImg.height);

      editor.canvas.setBackgroundImage(humanImg, editor.canvas.renderAll.bind(editor.canvas));

      fabric.Image.fromURL(fabricImage, (fabricImg) => {
        fabricImg.set({ crossOrigin: 'anonymous' });

        // Scale and position fabric image to fit the human image
        fabricImg.scaleToWidth(humanImg.width);
        fabricImg.scaleToHeight(humanImg.height);
        fabricImg.set({
          left: 0,
          top: 0,
        });

        editor.canvas.add(fabricImg);

        // Render the canvas
        editor.canvas.renderAll();
        setLoading(false);
        setIsProcessed(true);
      });
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    // Render the canvas and get the data URL
    const dataUrl = editor.canvas.toDataURL();
    setProcessedImage(dataUrl);
    setLoading(false);
  };

  return (
    <div class="inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_20%,#63e_100%)]">
      <div className="p-8 min-h-screen">
        <h1 className="text-4xl text-center mb-8 font-bold">Dress Visualizer</h1>
        <div className="flex justify-around mb-8">
          <ImageUpload onImageUpload={(image) => handleImageUpload(image, 'human')} label="Upload Human Image" />
          <ImageUpload onImageUpload={(image) => handleImageUpload(image, 'fabric')} label="Upload Fabric Image" />
        </div>
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={processImages}
            className="bg-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-blue-600 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            Process Images
          </motion.button>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-3xl text-gray-500 font-bold'>Canvas</div>
          <div className="flex justify-center">
            <FabricJSCanvas className="mt-10 mb-10 border-4 border-black shadow-lg shadow-black" onReady={onReady} style={{ border: '1px solid black', width: '100%', height: '400px' }} />
          </div>
        </div>
        {isProcessed && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-green-600 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Submit
            </motion.button>
          </div>
        )}
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <ImagePreview humanImage={humanImage} fabricImage={fabricImage} processedImage={processedImage} />
        )}
      </div>
    </div>
  );
};

export default App;