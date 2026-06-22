type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
};

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  placeholder = "https://...",
}: ImageUploadProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-slate-400">
        File upload available on mainnet deployment. Paste a URL to use an image now.
      </p>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="mt-2 h-24 w-auto rounded-lg border border-slate-200 object-contain"
        />
      )}
    </div>
  );
}
