import { useEffect, useState } from "react";

// scaling from inches to svg coordinates
const scaleFactor = 8.48;

export interface TShirtProps {
  collarWidth: number;
  sleeveLength: number;
  shirtLength: number;
  chestWidth: number;
  shoulderWidth: number;
  stomachWidth: number;
  armWidth: number;
}

const originalPoints = [
  { x: 204.5, y: 0.5, label: 'Start', type: 'moveTo' },
  { x: 118, y: 0.5, label: 'Point 1', type: 'lineTo' },
  { x: 54.5, y: 23.5, label: 'Point 2', type: 'lineTo' },
  { x: 1, y: 127.5, label: 'Point 3', type: 'lineTo' },
  { x: 54.5, y: 160.5, label: 'Point 4', type: 'lineTo' },
  { x: 66.5, y: 142.5, label: 'Point 5', type: 'lineTo' },
  { x: 66.5, y: 370, label: 'Point 6', type: 'lineTo' },
  { x: 261.5, y: 370, label: 'Point 7', type: 'lineTo' },
  { x: 261.5, y: 142.5, label: 'Point 8', type: 'lineTo' },
  { x: 273, y: 160.5, label: 'Point 9', type: 'lineTo' },
  { x: 333.5, y: 127.5, label: 'Point 10', type: 'lineTo' },
  { x: 273, y: 23.5, label: 'Point 11', type: 'lineTo' },
  { x: 204.5, y: 0.5, label: 'End', type: 'closePath' }
];

const updatePoints = (prevPoints: typeof originalPoints, dimensions: TShirtProps) => {
  const newPoints = prevPoints.map((point, index) => {
    if ((index === 6 || index === 7) && point.type === 'lineTo') {
      const baseStomachWidth = Math.abs(originalPoints[7].x - originalPoints[6].x);
      const widthDifference = (baseStomachWidth - dimensions.stomachWidth * scaleFactor) / 2;
      
      return {
        ...point,
        x: index === 6 ? originalPoints[6].x + widthDifference : originalPoints[7].x - widthDifference
      };
    }
    return point;
  });
  return newPoints;
};


const NTShirtDiagram = (dimensions: TShirtProps) => {
  const [currentPathPoints, setCurrentPathPoints] = useState(originalPoints);

  useEffect(() => {
    setCurrentPathPoints(updatePoints(originalPoints, dimensions))
  }, [dimensions])

  const generatePathString = () => {
    return currentPathPoints.map((point, index) => {
      if (index === 0 && point.type === "moveTo") return `M${point.x} ${point.y}`
      if (point.type === 'lineTo') return `L${point.x} ${point.y}`
      if (point.type === 'closePath') return `Z`
    }).join('')
  }




  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400" height="450"
      viewBox="0 0 400 450"
      fill="none"
      preserveAspectRatio=""
      className="relative"

    >
      <path
        d={generatePathString()}
        stroke="black"
      />

      {currentPathPoints.map((point, index) => {
        return (
          <div className={`absolute inset-0`}>
            <span className="bg-red w-3 h-3 ">({point.x},{point.y})</span>
          </div>
        )
      })}
    </svg>
  );
};

export default NTShirtDiagram;