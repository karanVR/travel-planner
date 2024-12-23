import React from 'react';
import loading from '@/lib/animations/loading.json';
import Lottie from 'lottie-react';

const Loader = () => {
  return (
    <div style={{ height: '100px', width: '100px' }}>
      <Lottie loop={true} animationData={loading} />
    </div>
  );
};

export default Loader;
