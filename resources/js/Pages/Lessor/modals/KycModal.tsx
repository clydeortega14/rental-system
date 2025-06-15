import React, { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/Components/Lessor/ui/dialog";
import { Lessor } from "@/Pages/Lessor/types/Profile";

interface KycModalProps {
  lessor: Lessor;
  onClose: () => void;
  onUpdate: (data: { kycStatus: string; fullName: string; documentNumber: string }) => void;
}

export default function KycModal({
  lessor,
  onClose,
  onUpdate,
}: KycModalProps) {
  const [fullName, setFullName] = useState(lessor.fullName || "");
  const [documentNumber, setDocumentNumber] = useState(lessor.documentNumber || "");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setError("Unsupported file type. Please upload JPG, PNG, or PDF.");
      setIdFile(null);
      setPreviewUrl(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      setIdFile(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setIdFile(file);
    setPreviewUrl(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idFile) {
      setError("Please upload your ID document.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("documentNumber", documentNumber);
      formData.append("idDocument", idFile);

      // Simulated delay
      await new Promise((res) => setTimeout(res, 1000));

      onUpdate({
        kycStatus: "Verified",
        fullName,
        documentNumber,
      });

      onClose();
    } catch {
      setError("Failed to submit KYC info. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputSelectBaseClasses =
    "w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 text-sm shadow-sm appearance-none outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[40px] leading-6";

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-8 rounded-3xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            KYC Verification
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            For compliance purposes, please enter your details and upload a valid government-issued ID.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Legal Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="As shown on your ID"
              required
              className={ inputSelectBaseClasses }
            />
          </div>

          {/* Document Number */}
          <div>
            <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-1">
              ID/Passport Number
            </label>
            <input
              id="documentNumber"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="e.g., X1234567"
              required
              className={ inputSelectBaseClasses }
            />
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700 mb-1">
              Upload ID Document
            </label>
            <input
              id="idDocument"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: JPG, PNG, PDF. Max size: 5MB.
            </p>
            {previewUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-700 font-medium mb-1">Preview:</p>
                <img
                  src={previewUrl}
                  alt="ID Preview"
                  className="max-h-48 border border-gray-300 rounded-md object-contain"
                />
              </div>
            )}
          </div>

          {/* Error Feedback */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-4 py-2">
              {error}
            </div>
          )}

          {/* Footer */}
          <DialogFooter className="flex justify-between pt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl px-6 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Submit
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
