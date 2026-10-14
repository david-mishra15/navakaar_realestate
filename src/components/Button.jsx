import { Link } from "react-router-dom";

// Variants map onto the monochrome button classes in index.css. The legacy
// names (gold / ghost / outline) are kept so existing call sites still work.
const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
  "outline-light": "btn-outline-light",
  gold: "btn-primary",
  ghost: "btn-outline-light",
  outline: "btn-secondary",
};

/**
 * Shared button used across Navbar / Banner / forms.
 * Renders a react-router <Link> when `to` is given, a plain <a> when `href`
 * is given, otherwise a native <button>.
 */
export default function Button({
  children,
  variant = "primary",
  to,
  href,
  className = "",
  ...props
}) {
  const classes = `${VARIANTS[variant] || VARIANTS.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
