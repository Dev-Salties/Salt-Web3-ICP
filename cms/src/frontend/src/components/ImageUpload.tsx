import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { uploadFile } from "../lib/uploads";

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
  placeholder = "https://... or upload a file",
}: ImageUploadProps) {
  const { identity } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !identity) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const url = await uploadFile(identity, file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      // Reset input so same file can be re-uploaded if needed
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="btn-secondary shrink-0 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {value && !error && (
        <img
          src={value}
          alt="Preview"
          className="mt-2 h-24 w-auto rounded-lg border border-slate-200 object-contain"
          onError={() => setError("Could not load image preview.")}
        />
      )}
    </div>
  );
}
