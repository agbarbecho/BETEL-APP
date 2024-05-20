export function Button({ children, ...props}) {
  return (
    <button className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible: outline-offset-2  focuus visible: outline-indigo-500  disabled:cursor-not-allowed" {...props}>
      {children}
    </button>
  );
}


export default Button;