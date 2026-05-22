// src/components/ZoltTooltip.tsx

interface ZoltTooltipProps {
  visible: boolean;
  onDismiss: () => void;
}

const ZoltTooltip = ({ visible, onDismiss }: ZoltTooltipProps) => {
  if (!visible) return null;

  return (
    <div className="absolute bottom-full right-0 mb-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 pr-8 animate-fade-slide-up z-50">
      {/* Close button */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
      >
        ×
      </button>

      {/* Speech bubble tail pointing down toward Zolt */}
      <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />

      {/* Message */}
      <p className="text-sm text-gray-700 leading-snug">
        👋 <span className="font-semibold">Want to chat about Salt?</span>{' '}
        I'm Zolt, your AI assistant — here to help you find your way.
      </p>
    </div>
  );
};

export default ZoltTooltip;