// UploadCard.tsx
import React, { useEffect, useMemo } from "react";

interface Props {
    title: string;
    file: File | null;
    onClick: () => void;
    onRemove: () => void;
}

const UploadCard = ({ title, file, onClick, onRemove }: Props) => {
    const isImage = file?.type.startsWith("image/");
    const previewUrl = useMemo(() => {
        if (file && isImage) return URL.createObjectURL(file);
        return null;
    }, [file, isImage]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer h-40 border-2 border-dashed border-orange-400 flex flex-col items-center justify-center rounded-lg hover:bg-orange-50 transition overflow-hidden"
        >
            {file ? (
                <>
                    {isImage ? (
                        <img
                            src={previewUrl!}
                            alt={title}
                            className="absolute inset-0 object-cover w-full h-full"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">📄</span>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 flex justify-between items-center">
                        <span className="truncate">{file.name}</span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove();
                            }}
                            className="ml-2 text-red-300 hover:text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="text-orange-500 text-xl">＋</span>
                    <span className="mt-2 text-sm text-orange-600 font-semibold text-center">
                        {title}
                    </span>
                </>
            )}
        </div>
    );
};

export default React.memo(UploadCard);
