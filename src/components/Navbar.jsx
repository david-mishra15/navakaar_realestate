import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logoReal.jpeg";
import Button from "./Button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: "Buy Property", path: "/buy-property" },
    {
      title: "Sell Property",path: "/sell-industrial-plot"},
      // dropdown: [
      //   { label: "List  Property for Sell",  },
      //   // { label: "Property Sell", path: "/sell-property-admin" },
      // ],

    {
      title: "Rent",
      dropdown: [
        { label: "Required on rent", path: "/required-on-rent" },
        { label: "Rent your property", path: "/rent-on-property" },
      ],
    },
    // {
    //   title: "OffPlan",
    //   dropdown: [{ label: "Upcoming Projects", path: "/UpComingProject" }],
    // },
    // {
    //   title: "Services",
    //   dropdown: [
    //     { label: "Property Management", path: "/PropertyManagement" },
    //     { label: "Legal Assistance", path: "/LegalAssistance" },
    //   ],
    // },
    // { title: "Blog", path: "/blogs" },
    // {
    //   title: "About Us",
    //   dropdown: [{ label: "Our Teams", path: "/about-us" }],
    // },
    { title: "Contact Us", path: "/contact-us" },
  ];

  const toggleMobileDropdown = (index) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActive = (path) => location.pathname === path;
  const isDropdownActive = (item) =>
    item.dropdown?.some((d) => isActive(d.path));

  // Scroll effect: shrink + hairline once past the top
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On the home page the header floats transparently over the hero image
  // until the visitor scrolls (or opens the mobile menu).
  const overHero = location.pathname === "/" && !active && !menuOpen;

  const linkTone = overHero
    ? "text-white/85 hover:text-white"
    : "text-muted hover:text-ink";
  const activeTone = overHero ? "text-white" : "text-ink";

  return (
    <nav
      className={`fixed w-full z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-editorial border-b ${
        overHero
          ? "bg-transparent border-white/15"
          : "bg-paper/95 backdrop-blur-md border-line"
      }`}
    >
      <div className="container-site">
        <div
          className={`flex items-center justify-between transition-[height] duration-500 ease-editorial ${
            active ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-3"
            aria-label="Navkaar — home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Navkaar Logo"
              className={`rounded-sm object-cover bg-white transition-all duration-500 ease-editorial ${
                active ? "h-10 w-10" : "h-12 w-12"
              }`}
            />
            <span className="flex flex-col leading-none">
              <span
                className={`font-display font-semibold text-[22px] tracking-[0.01em] transition-colors duration-500 ${
                  overHero ? "text-white" : "text-ink"
                }`}
              >
                Navkaar
              </span>
              <span
                className={`mt-1 font-sans font-medium text-[9px] uppercase tracking-[0.28em] transition-colors duration-500 ${
                  overHero ? "text-white/70" : "text-muted"
                }`}
              >
                A Real Estate Co.
              </span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-9 text-[13px] font-medium tracking-[0.04em]">
            {navItems.map((item, index) => {
              const current = isActive(item.path) || isDropdownActive(item);
              return (
                <li key={index} className="relative group">
                  <button
                    type="button"
                    className={`relative flex items-center gap-1.5 py-2 transition-colors duration-300 ${
                      current ? activeTone : linkTone
                    }`}
                    onClick={() =>
                      !item.dropdown && item.path && navigate(item.path)
                    }
                    aria-haspopup={item.dropdown ? "true" : undefined}
                  >
                    <span>{item.title}</span>
                    {item.dropdown && (
                      <ChevronDown
                        size={14}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                      />
                    )}
                    {/* Underline indicator */}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px w-full origin-left bg-current transition-transform duration-500 ease-editorial ${
                        current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {item.dropdown && (
                    <div className="absolute left-1/2 top-full pt-3 -translate-x-1/2 w-60 z-50 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300 ease-editorial">
                      <ul className="bg-white border border-line rounded-sm shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] py-2">
                        {item.dropdown.map((dropItem, idx) => (
                          <li key={idx} className="block">
                            <button
                              type="button"
                              onClick={() => navigate(dropItem.path)}
                              className={`w-full text-left flex items-center justify-between px-5 py-3 text-[13px] transition-colors duration-200 ${
                                isActive(dropItem.path)
                                  ? "text-ink bg-stone"
                                  : "text-muted hover:text-ink hover:bg-stone"
                              }`}
                            >
                              {dropItem.label}
                              <span aria-hidden="true" className="text-subtle">→</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Get In Touch Button (Desktop) */}
          <div className="hidden lg:block">
            <Button
              to="/contact-us"
              variant={overHero ? "light" : "primary"}
              className="!py-2.5 !px-6 !text-[12px]"
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2.5 -mr-2.5 transition-colors ${
                overHero ? "text-white" : "text-ink"
              }`}
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-[14px] relative">
                <span
                  className={`block absolute left-0 h-px w-6 bg-current transform transition duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 top-[7px]" : "top-0"
                  }`}
                ></span>
                <span
                  className={`block absolute left-0 h-px bg-current transform transition-all duration-300 ease-in-out top-[7px] ${
                    menuOpen ? "opacity-0 w-6" : "w-4"
                  }`}
                ></span>
                <span
                  className={`block absolute left-0 h-px w-6 bg-current transform transition duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 top-[7px]" : "top-[14px]"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden bg-paper transition-[max-height] duration-500 ease-editorial ${
          menuOpen ? "max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line" : "max-h-0"
        }`}
      >
        <ul className="container-site flex flex-col py-4">
          {navItems.map((item, index) => (
            <li key={index} className="relative block w-full border-b border-line">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(index)}
                    className="flex items-center justify-between w-full py-4 font-display text-2xl text-ink"
                    aria-expanded={!!mobileDropdownOpen[index]}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.5}
                      className={`text-muted transition-transform duration-300 ${
                        mobileDropdownOpen[index] ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileDropdownOpen[index] ? "max-h-60 pb-3" : "max-h-0"
                    }`}
                  >
                    {item.dropdown.map((dropItem, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileDropdownOpen({});
                          navigate(dropItem.path);
                        }}
                        className={`flex w-full items-center justify-between py-2.5 pl-4 text-left text-sm transition-colors ${
                          isActive(dropItem.path) ? "text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        {dropItem.label}
                        <span aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setMobileDropdownOpen({});
                    navigate(item.path);
                  }}
                  className={`flex w-full items-center justify-between py-4 text-left font-display text-2xl transition-colors ${
                    isActive(item.path) ? "text-ink" : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {item.title}
                  {isActive(item.path) && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                </button>
              )}
            </li>
          ))}

          {/* Get In Touch (Mobile) */}
          <li className="w-full pt-6 pb-2">
            <Link
              to="/contact-us"
              className="btn-primary w-full"
              onClick={() => setMenuOpen(false)}
            >
              Get In Touch
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
