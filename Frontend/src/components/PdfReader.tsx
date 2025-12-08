import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfReader = () => {
  const { id } = useParams();
  const pdfUrl = localStorage.getItem(`pdf-${id}`);
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
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        options={{
          cMapUrl: "cmaps/",
          cMapPacked: true,
        }}
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

