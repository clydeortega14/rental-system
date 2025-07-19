import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/Lessor/ui/dialog";
import { Button } from "@/Components/Lessor/ui/button";
import { Input } from "@/Components/Lessor/ui/input";
import { Badge } from "@/Components/Lessor/ui/badge";
import { useToast } from "@/hooks/use-toast";
import SelfieCapture from "@/Pages/User/SelfieCapture";
import { KycModalProps } from "@/Pages/User/types/KycProps";

export default function KycModal({
  user_id,
  userKyc,
  isReadOnly,
  onClose,
  onUpdate,
}: KycModalProps) {
  const { toast } = useToast();

  const canResubmit = userKyc?.kyc_status === "Rejected";
  const isNewKyc = !userKyc;
  const isFormEditable = !isReadOnly || isNewKyc || canResubmit;

  const [formData, setFormData] = useState({
    full_name: "",
    document_type: "",
    document_number: "",
    document_image: null as File | null,
    selfie: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userKyc) {
      setFormData({
        full_name: userKyc.full_name || "",
        document_type: userKyc.document_type || "",
        document_number: userKyc.document_number || "",
        document_image: null,
        selfie: canResubmit ? "" : userKyc.selfie_path ? `/storage/${userKyc.selfie_path}` : "",
      });

      setDocumentPreview(canResubmit ? null : userKyc.document_path ? `/storage/${userKyc.document_path}` : null);
    }
  }, [userKyc, canResubmit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "document_image" && files?.length) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, document_image: file }));
      setDocumentPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCaptureSelfie = (base64: string) => {
    setFormData((prev) => ({ ...prev, selfie: base64 }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    const data = new FormData();
    data.append("user_id", String(user_id));
    data.append("full_name", formData.full_name);
    data.append("document_type", formData.document_type);
    data.append("document_number", formData.document_number);
    if (formData.document_image) {
      data.append("document_image", formData.document_image);
    }
    data.append("selfie", formData.selfie);

    if (canResubmit) {
      data.append("kyc_status", "Pending");
    }

    try {
      await axios.post(`/user/kyc`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "KYC Submitted",
        description: "Your verification request has been submitted.",
      });

      onClose();
      if (onUpdate) onUpdate();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast({
          title: "Submission Failed",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {userKyc ? "KYC Details" : "Submit KYC Verification"}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="mb-2">
          Submit your government ID and selfie to verify your identity.
        </DialogDescription>

        {userKyc?.kyc_status && (
          <div className="mb-4">
            <Badge
              variant={
                userKyc.kyc_status === "Approved"
                  ? "success"
                  : userKyc.kyc_status === "Rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {userKyc.kyc_status}
            </Badge>
          </div>
        )}

        {/* --- Form Fields --- */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              readOnly={!isFormEditable}
            />
            {errors.full_name && <p className="text-sm text-red-500">{errors.full_name[0]}</p>}
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Document Type</label>
            <select
              name="document_type"
              value={formData.document_type}
              onChange={handleChange}
              disabled={!isFormEditable}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="passport">Passport</option>
              <option value="driver_license">Driver's License</option>
              <option value="national_id">National ID</option>
            </select>
            {errors.document_type && (
              <p className="text-sm text-red-500">{errors.document_type[0]}</p>
            )}
          </div>

          {/* Document Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Document Number</label>
            <Input
              name="document_number"
              value={formData.document_number}
              onChange={handleChange}
              readOnly={!isFormEditable}
            />
            {errors.document_number && (
              <p className="text-sm text-red-500">{errors.document_number[0]}</p>
            )}
          </div>

          {/* Document Upload */}
          {!isFormEditable ? (
            documentPreview ? (
              <div>
                <label className="block text-sm font-medium mb-1">Uploaded Document</label>
                <img src={documentPreview} alt="Document" className="mt-2 max-h-48 border rounded" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No document uploaded.</p>
            )
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Upload ID Document</label>
              <input
                type="file"
                name="document_image"
                accept="image/*,application/pdf"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {documentPreview && (
                <img
                  src={documentPreview}
                  alt="Document Preview"
                  className="mt-2 max-h-48 border rounded"
                />
              )}
              {errors.document_image && (
                <p className="text-sm text-red-500">{errors.document_image[0]}</p>
              )}
            </div>
          )}

          {/* Selfie Capture */}
          {!isFormEditable ? (
            formData.selfie ? (
              <div>
                <label className="block text-sm font-medium mb-1">Submitted Selfie</label>
                <img
                  src={formData.selfie}
                  alt="Selfie"
                  className="mt-2 w-32 h-32 object-cover rounded-full border"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No selfie submitted.</p>
            )
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Capture Selfie with ID</label>
              <SelfieCapture onCapture={handleCaptureSelfie} />
              {formData.selfie && (
                <img
                  src={formData.selfie}
                  alt="Selfie Preview"
                  className="mt-2 w-32 h-32 object-cover square-full border"
                />
              )}
              {errors.selfie && (
                <p className="text-sm text-red-500">{errors.selfie[0]}</p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          {isFormEditable ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting
                ? "Submitting..."
                : canResubmit
                ? "Resubmit"
                : "Submit"}
            </Button>
          ) : (
            <Button disabled variant="outline" className="cursor-default text-gray-700">
              Submitted
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}