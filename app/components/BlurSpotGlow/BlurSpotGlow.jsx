'use client';

import './BlurSpotGlow.css';

/**
 * Hai vệt glow mờ (blur spot) dùng làm background.
 * Parent cần có position: relative và kích thước xác định.
 *
 * @param {string} [className] - Class thêm cho wrapper (để override style hoặc reuse)
 * @param {string} [spotBottomLeftColor] - Màu glow góc dưới-trái (hex, mặc định #A836F1)
 * @param {string} [spotTopRightColor] - Màu glow góc trên-phải (hex, mặc định #FA758F)
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}

const DEFAULT_BOTTOM_LEFT = '#A836F1';
const DEFAULT_TOP_RIGHT = '#FA758F';

export default function BlurSpotGlow({
  className = '',
  spotBottomLeftColor = DEFAULT_BOTTOM_LEFT,
  spotTopRightColor = DEFAULT_TOP_RIGHT,
}) {
  const leftRgb = hexToRgb(spotBottomLeftColor) || '168, 54, 241';
  const rightRgb = hexToRgb(spotTopRightColor) || '250, 117, 143';

  return (
    <div
      className={`blurSpotGlow ${className}`.trim()}
      aria-hidden="true"
      style={{
        '--blur-spot-left-rgb': leftRgb,
        '--blur-spot-right-rgb': rightRgb,
      }}
    >
      <div className="blurSpotGlowSpot blurSpotGlowSpotBottomLeft" />
      <div className="blurSpotGlowSpot blurSpotGlowSpotTopRight" />
    </div>
  );
}
