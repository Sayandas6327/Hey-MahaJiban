import { useParams, useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState,useRef, useEffect } from "react";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "./PdfReader.css";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PdfReader = () => {
  const { id } = useParams();
  const location = useLocation();
  // const storedPdf = localStorage.getItem("currentPdf");
  // const pdfUrl = location.state?.pdfUrl || storedPdf;

  const { pdfUrl } = location.state || {};
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.2); // 👈 default zoom
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  if (!pdfUrl) return <h2>No PDF found!</h2>;

//   useEffect(() => {
//   if (containerRef.current) {
//     const updateWidth = () => {
//       setContainerWidth(containerRef.current!.offsetWidth);
//     };

//     updateWidth();
//     window.addEventListener("resize", updateWidth);

//     return () => window.removeEventListener("resize", updateWidth);
//   }
// }, []);
useEffect(() => {
  const handleResize = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  handleResize(); // Run on load
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "cornsilk",
        userSelect: "none",
      }}
      onContextMenu={(e) => e.preventDefault()} // ❌ Disable right click
    >
      <h2>📖 Reading Book</h2>
      {/* PAGE CONTROLS */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={prevPage}
          disabled={pageNumber <= 1}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          }}
        >
          ⬅ Previous
        </button>

        <span>
          Page {pageNumber} of {numPages}
        </span>

        <button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          style={{
            padding: "8px 16px",
            marginLeft: "10px",
            cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
          }}
        >
          Next ➡
        </button>
      </div>
  
      {/* --- ZOOM CONTROLS --- */}
      {/* <div className="flex gap-2 mb-4">
        <button onClick={() => setScale(scale + 0.2)}>Zoom +</button>
        <button onClick={() => setScale(scale - 0.2)}>Zoom -</button>
      </div> */}

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
          className="pdf-page"
          pageNumber={pageNumber}
          width={containerWidth * scale}
          // scale={scale}
          // width={containerWidth - 39.8}
          // width={containerWidth}
          renderTextLayer={false}   // ❌ Hide selectable text
          renderAnnotationLayer={false} // ❌ Hide download / toolbar
        />
      </Document>
      
      {/* PAGE CONTROLS */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={prevPage}
          disabled={pageNumber <= 1}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          }}
        >
          ⬅ Previous
        </button>

        <span>
          Page {pageNumber} of {numPages}
        </span>

        <button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          style={{
            padding: "8px 16px",
            marginLeft: "10px",
            cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
          }}
        >
          Next ➡
        </button>
      </div>

      {/* ❌ No download button */}
    </div>
  );
};

export default PdfReader;

