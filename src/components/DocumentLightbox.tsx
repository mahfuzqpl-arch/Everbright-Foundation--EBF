import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ArchiveDocument } from '../data/ebfData';

interface DocumentLightboxProps {
  document: ArchiveDocument | null;
  onClose: () => void;
}

export function DocumentLightbox({ document: docItem, onClose }: DocumentLightboxProps) {
  useEffect(() => {
    if (!docItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docItem, onClose]);

  if (!docItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-doc-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white border border-stone-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-[#1E5631] tabular-nums">
              {docItem.reference} · {docItem.date}
            </p>
            <h3 id="lightbox-doc-title" className="mt-1 font-serif text-lg sm:text-xl font-semibold text-[#1C1917]">
              {docItem.title}
            </h3>
            <p className="text-xs text-stone-500">{docItem.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close document preview"
            className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-md border border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-[#FBF9F5]">
          <div className="bg-white border border-stone-200 p-3 flex justify-center">
            <img
              src={docItem.image}
              alt={docItem.title}
              className="max-h-[60vh] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="mt-4 text-sm text-stone-700 leading-relaxed max-w-2xl">
            {docItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
