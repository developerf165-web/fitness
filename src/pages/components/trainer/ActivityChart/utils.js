export const getYCoordinate = (value, minY, maxY, svgHeight) => {
    return svgHeight - ((value - minY) / (maxY - minY)) * svgHeight;
};

export const getXCoordinate = (index, dataPoints, svgWidth, paddingLeft, paddingRight) => {
    const availableWidth = svgWidth - paddingLeft - paddingRight;
    const xStep = availableWidth / (dataPoints - 1);
    return paddingLeft + index * xStep;
};

export const createSmoothPath = (data, getX, getY) => {
    if (data.length < 2) return "";

    let path = `M${getX(0)},${getY(data[0])}`;
    const smoothing = 0.25;

    for (let i = 0; i < data.length - 1; i++) {
        const p0 = { x: getX(i), y: getY(data[i]) };
        const p1 = { x: getX(i + 1), y: getY(data[i + 1]) };
        const xStep = getX(i + 1) - getX(i);

        const cp1x = p0.x + xStep * smoothing;
        const cp1y = p0.y;
        const cp2x = p1.x - xStep * smoothing;
        const cp2y = p1.y;

        path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }

    return path;
};