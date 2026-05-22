import { useState, useEffect } from 'react';
import ZoltTooltip from './ZoltTooltip';

const ZoltWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const zoltUrl = import.meta.env.VITE_ZOLT_URL;

  useEffect(() => {
    const dismissed = localStorage.getItem('zolt_tooltip_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowTooltip(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem('zolt_tooltip_dismissed', 'true');
  };

  const handleToggle = () => {
    if (!isOpen) handleDismissTooltip();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <iframe
          src={zoltUrl}
          className="mb-4 h-[70vh] w-[calc(100vw-3rem)] max-w-sm rounded-2xl border-0 shadow-2xl sm:h-[600px] sm:w-96"
          title="Zolt Assistant"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          allow="clipboard-read; clipboard-write"
        />
      )}

      <div className="relative">
        {!isOpen && (
          <ZoltTooltip visible={showTooltip} onDismiss={handleDismissTooltip} />
        )}

        <button
          type="button"
          onClick={handleToggle}
          className="ml-auto flex h-20 w-20 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
          aria-label={isOpen ? 'Close Zolt Assistant' : 'Open Zolt Assistant'}
        >
          {isOpen ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
              ✕
            </span>
          ) : (
            <>
              {!imgLoaded && (
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-xs font-semibold text-[#0064A8]">
                  Zolt
                </span>
              )}
              <img
                src="/Zolt/Zolt-MINIMISED.gif"
                alt="Zolt Assistant"
                width={80}
                height={80}
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                className={`h-20 w-20 ${imgLoaded ? 'block' : 'hidden'}`}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ZoltWidget;
