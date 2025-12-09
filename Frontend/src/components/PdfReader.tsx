import { useParams, useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PdfReader = () => {
  const { id } = useParams();
  const location = useLocation();
  const { pdfUrl } = location.state || {};
  const [numPages, setNumPages] = useState<number | null>(null);

  if (!pdfUrl) return <h2>No PDF found!</h2>;

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        padding: "20px",
        userSelect: "none",
      }}
      onContextMenu={(e) => e.preventDefault()} // ❌ Disable right click
    >
      <h2>📖 Reading Book</h2>

      <Document
        file={{ url: pdfUrl}}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => console.log("PDF Load Error →", err)}
        // options={{
        //   cMapUrl: "cmaps/",
        //   cMapPacked: true,
        // }}
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}   // ❌ Hide selectable text
          renderAnnotationLayer={false} // ❌ Hide download / toolbar
        />
      </Document>

      <p>Page 1 of {numPages}</p>

      {/* ❌ No download button */}
    </div>
  );
};

export default PdfReader;

