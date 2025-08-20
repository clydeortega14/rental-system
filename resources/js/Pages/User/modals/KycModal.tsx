import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/Lessor/ui/dialog";
import { Button } from "@/Components/Lessor/ui/button";
import { Input } from "@/Components/Lessor/ui/input";
import { Badge } from "@/Components/Lessor/ui/badge";
import { useToast } from "@/hooks/use-toast";
import SelfieCapture from "@/Pages/User/SelfieCapture";
import { useForm } from "@inertiajs/react";

export interface UserKyc {
  full_name: string;
  document_number: string;
  document_type: string;
  selfie_path?: string;
  document_path?: string;
  kyc_status?: "Pending" | "Approved" | "Rejected";
}

interface KycModalProps {
  user_id: number;
  userKyc?: UserKyc;
  isReadOnly?: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function KycModal({
  user_id,
  userKyc,
  isReadOnly = false,
  onClose,
  onUpdate,
}: KycModalProps) {
  const { toast } = useToast();

  const canResubmit = userKyc?.kyc_status === "Rejected";
  const isNewKyc = !userKyc;
  const isFormEditable = !isReadOnly || isNewKyc || canResubmit;

  // Initialize form with useForm
  const form = useForm({
    full_name: userKyc?.full_name || "",
    document_type: userKyc?.document_type || "",
    document_number: userKyc?.document_number || "",
    document_image: null as File | null,
    selfie: userKyc?.selfie_path ? `/storage/${userKyc.selfie_path}` : "",
  });

  const [documentPreview, setDocumentPreview] = useState<string | null>(
    userKyc?.document_path ? `/storage/${userKyc.document_path}` : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "document_image" && files?.length) {
      const file = files[0];
      form.setData("document_image", file);
      setDocumentPreview(URL.createObjectURL(file));
    } else {
      form.setData(name, value);
    }
  };

  // Capture selfie from component
  const handleCaptureSelfie = (base64: string) => {
    form.setData("selfie", base64);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const data = new FormData();
    data.append("user_id", String(user_id));
    data.append("full_name", form.data.full_name);
    data.append("document_type", form.data.document_type);
    data.append("document_number", form.data.document_number);
    if (form.data.document_image) data.append("document_image", form.data.document_image);
      data.append("selfie", form.data.selfie);
    if (canResubmit) data.append("kyc_status", "Pending");

    form.post("/user/kyc", {
      forceFormData: true,
      onSuccess: () => {
        toast({
          title: "KYC Submitted",
          description: "Your verification request has been submitted.",
        });
        onClose();
        onUpdate?.();
      },
      onError: (event) => {
        // Type assertion to tell TS that errors are a record of field -> string[]
        const errs = (event as any).detail?.errors as Record<string, string[]> | undefined;

        if (errs) {
          Object.entries(errs).forEach(([key, messages]) => {
            form.setError(key as keyof typeof form.data, messages.join(" "));
          });
        }

        toast({
          title: "Submission Failed",
          description: "Please check the form and try again.",
          variant: "destructive",
        });
      },
      onFinish: () => setIsSubmitting(false),
    });
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              name="full_name"
              value={form.data.full_name}
              onChange={handleChange}
              readOnly={!isFormEditable}
            />
            {form.errors.full_name && (
              <p className="text-sm text-red-500">{form.errors.full_name[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Document Type</label>
            <select
              name="document_type"
              value={form.data.document_type}
              onChange={handleChange}
              disabled={!isFormEditable}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="passport">Passport</option>
              <option value="driver_license">Driver's License</option>
              <option value="national_id">National ID</option>
            </select>
            {form.errors.document_type && (
              <p className="text-sm text-red-500">{form.errors.document_type[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Document Number</label>
            <Input
              name="document_number"
              value={form.data.document_number}
              onChange={handleChange}
              readOnly={!isFormEditable}
            />
            {form.errors.document_number && (
              <p className="text-sm text-red-500">{form.errors.document_number[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload ID Document</label>
            {isFormEditable ? (
              <input
                type="file"
                name="document_image"
                accept="image/*,application/pdf"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : documentPreview ? (
              <img
                src={documentPreview}
                className="mt-2 max-h-48 border rounded"
                alt="Document"
              />
            ) : (
              <p className="text-sm text-gray-500">No document uploaded.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capture Selfie</label>
            {isFormEditable ? (
              <SelfieCapture onCapture={handleCaptureSelfie} />
            ) : form.data.selfie ? (
              <img
                src={form.data.selfie}
                className="mt-2 w-32 h-32 rounded-full border"
                alt="Selfie"
              />
            ) : (
              <p className="text-sm text-gray-500">No selfie submitted.</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end mt-6">
          {isFormEditable ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : canResubmit ? "Resubmit" : "Submit"}
            </Button>
          ) : (
            <Button disabled variant="outline" className="cursor-default text-gray-700">
              Submitted
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
