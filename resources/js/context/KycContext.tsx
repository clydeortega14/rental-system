import React, { useContext, createContext, useState} from "react";

interface IKyc {
    showKycModal: boolean;
    setShowKycModal: (d: boolean) => void;
}

const KycContext = createContext<IKyc | undefined>(undefined);
 
export const KycProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [ showKycModal, setShowKycModal] = useState<boolean>(false);

    return (
        <KycContext.Provider value={{ 
            showKycModal,
            setShowKycModal
         }}>
            {children}
        </KycContext.Provider>
    );
}

export const useKyc = (): IKyc => {
  const context = useContext(KycContext);
  if (context === undefined) {
    throw new Error('useKyc must be used within a CartProvider');
  }
  return context;
};