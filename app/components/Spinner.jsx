export default function Spinner({ className = "py-32" }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}