import { useState } from 'react';
import InitialRender from './components/InitialRender';

interface TShirtProps {
  collarWidth: number,
  sleeveLength: number,
  shirtLength: number,
  chestWidth: number,
  shoulderWidth: number,
  stomachWidth: number,
  armWidth: number
}

// these inputs are based on the universal clothing size chart
const dimensionInputs = [
  { label: 'Collar Width', key: 'collarWidth', min: 6, max: 10 },
  { label: 'Sleeve Length', key: 'sleeveLength', min: 2, max: 18 },
  { label: 'Shirt Length', key: 'shirtLength', min: 28, max: 80 },
  { label: 'Chest Width', key: 'chestWidth', min: 19, max: 46 },
  { label: 'Shoulder Width', key: 'shoulderWidth', min: 20, max: 40 },
  { label: 'Stomach Width', key: 'stomachWidth', min: 18, max: 34 },
  { label: 'Arm Width', key: 'armWidth', min: 7, max: 15 }
];

function App() {
  const [clothingDimensions, setClothingDimensions] = useState<TShirtProps>({
    collarWidth: 7,
    sleeveLength: 6,
    shirtLength: 30,
    chestWidth: 24,
    shoulderWidth: 26,
    stomachWidth: 24,
    armWidth: 8
  });

  const updateDimensions = (dimension: keyof TShirtProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setClothingDimensions((prev) => ({
        ...prev,
        [dimension]: Number(value),
      }));
    };

  return (
    // <div className='flex flex-col justify-center items-center mt-10'>
    //   <NTShirtDiagram {...clothingDimensions}/>

    //   {dimensionInputs.map((dimension, index) => (
    //     <div key={index} className='flex items-center gap-2'>
    //       <span>{dimension.label}</span>
    //       <input
    //         type='number'
    //         min={dimension.min}
    //         max={dimension.max}
    //         value={clothingDimensions[dimension.key as keyof TShirtProps]}
    //         onChange={updateDimensions(dimension.key as keyof TShirtProps)}
    //       />
    //     </div>
    //   ))}
    // </div>
    <InitialRender/>
  );
}

export default App;