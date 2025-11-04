export function Button({ children, variant = 'primary', size = 'sm', className = '', ...props }) {
  
  // Base Bootstrap class
  const baseStyles = "btn";

  // Map variants to Bootstrap classes
  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-outline-light" // Using outline-light for the white border/text
  };

  // Map sizes to Bootstrap classes
  const sizeStyles = {
    sm: "btn-sm",
    lg: "btn-lg"
  };

  // Combine all classes
  const finalClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className // Pass through any extra classes
  ].join(' ').trim(); // Join with spaces

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  )
}