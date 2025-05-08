export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 text-red-700 p-2 rounded mt-4">
      ⚠️ {message}
    </div>
  );
}
