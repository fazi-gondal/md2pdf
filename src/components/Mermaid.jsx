import mermaid from "mermaid";
import { memo, useEffect, useRef, useState } from "react";

/* ---------- one-time Mermaid init ---------- */
if (!mermaid.initialized) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    suppressErrorRendering: true, // hide Mermaid's red SVG banner
  });
  mermaid.initialized = true;
}

/* ---------- component ---------- */
const Mermaid = memo(({ chart }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const el = containerRef.current;
    if (!el) return;

    const renderChart = async () => {
      setError(null);      // reset
      el.innerHTML = "";   // wipe previous diagram / error

      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2, 9)}`,
          chart,
        );
        if (isMounted) el.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid syntax error:", err);
        if (isMounted) setError(err.message);
      }
    };

    renderChart();

    return () => {
      isMounted = false;
      if (el) el.innerHTML = "";
    };
  }, [chart]);

  return (
    <div className="relative">
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-md overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between gap-3 p-4">
            <span className="text-sm text-red-800 font-medium">
              Mermaid Syntax Error
            </span>
            
            <button
              onClick={() => setError(null)}
              className="flex-shrink-0 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full p-1.5 transition-all duration-200"
              aria-label="Close error"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div ref={containerRef} />
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
});

Mermaid.displayName = "Mermaid";

export default Mermaid;
