export function Label({ children, htmlFor }) {
  return (
    <label
      className="block text-sm font-semibold text-white-900 "
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;
