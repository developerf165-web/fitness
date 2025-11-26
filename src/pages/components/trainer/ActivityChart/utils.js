// === FILE: /components/charts/common/utils.js ===

export const getYCoordinate = (value, minY, maxY, svgHeight) => {
  if (maxY === minY) {
    return svgHeight / 2;
  }
  return svgHeight - ((value - minY) / (maxY - minY)) * svgHeight;
};

export const getXCoordinate = (index, dataPoints, svgWidth, paddingLeft, paddingRight) => {
  const availableWidth = svgWidth - paddingLeft - paddingRight;
  if (dataPoints <= 1) {
    return paddingLeft + availableWidth / 2;
  }
  const xStep = availableWidth / (dataPoints - 1);
  return paddingLeft + index * xStep;
};

// --- НАВСОЗӢ ДАР ИНҶО ---
export const createSmoothPath = (data, getX, getY) => {
  if (data.length < 2) return "";

  // Функсияи ёрирасон барои гирифтани 'value'
  // Ин имкон медиҳад, ки 'data' ҳам [150] бошад ва ҳам [{value: 150}]
  const getValue = (dp) => (typeof dp === 'object' && dp !== null) ? dp.value : dp;

  let path = `M${getX(0)},${getY(getValue(data[0]))}`;
  const smoothing = 0.25;

  for (let i = 0; i < data.length - 1; i++) {
    const p0_val = getValue(data[i]);
    const p1_val = getValue(data[i + 1]);

    const p0 = { x: getX(i), y: getY(p0_val) };
    const p1 = { x: getX(i + 1), y: getY(p1_val) };
    const xStep = p1.x - p0.x;

    const cp1x = p0.x + xStep * smoothing;
    const cp1y = p0.y;
    const cp2x = p1.x - xStep * smoothing;
    const cp2y = p1.y;

    path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }

  return path;
};