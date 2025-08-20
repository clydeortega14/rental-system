import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/Lessor/ui/dialog";
import { Button } from "@/Components/Lessor/ui/button";

interface KycPromptModalProps {
  user: {
    kyc?: {
      full_name: string;
      document_type: string;
      document_number: string;
      selfie_path: string | null;
      document_path: string | null;
      kyc_status: "Pending" | "Approved" | "Rejected" | null;
      kyc_verified: boolean;
      created_at: string;
    };
  };
  onOpenKycModal: () => void;
}

export default function KycPromptModal({
  user,
  onOpenKycModal,
}: KycPromptModalProps) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const kycStatus = user?.kyc?.kyc_status ?? "Not Submitted";
  const kycVerified = user?.kyc?.kyc_verified ?? false;

  const submissionDate = user?.kyc?.created_at
    ? new Date(user.kyc.created_at)
    : null;

  // Calculate days since submission
  const daysSinceSubmission = submissionDate
    ? Math.floor((Date.now() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Open modal only if not verified and not dismissed
  useEffect(() => {
    if (!kycVerified && !dismissed) {
      setOpen(true);
    }
  }, [kycVerified, dismissed]);

  const handleProceed = () => {
    setOpen(false);
    onOpenKycModal();
  };

  const handleLater = () => {
    setOpen(false);
    setDismissed(true);
  };

  if (kycVerified) return null; // Don’t render at all

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl p-6 max-w-md w-full bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-600 text-center">
            {kycStatus === "Pending" ? "KYC Under Review" : "Complete Your KYC"}
          </DialogTitle>
        </DialogHeader>

        <div className="text-gray-700 text-center mt-3 space-y-2">
          {kycStatus === "Pending" ? (
            <>
              <p className="text-base">
                Your KYC submission is currently under review.
              </p>
              {daysSinceSubmission !== null && (
                <p className="text-sm text-gray-500">
                  Submitted {daysSinceSubmission} day
                  {daysSinceSubmission !== 1 ? "s" : ""} ago.
                </p>
              )}
              <p className="text-sm text-gray-500">
                If this takes longer than expected, please{" "}
                <a
                  href="/support"
                  className="text-orange-600 underline hover:text-orange-700"
                >
                  contact customer service
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p className="text-base">
                For your security and to unlock features, please complete your
                KYC verification.
              </p>
              <p className="text-sm text-gray-500">
                It only takes a few minutes. You’ll need a valid ID and a quick
                selfie.
              </p>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-center gap-4 mt-6">
          {kycStatus === "Pending" ? (
            <Button
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Okay
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="px-6 rounded-xl"
                onClick={handleLater}
              >
                Later
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 rounded-xl"
                onClick={handleProceed}
              >
                Start KYC
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
