export const ErrorText: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="text-red-500 text-sm">{message}</div>
  )
}