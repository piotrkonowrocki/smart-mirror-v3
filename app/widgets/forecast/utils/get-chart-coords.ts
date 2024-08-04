interface IGetChartCoordsParams {
  chartCanvasWidth: number
  chartInternalOffset: number
  chartPercentToRemRatio: number
  currentPop: number
  i: number
  maxPop: number
  nextPop?: number
  size: number
}

export const getChartCoords = ({
  chartCanvasWidth,
  chartInternalOffset,
  chartPercentToRemRatio,
  currentPop,
  i,
  maxPop,
  nextPop,
  size,
}: IGetChartCoordsParams) => {
  const getX = (_i: number) => (chartCanvasWidth / (size - 1)) * _i + chartInternalOffset
  const getY = (_currentTemperature: number) => (maxPop - _currentTemperature) * chartPercentToRemRatio + chartInternalOffset

  return {
    x1: getX(i),
    x2: nextPop !== undefined ? getX(i + 1) : 0,
    y1: getY(currentPop),
    y2: nextPop !== undefined ? getY(nextPop) : 0,
  }
}
