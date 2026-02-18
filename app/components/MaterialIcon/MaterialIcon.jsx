'use client';

/**
 * Renders a Google Material Symbols Rounded icon.
 * Icon names use underscores, e.g. "arrow_forward", "thumb_up".
 * @see https://fonts.google.com/icons?icon.style=Rounded
 */
export default function MaterialIcon({ icon, size = 24, className = '', style = {}, ...props }) {
  return (
    <span
      className={`material-symbols-rounded ${className}`.trim()}
      style={{ fontSize: size, ...style }}
      aria-hidden
      {...props}
    >
      {icon}
    </span>
  );
}
