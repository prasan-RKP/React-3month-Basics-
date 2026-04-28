import React, { useEffect } from 'react'

const Modal = ({ isOpen, setIsOpen, children }) => {

    const onClose = () => setIsOpen(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen]);

    if (!isOpen) return null;

    


    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose} // outside click
        >
            <div
                className="bg-gray-900 p-6 rounded-lg min-w-[300px]"
                onClick={(e) => e.stopPropagation()} // prevent close
            >

                {children}

            </div>
        </div>
    )
}

export default Modal
