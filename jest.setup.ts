import '@testing-library/jest-dom';

//@ts-ignore
HTMLCanvasElement.prototype.getContext = () => {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x, y, w, h) => {
        return {
          data: new Array(w * h * 4),
        };
      },
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => {
        return { width: 0 };
      },
      transform: () => {},
      rect: () => {},
      clip: () => {},
    };
  };
  