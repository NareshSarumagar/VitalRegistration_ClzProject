export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card p-8 text-center">
      <p className="text-red-600 font-medium mb-2">⚠️ Failed to load data</p>
      <p className="text-gray-500 text-sm mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Retry
        </button>
      )}
    </div>
  );
}