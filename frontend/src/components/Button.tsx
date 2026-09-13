import  type{ ButtonHTMLAttributes, ReactNode } from "react";
import {forwardRef} from "react"
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  to?: never;
}

interface ButtonAsLink extends BaseProps {
  to: string;
  replace?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  // ✨ Black background primary button
  primary:
    "bg-black hover:bg-gray-900 text-white border border-gray-800 hover:border-gray-700 shadow-lg shadow-black/40",
  secondary:
    "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
  danger:
    "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30",
  ghost:
    "bg-transparent hover:bg-gray-900 text-gray-300 hover:text-white",
  outline:
    "bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-black text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Spinner = ({ size }: { size: Size }) => {
  const dim =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <svg
      className={`animate-spin ${dim}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className = "",
    ...rest
  } = props as ButtonAsButton & { to?: string; replace?: boolean };

  const classes = [
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg",
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <Spinner size={size} />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </>
  );

  if ("to" in props && props.to) {
    const { to, replace } = props as ButtonAsLink;
    return (
      <Link to={to} replace={replace} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={loading || (rest as ButtonAsButton).disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

export default Button;