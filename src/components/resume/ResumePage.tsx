import './ResumePage.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ResumePage({ darkMode }: { darkMode: boolean }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(900);
  const resumePath = `${import.meta.env.BASE_URL}resume.pdf`;
  
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Update page width based on screen size
  useEffect(() => {
    function updatePageWidth() {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: use 90% of screen width
        setPageWidth(width * 0.9);
      } else if (width < 1200) {
        // Tablet: use 70% of screen width
        setPageWidth(width * 0.7);
      } else {
        // Desktop: max 900px
        setPageWidth(900);
      }
    }

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  return (
    <div className={`resume-container ${darkMode ? 'dark' : ''}`}>
      <a 
        href={resumePath}
        download 
        className="resume-download-link"
        title="Download PDF"
      >
        <FaDownload className="download-icon" />
      </a>

      <div className={`resume-pdf-container ${darkMode ? 'dark' : ''}`}>
        <Document
          file={resumePath}
          onLoadSuccess={onDocumentLoadSuccess}
          className="resume-document"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={`page_${index + 1}`} className="resume-page-wrapper">
              <Page 
                pageNumber={index + 1}
                width={pageWidth}
                renderTextLayer={true}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

export default ResumePage;