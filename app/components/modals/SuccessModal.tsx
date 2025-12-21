interface SuccessModalProps {
    title: string
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({title, message, isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full text-center border border-green-500">
        <h2 className="text-xl font-semibold mb-4 text-green-600">{title}</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
