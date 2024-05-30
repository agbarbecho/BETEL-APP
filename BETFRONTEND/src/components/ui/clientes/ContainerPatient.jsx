// src/components/ui/ContainerClient.jsx
export function ContainerPatient({ children, className }) {
    return (
      <div className={`w-full ${className || ""}`}>
        {children}
      </div>
    );
  }
  
  export default ContainerPatient;
  