export default function SaraburiSpinner({ className }: { className?: string }) {
    return (
      <div className={`flex ${className}`}>
        <div className={`w-6 h-6 border-4 border-gray-300 border-t-transparent rounded-full animate-spin-slow`}></div>
      </div>
    );
  }