import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn-custom ${variant} ${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;