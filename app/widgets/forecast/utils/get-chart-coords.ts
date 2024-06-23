interface IGetChartCoordsParams {
  absoluteTemperature: number
  chartCanvasWidth: number
  chartInternalOffset: number
  chartTemperatureToRemRatio: number
  currentTemperature: number
  i: number
  maxTemperature: number
  nextTemperature?: number
  size: number
}

export const getChartCoords = ({
  absoluteTemperature,
  chartCanvasWidth,
  chartInternalOffset,
  chartTemperatureToRemRatio,
  currentTemperature,
  i,
  maxTemperature,
  nextTemperature,
  size,
}: IGetChartCoordsParams) => {
  const getX = (_i: number) => (chartCanvasWidth / (size - 1)) * _i + chartInternalOffset
  const getY = (_currentTemperature: number) =>
    (maxTemperature + absoluteTemperature - _currentTemperature - absoluteTemperature) * chartTemperatureToRemRatio + chartInternalOffset

  return {
    x1: getX(i),
    x2: nextTemperature ? getX(i + 1) : 0,
    y1: getY(currentTemperature),
    y2: nextTemperature ? getY(nextTemperature) : 0,
  }
}
