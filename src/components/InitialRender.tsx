import { useState } from 'react';
import TShirtDiagram, { TShirtProps } from './TShirt';

export interface svgDimensionsProps {
    width: number;
    height: number
  }
  
  // these inputs are based on the universal clothing size chart
  const dimensionInputs = {
    collarWidth: { label: 'Collar Width', min: 6, max: 10 },
    sleeveLength: { label: 'Sleeve Length', min: 2, max: 18 },
    shirtLength: { label: 'Shirt Length', min: 28, max: 80 },
    chestWidth: { label: 'Chest Width', min: 19, max: 46 },
    shoulderWidth: { label: 'Shoulder Width', min: 20, max: 40 },
    stomachWidth: { label: 'Stomach Width', min: 18, max: 34 },
    armWidth: { label: 'Arm Width', min: 7, max: 15 }
  };

  
const InitialRender = () => {
    const [clothingDimensions, setClothingDimensions] = useState<TShirtProps>({
        collarWidth: 7,
        sleeveLength: 6,
        shirtLength: 30,
        chestWidth: 24,
        shoulderWidth: 26,
        stomachWidth: 24,
        armWidth: 8
      });
      const [svgDimensions, setSvgDimensions] = useState<svgDimensionsProps>({
        width: 400,
        height: 450
      });
    
      const updateClothingDimension = (dimension: keyof TShirtProps, value: number) => {
        setClothingDimensions(prev => ({
          ...prev,
          [dimension]: value
        }));
      };
    
      console.log("svgDimensions", svgDimensions);
    
      return (
        <div className="flex flex-col items-center mt-12">
          <TShirtDiagram {...clothingDimensions} width={svgDimensions.width} height={svgDimensions.height} />
    
          <div className="flex flex-col space-y-2 w-64">
            {(Object.keys(dimensionInputs) as Array<keyof TShirtProps>).map((dimension) => (
              <div key={dimension} className="flex justify-between items-center">
                <label>{dimensionInputs[dimension].label}:</label>
                <input
                  type="number"
                  min={dimensionInputs[dimension].min}
                  max={dimensionInputs[dimension].max}
                  value={clothingDimensions[dimension]}
                  onChange={(e) => updateClothingDimension(dimension, Number(e.target.value))}
                  className="w-20 border p-1"
                />
              </div>
            ))}
          </div>
    
          <div className="space-y-3">
            <div className="flex items-center">
              <label className="w-1/2">SVG Width:</label>
              <input
                type="range"
                name="width"
                step={50}
                min={350}
                max={800}
                value={svgDimensions.width}
                onChange={(e) => {
                  setSvgDimensions(prev => ({
                    ...prev,
                    width: Number(e.target.value)
                  }));
                }}
              />
              <span className="ml-2">{svgDimensions.width.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <label className="w-1/2">SVG Height:</label>
              <input
                type="range"
                name="height"
                step={100}
                min={400}
                max={900}
                value={svgDimensions.height}
                onChange={(e) => {
                  setSvgDimensions(prev => ({
                    ...prev,
                    height: Number(e.target.value)
                  }));
                }}
              />
              <span className="ml-2">{svgDimensions.height.toFixed(1)}</span>
            </div>
          </div>
        </div>
      );
    }

export default InitialRender