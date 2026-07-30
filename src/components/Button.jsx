import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-brand-maroon text-white hover:bg-brand-maroonDeep hover:shadow-lg hover:shadow-brand-maroon/25",
  gold: "bg-brand-gold text-white hover:bg-brand-goldSoft hover:shadow-lg hover:shadow-brand-gold/25",
  ghost: "border border-white/60 text-white hover:bg-white/10 hover:border-white",
  outline: "border border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white",
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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5";
  const classes = `${base} ${VARIANTS[variant] || VARIANTS.primary} ${className}`;

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
