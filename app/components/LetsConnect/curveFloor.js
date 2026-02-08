const SVG_WIDTH = 1440;
const P0 = { x: 0.178711, y: 0.990723 };
const P1 = { x: 513.065, y: 196.958 };
const P2 = { x: 926.437, y: 198.998 };
const P3 = { x: 1439.82, y: 0.990723 };

function cubicBezier(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

function sampleCurve(worldWidth, worldHeight, curveDepth, samples, curveOffset = 0) {
  const yMin = 0.73;
  const yMax = 199;
  const points = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const p = cubicBezier(t, P0, P1, P2, P3);
    const x = (p.x / SVG_WIDTH) * worldWidth;
    const curveYNormalized = Math.max(0, Math.min(1, (p.y - yMin) / (yMax - yMin)));
    const y = worldHeight - curveDepth + curveYNormalized * curveDepth + curveOffset;
    points.push({ x, y });
  }
  return points;
}

export function getCurvePoints(containerWidth, containerHeight, curveDepth, samples = 48, curveOffset = 0) {
  return sampleCurve(containerWidth, containerHeight, curveDepth, samples, curveOffset);
}

export function getCurveFloorVertices(worldWidth, worldHeight, curveDepth = 60, samples = 32) {
  const points = sampleCurve(worldWidth, worldHeight, curveDepth, samples);
  const vertices = [
    { x: 0, y: worldHeight },
    ...points,
    { x: worldWidth, y: worldHeight },
  ];
  const centerX = worldWidth / 2;
  const centerY = worldHeight - curveDepth / 2;
  const verticesRelative = vertices.map((v) => ({
    x: v.x - centerX,
    y: v.y - centerY,
  }));
  return { vertices: verticesRelative, centerX, centerY };
}

const FLOOR_SEGMENT_HEIGHT = 16;

export function getCurveFloorSegments(containerWidth, containerHeight, curveDepth, segments = 32, curveOffset = 0) {
  const points = sampleCurve(containerWidth, containerHeight, curveDepth, segments, curveOffset);
  const result = [];
  const halfH = FLOOR_SEGMENT_HEIGHT / 2;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    result.push({
      x: midX,
      y: midY + halfH,
      width: length + 4,
      height: FLOOR_SEGMENT_HEIGHT,
      angle,
    });
  }
  return result;
}
