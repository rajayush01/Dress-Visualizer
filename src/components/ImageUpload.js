// src/components/ImageUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const ImageUpload = ({ onImageUpload, label }) => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      onImageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <motion.div
  {...getRootProps()}
  className="border-4 border-dashed border-gray-400 p-4 cursor-pointer text-center transition-all duration-300 hover:border-blue-500 rounded-lg max-w-xs mx-auto"
  whileHover={{ scale: 1.05 }}
>
      <input {...getInputProps()} />
      {image ? (
        <img src={image} alt="uploaded" className="max-w-full h-auto rounded-md shadow-lg" />
      ) : (
        <p className="text-gray-500">{label}</p>
      )}
    </motion.div>
  );
};

export default ImageUpload;
