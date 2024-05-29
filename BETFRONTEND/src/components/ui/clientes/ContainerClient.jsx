// src/components/ui/ContainerClient.jsx
export function ContainerClient({ children, className }) {
    return (
      <div className={`w-full ${className || ""}`}>
        {children}
      </div>
    );
  }
  
  export default ContainerClient;
  