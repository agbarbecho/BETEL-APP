export function Card({ children, className }) {
  return (
    <div className={`bg-zinc-900 p-10 rounded-md shadow-lg ${className}`}>{children}</div>
  );
}

export default Card;
