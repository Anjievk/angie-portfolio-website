'use client';

import { useState, useRef, useCallback, forwardRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFPage = forwardRef(({ pageNumber, width, height }, ref) => (
  <div className="magazineFlipPage" ref={ref}>
    <Page
      pageNumber={pageNumber}
      width={width}
      height={height}
      renderTextLayer={false}
      renderAnnotationLayer={false}
    />
  </div>
));

PDFPage.displayName = 'PDFPage';

const PAGE_WIDTH = 400;
const PAGE_HEIGHT = 565;

export default function MagazineFlipViewer({ pdfUrl, mockupImage, className = '' }) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const bookRef = useRef(null);

  const onLoadSuccess = useCallback(({ numPages: total }) => {
    setNumPages(total);
    setError(null);
  }, []);

  const onLoadError = useCallback((err) => {
    setError(err?.message || 'Failed to load PDF');
  }, []);

  const onFlip = useCallback((e) => setCurrentPage(e.data), []);

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip?.()?.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip?.()?.flipPrev();
  }, []);

  if (!pdfUrl) return null;

  if (error) {
    return (
      <div className={`magazineFlipViewer magazineFlipViewerError ${className}`}>
        <p>Unable to load magazine: {error}</p>
      </div>
    );
  }

  return (
    <div className={`magazineFlipViewer ${className}`}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <div className="magazineFlipViewerLoading">
            <span>Loading magazine…</span>
          </div>
        }
      >
        {numPages > 0 && (
          <>
            <div className="magazineFlipBookWrap">
              <HTMLFlipBook
                ref={bookRef}
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                size="stretch"
                minWidth={280}
                maxWidth={500}
                minHeight={396}
                maxHeight={707}
                drawShadow
                flippingTime={600}
                maxShadowOpacity={0.3}
                showCover={false}
                mobileScrollSupport
                onFlip={onFlip}
                className="magazineFlipBook"
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <PDFPage
                    key={i}
                    pageNumber={i + 1}
                    width={PAGE_WIDTH}
                    height={PAGE_HEIGHT}
                  />
                ))}
              </HTMLFlipBook>
            </div>
            <div className="magazineFlipControls">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentPage <= 0}
                className="magazineFlipBtn"
                aria-label="Previous page"
              >
                <MaterialIcon icon="chevron_left" size={28} />
              </button>
              <span className="magazineFlipPageIndicator">
                {currentPage + 1} / {numPages}
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={currentPage >= numPages - 1}
                className="magazineFlipBtn"
                aria-label="Next page"
              >
                <MaterialIcon icon="chevron_right" size={28} />
              </button>
            </div>
          </>
        )}
      </Document>
      {mockupImage && (
        <div className="magazineFlipMockupWrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mockupImage} alt="Magazine mockup" className="magazineFlipMockup" />
        </div>
      )}
    </div>
  );
}
