'use client';

import Image from 'next/image';
import { useProjectImageExpand } from '../../contexts/ProjectImageExpandContext';

export default function ExpandableImage({ src, alt, className, wrapClassName = '', width, height, sizes, ...rest }) {
  const ctx = useProjectImageExpand();
  const isPhone = ctx?.isPhone ?? false;
  const setExpandedImage = ctx?.setExpandedImage;

  if (!src) return null;

  const imageEl = (
    <Image
      src={src}
      alt={alt ?? ''}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      sizes={sizes}
      {...rest}
    />
  );

  if (isPhone && setExpandedImage) {
    return (
      <div
        className={`${wrapClassName} progressImageExpandWrap`.trim()}
        role="button"
        tabIndex={0}
        onClick={() => setExpandedImage(src)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setExpandedImage(src))}
        aria-label="Expand image"
      >
        {imageEl}
      </div>
    );
  }

  return imageEl;
}
