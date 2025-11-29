import { PaymentMethod } from "@/types/paymentTypes";
import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";


interface IPaymentMethodProps {
    selectedMethod: PaymentMethod;
    setPaymentMethod: (method: string) => void;
}
const PaymentMethodSelector: React.FC = ({selectedMethod, setPaymentMethod}: IPaymentMethodProps) => {

  const methods: { id: PaymentMethod; label: string; description: string }[] = [
    { id: "qrph", label: "QRPh", description: "Pay using QRPh scan & pay." },
    { id: "ewallet", label: "E-wallet", description: "Use GCash, PayMaya, or similar wallets." },
    { id: "bank_transfer", label: "Bank Transfer", description: "Send directly via online banking." },
  ];

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Select Payment Method</h2>
      <div className="space-y-4">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-2xl cursor-pointer transition 
              ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setPaymentMethod(method.id)}
              className="hidden"
            />
            <div className="flex-1">
              <p className="font-medium">{method.label}</p>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedMethod === method.id ? "border-blue-500 bg-blue-500" : "border-gray-400"
              }`}
            >
              {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
          </label>
        ))}
      </div>

      {selectedMethod && (
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            You selected: <span className="font-semibold">{methods.find(m => m.id === selectedMethod)?.label}</span>
          </p>
          {/* <PrimaryButton>Continue</PrimaryButton> */}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
