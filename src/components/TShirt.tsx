import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { svgDimensionsProps } from "./InitialRender";


export interface TShirtProps {
  collarWidth: number;
  sleeveLength: number;
  shirtLength: number;
  chestWidth: number;
  shoulderWidth: number;
  stomachWidth: number;
  armWidth: number;
}

// scaling from inches to svg coordinates
const scaleFactor = 8.48;

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
    const newPoint = { ...point };

    // updating collar width
    if (['Start', 'Point 1', 'End'].includes(point.label)) {
      const originalCollarWidth = originalPoints[0].x - originalPoints[1].x;
      const newCollarWidth = dimensions.collarWidth * scaleFactor;

      // division by 2 because we want to distribute the collar width evenly to both sides
      const collarWidthDiff = (newCollarWidth - originalCollarWidth) / 2;

      const isLeftSide = point.x < originalPoints[0].x;

      newPoint.x += isLeftSide ? -collarWidthDiff : collarWidthDiff;
    }



    /*
    updating chest width
    */

    if ([3, 4, 5, 6, 7, 8, 9, 10].includes(index) && point.type === 'lineTo') {
      const initialChestWidth = originalPoints[8].x - originalPoints[5].x;
      const newChestWidth = (dimensions.chestWidth * scaleFactor);
      const evenChestWidthDiff = (newChestWidth - initialChestWidth) / 2;

      if (index >= 7 && index <= 10) {
        newPoint.x = point.x + evenChestWidthDiff;
      }

      if (index >= 3 && index <= 6) {
        newPoint.x = point.x - evenChestWidthDiff;
      }
    }


    // updating sleeve length
    if ([3, 4, 5, 6, 7, 8, 9, 10].includes(index) && point.type === 'lineTo') {
      const rightinitialSleeveLength = originalPoints[10].y - originalPoints[11].y;
      const leftinitialSleeveLength = originalPoints[3].y - originalPoints[2].y
      const avgInitialSleeveLength = (rightinitialSleeveLength + leftinitialSleeveLength) / 2;

      const newSleeveLength = (dimensions.sleeveLength * scaleFactor);
      const evenSleeveLengthDiff = (newSleeveLength - avgInitialSleeveLength) / 2;


      newPoint.y = point.y + evenSleeveLengthDiff;
    }

    // updating shirt length
    if (index === 6 || index === 7 && point.type === 'lineTo') {
      const rightinitialShirtLength = originalPoints[7].y - originalPoints[8].y;
      const leftinitialShirtLength = originalPoints[6].y - originalPoints[5].y
      const avgInitialShirtLength = (rightinitialShirtLength + leftinitialShirtLength) / 2;

      const newShirtLength = (dimensions.shirtLength * scaleFactor);
      const evenShirtLengthDiff = (newShirtLength - avgInitialShirtLength) / 2;

      newPoint.y = point.y + evenShirtLengthDiff;
    }


    // updating Shoulder width
    if ((index === 2 || index === 11) && point.type === 'lineTo') {
      const initialShoulderWidth = originalPoints[11].x - originalPoints[2].x;
      const newShoulderWidth = (dimensions.shoulderWidth * scaleFactor);
      const evenShoulderWidthDiff = (newShoulderWidth - initialShoulderWidth) / 2;

      if (index === 11) {
        newPoint.x = point.x + evenShoulderWidthDiff;
      }

      if (index === 2) {
        newPoint.x = point.x - evenShoulderWidthDiff;
      }
    }


    // updating Stomach width
    if ((index === 6 || index === 7) && point.type === 'lineTo') {
      const initialStomachWidth = originalPoints[7].x - originalPoints[6].x;
      const newStomachWidth = (dimensions.stomachWidth * scaleFactor);
      const evenStomachWidthDiff = (newStomachWidth - initialStomachWidth) / 2;

      if (index === 7) {
        newPoint.x = point.x + evenStomachWidthDiff;
      }

      if (index === 6) {
        newPoint.x = point.x - evenStomachWidthDiff;
      }
    }

    // updating arm width
    if ([10, 9, 3, 4].includes(index) && point.type === 'lineTo') {
      const rightInitialArmWidth = originalPoints[10].x - originalPoints[9].x;
      const leftInitialArmWidth = originalPoints[4].x - originalPoints[3].x;
      const avgInitialArmWidth = (rightInitialArmWidth + leftInitialArmWidth) / 2;

      const newArmWidth = (dimensions.armWidth * scaleFactor);
      const evenArmWidthDiff = (newArmWidth - avgInitialArmWidth) / 2;

      if (index === 10) {
        newPoint.x = point.x + evenArmWidthDiff;
      }

      if (index === 3) {
        newPoint.x = point.x - evenArmWidthDiff;
      }
    }

    return newPoint;
  });

  return newPoints;
};



const TShirtDiagram = ({ width, height, ...dimensions }: TShirtProps & svgDimensionsProps) => {
  const [pathPoints, setPathPoints] = useState(originalPoints);

  useEffect(() => {
    setPathPoints(updatePoints(originalPoints, dimensions));
  }, [dimensions.collarWidth,
  dimensions.sleeveLength,
  dimensions.shirtLength,
  dimensions.chestWidth,
  dimensions.shoulderWidth,
  dimensions.stomachWidth,
  dimensions.armWidth]);

  const generatePathString = () => {
    return pathPoints.map((point, index) => {
      if (index === 0) return `M${point.x} ${point.y}`;
      if (point.type === 'lineTo') return `L${point.x} ${point.y}`;
      if (point.type === 'closePath') return 'Z';
      return '';
    }).join(' ');
  };



  return (
    <svg
      viewBox="-20 -20 400 450"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={generatePathString()}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {pathPoints.map((point, index) => (
        <Fragment key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="5"
            fill="red"
          />

          <text
            x={point.x + 10}
            y={point.y}
            className="text-xs"
            fill={point.type === 'lineTo' ? 'blue' : 'red'}
          >
            {point.label} ({point.x.toFixed(1)}, {point.y.toFixed(1)})
          </text>
        </Fragment>
      ))}
    </svg>
  );
};

export default TShirtDiagram;