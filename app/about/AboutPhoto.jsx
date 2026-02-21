'use client';

import { useState } from 'react';

export default function AboutPhoto() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="aboutPhotoWrap aboutPhotoFallback">
        <span className="aboutPhotoInitials" aria-hidden="true">AD</span>
      </div>
    );
  }

  return (
    <div className="aboutPhotoWrap">
      <img
        src="/aboutme/angie-image1.jpg"
        alt="Angie Duong"
        className="aboutPhoto"
        loading="eager"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
