export function Button({ className = "", variant, children, ...props }) {
  const variantClass = variant === "outline" ? "border bg-white" : "";
  return <button className={`inline-flex items-center justify-center gap-2 ${variantClass} ${className}`} {...props}>{children}</button>;
}
