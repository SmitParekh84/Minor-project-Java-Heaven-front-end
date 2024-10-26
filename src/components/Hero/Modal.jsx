import React from 'react';

const Modal = ({ isOpen, onClose, offer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold text-primary mb-2">{offer.title}</h2>
                <img src={offer.imageUrl} alt={offer.title} className="w-full h-40 rounded-lg object-cover my-4 border border-gray-200" />
                <p className="text-gray-700 text-lg">{offer.description}</p>
                <div className="mt-4 space-y-2">
                    <p className="text-gray-800 "><strong>Validity:</strong> {offer.validity}</p>
                    <p className="text-gray-800 "><strong>Terms:</strong> {offer.terms}</p>
                    <p className="text-gray-800 "><strong>Additional Info:</strong> {offer.additionalInfo}</p>
                </div>
                <button
                    className="mt-6 bg-secondary text-white py-2 px-4 rounded-lg shadow transition duration-300 hover:bg-secondary-dark hover:shadow-lg"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>

    );
};

export default Modal;
