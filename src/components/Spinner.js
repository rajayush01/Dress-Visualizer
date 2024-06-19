import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <ClipLoader size={150} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Spinner;
