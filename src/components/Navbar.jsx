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

  // Scroll effect: shrink + shadow once past the top
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 bg-brand-paper/90 backdrop-blur-md transition-shadow duration-300 ${
        active ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            active ? "h-16" : "h-24"
          }`}
        >
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-3"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Navkaar Logo"
              className={`rounded-sm object-cover transition-all duration-300 ${
                active ? "h-10 w-10" : "h-14 w-14"
              }`}
            />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-bold text-xl text-brand-ink">
                Navkaar
              </span>
              <span className="font-sans font-medium text-[10px] uppercase tracking-[0.18em] text-brand-maroon">
                A Real Estate Co.
              </span>
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6 font-medium text-brand-ink text-sm">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <div
                  className={`flex items-center gap-1 cursor-pointer px-2 py-2 rounded-sm transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-brand-maroon font-semibold"
                      : "hover:text-brand-maroon"
                  }`}
                  onClick={() =>
                    !item.dropdown && item.path && navigate(item.path)
                  }
                >
                  <span>{item.title}</span>
                  {item.dropdown && <ChevronDown size={16} />}
                </div>

                {/* Dropdown */}
                {item.dropdown && (
                  <ul className="absolute left-0 top-full mt-1 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 invisible group-hover:visible transition-all duration-300 ease-in-out bg-white shadow-lg rounded-sm w-56 z-50">
                    {item.dropdown.map((dropItem, idx) => (
                      <li key={idx} className="block">
                        <button
                          onClick={() => navigate(dropItem.path)}
                          className={`w-full text-left block px-5 py-2.5 text-brand-ink hover:bg-brand-maroon hover:text-white transition-all duration-200 ${
                            isActive(dropItem.path)
                              ? "bg-brand-maroon text-white"
                              : ""
                          }`}
                        >
                          {dropItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Get In Touch Button (Desktop) */}
          <div className="hidden lg:block">
            <Button to="/contact-us" variant="primary" className="!py-2.5 !px-5 !text-xs !rounded-sm">
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-all shadow focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`block absolute h-0.5 w-6 bg-brand-ink transform transition duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 top-2.5" : "top-1"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-brand-ink transform transition duration-300 ease-in-out ${
                    menuOpen ? "opacity-0" : "top-3"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-brand-ink transform transition duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 top-2.5" : "top-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="bg-white shadow-lg font-medium text-gray-700 text-sm flex flex-col p-3 space-y-2">
          {navItems.map((item, index) => (
            <li key={index} className="relative block w-full">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(index)}
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileDropdownOpen[index] ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`pl-4 bg-white rounded-md overflow-hidden transition-all duration-300 ${
                      mobileDropdownOpen[index] ? "max-h-60 py-2" : "max-h-0"
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
                        className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-brand-maroon hover:text-white rounded-md transition-all"
                      >
                        {dropItem.label}
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
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-brand-maroon hover:text-white rounded-md transition-all"
                >
                  {item.title}
                </button>
              )}
            </li>
          ))}

          {/* Get In Touch (Mobile) */}
          <li className="w-full text-center py-2">
            <Link
              to="/contact-us"
              className="inline-block px-4 py-2 text-brand-maroon border border-brand-maroon rounded-md hover:bg-brand-maroon hover:text-white transition-all font-medium"
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
