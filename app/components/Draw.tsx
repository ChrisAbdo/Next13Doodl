import { useState, createRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { ChromePicker } from 'react-color';

const Draw = () => {
  // State for the color, dimensions, and brush and lazy radii
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [brushRadius, setBrushRadius] = useState(3);
  const [lazyRadius, setLazyRadius] = useState(0);

  // Ref for the CanvasDraw component
  const saveableCanvas: any = createRef();

  return (
    <div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem(
              'savedDrawing',
              saveableCanvas.current.getSaveData()
            );
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            saveableCanvas.current.eraseAll();
          }}
        >
          Erase
        </button>
        <button
          onClick={() => {
            saveableCanvas.current.undo();
          }}
        >
          Undo
        </button>

        <button
          onClick={() => {
            console.log(saveableCanvas.current.getDataURL());
            alert('DataURL written to console');
          }}
        >
          GetDataURL
        </button>
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Brush-Radius:</label>
          <input
            type="number"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Lazy-Radius:</label>
          <input
            type="number"
            value={lazyRadius}
            onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
          />
        </div>
        {/* Add the ChromePicker component here */}
        <ChromePicker
          color={color}
          onChange={(newColor) => setColor(newColor.hex)}
        />
      </div>
      <CanvasDraw
        ref={saveableCanvas}
        brushColor={color}
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        canvasWidth={width}
        canvasHeight={height}
        // chnange the dot color
        catenaryColor={color}
        className="border-2 border-black"
      />
    </div>
  );
};

export default Draw;
