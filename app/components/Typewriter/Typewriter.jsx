'use client';

import { useEffect, useState } from 'react';
import './Typewriter.css';

export default function Typewriter({ words, typeSpeed = 80, deleteSpeed = 50, delayAfterType = 1500, delayAfterDelete = 500 }) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), delayAfterType);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const nextIndex = (wordIndex + 1) % words.length;
        const timeout = setTimeout(() => {
          setWordIndex(nextIndex);
          setIsDeleting(false);
        }, delayAfterDelete);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, wordIndex, isDeleting, words, typeSpeed, deleteSpeed, delayAfterType, delayAfterDelete]);

  return (
    <span className="typewriterText">
      {displayText}
      <span className="typewriterCursor" aria-hidden="true">|</span>
    </span>
  );
}
