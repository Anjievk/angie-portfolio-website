'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AboutPhoto() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="aboutPhotoWrap aboutPhotoFallback">
        <span className="aboutPhotoInitials" aria-hidden="true">AD</span>
      </div>
    );
  }

  return (
    <div className="aboutPhotoWrap">
      <Image
        src="/about/photo.jpg"
        alt="Angie Duong"
        width={400}
        height={400}
        className="aboutPhoto"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}
