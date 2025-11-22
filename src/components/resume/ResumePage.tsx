import './ResumePage.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { FaDownload } from 'react-icons/fa'; /* Import download icon */
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function ResumePage({ darkMode }: { darkMode: boolean }) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className={`resume-container ${darkMode ? 'dark' : ''}`}>
      <a 
        href="/resume.pdf" 
        download 
        className="resume-download-link"
        title="Download PDF" /* Tooltip on hover */
      >
        <FaDownload className="download-icon" />
      </a>

      <div className={`resume-pdf-container ${darkMode ? 'dark' : ''}`}>
        <Document
          file="/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="resume-document"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={`page_${index + 1}`} className="resume-page-wrapper">
              <Page 
                pageNumber={index + 1}
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