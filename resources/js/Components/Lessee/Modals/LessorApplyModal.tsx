import React from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";

interface LessorApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  submitForm: number; // 0 = not submitted, 1 = submitted
}

export default function LessorApplyModal({
  isOpen,
  onClose,
  onProceed,
  submitForm,
}: LessorApplyModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-lg font-bold text-orange-600 mb-4">
            {submitForm === 1 ? "Request Pending" : "Become a Lessor"}
          </Dialog.Title>

          {submitForm === 1 ? (
            <p className="text-sm text-gray-700">
              Thank you for submitting your application. Our team is currently reviewing your
              request. We’ll notify you as soon as it has been verified by the administrator.
              We appreciate your patience!
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-700 mb-4">
                You're just one step away from listing your space. Complete your business details
                and submit your documents to become a verified lessor.
              </p>
              <button
                onClick={onProceed}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition"
              >
                Proceed to Form
              </button>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
