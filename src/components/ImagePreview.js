import React from 'react';
import { motion } from 'framer-motion';

const ImagePreview = ({ humanImage, fabricImage, processedImage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="mb-4 font-bold text-3xl text-gray-500">Human Image</h2>
        {humanImage && <img src={humanImage} alt="human" className="max-w-full h-auto rounded-md shadow-xl shadow-black mx-auto border-4 border-black" />}
      </motion.div>
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2 className="mb-4 font-bold text-3xl text-gray-500">Fabric Image</h2>
        {fabricImage && <img src={fabricImage} alt="fabric" className="max-w-full h-auto rounded-md shadow-xl shadow-black mx-auto border-4 border-black" />}
      </motion.div>
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <h2 className="mb-4 font-bold text-3xl text-gray-500">Processed Image</h2>
        {processedImage && <img src={processedImage} alt="processed" className="max-w-full h-auto rounded-md shadow-xl shadow-black mx-auto border-4 border-black" />}
      </motion.div>
    </div>
  );
};

export default ImagePreview;
