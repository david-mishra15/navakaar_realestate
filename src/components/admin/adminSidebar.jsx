import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Settings, Image } from "lucide-react";

export default function AdminSidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    { name: "Banner", icon: <Image size={20} />, path: "/admin/banner" },
    {
      name: "LxyProperty",
      icon: <Image size={20} />,
      path: "/admin/lxyProperty",
    },
    {
      name: "LxyPropertyDetails",
      icon: <Image size={20} />,
      path: "/admin/lxyPropertydetails",
    },
    {
      name: "latestproject",
      icon: <Image size={20} />,
      path: "/admin/latestProject",
    },
    {
      name: "latestprojectDetails",
      icon: <Image size={20} />,
      path: "/admin/latestProjectdetails",
    },
    // { name: "blogs", icon: <Image size={20} />, path: "/admin/blogs" },
    {
      name: "Categories",
      icon: <Image size={20} />,
      path: "/admin/DreamHouse",
    },
    // {
    //   name: "upcomingproject",
    //   icon: <Image size={20} />,
    //   path: "/admin/upcomingproject",
    // },
    // {
    //   name: "villa for Rent",
    //   icon: <Image size={20} />,
    //   path: "/admin/rentvilla",
    // },
    // {
    //   name: "Apartment for rent",
    //   icon: <Image size={20} />,
    //   path: "/admin/rentapartment",
    // },
    // {
    //   name: "Apartment for sale",
    //   icon: <Image size={20} />,
    //   path: "/admin/apartmentforsale",
    // },
    // {
    //   name: "villa for sale",
    //   icon: <Image size={20} />,
    //   path: "/admin/villasale",
    // },
    // {
    //   name: "apartment for sale details",
    //   icon: <Image size={20} />,
    //   path: "/admin/sellaprtment",
    // },
    // {
    //   name: "villa for sale details",
    //   icon: <Image size={20} />,
    //   path: "/admin/sellvilldetails",
    // },
    //     {
    //   name: "villa for rent details",
    //   icon: <Image size={20} />,
    //   path: "/admin/rentvilladetails",
    // },
    //     {
    //   name: "appartment for rent details",
    //   icon: <Image size={20} />,
    //   path: "/admin/sellappartmentdetails",
    // },
    {
      name: "Buy-Industrial-plot",
      icon: <Image size={20} />,
      path: "industrial",
    },
    {
      name: "Buy-Industrial-plot-Gallery",
      icon: <Image size={20} />,
      path: "sellgallery",
    },
    {
      name: "Buy-residential-plot",
      icon: <Image size={20} />,
      path: "residential",
    },
    {
      name: "Buy-residential-plot-Gallery",
      icon: <Image size={20} />,
      path: "residentialsellgallery",
    },
    {
      name: "Buy-flats",
      icon: <Image size={20} />,
      path: "flats",
    },
    {
      name: "Buy-flats-gallery",
      icon: <Image size={20} />,
      path: "sellflatsgallery",
    },
    {
      name: "Buy-commercialspaces",
      icon: <Image size={20} />,
      path: "commercialspaces",
    },
    {
      name: "Buy-commercialspaces-Gallery",
      icon: <Image size={20} />,
      path: "admincommercialspaces",
    },

 {
      name: "Buy-villa",
      icon: <Image size={20} />,
      path: "adminvillsellonvillas",
    },
    {
      name: "Buy-villa-Gallery",
      icon: <Image size={20} />,
      path: "adminvillagallery",
    },



    {
      name: "User-Sell-list-industrialplots",
      icon: <Image size={20} />,
      path: "industrialplots",
    },
    {
      name: "User-sell-list-residentialplots",
      icon: <Image size={20} />,
      path: "residentialplots",
    },
    {
      name: "User-sell-list-flats",
      icon: <Image size={20} />,
      path: "flatsdetails",
    },
    {
      name: "User-sell-list-commercialspaces",
      icon: <Image size={20} />,
      path: "commercialspacesdetails",
    },
    {
      name: "Admin-sell-list-industrial",
      icon: <Image size={20} />,
      path: "addindustrialplot",
    },
    {
      name: "Admin-sell-list-industrial-Gallery",
      icon: <Image size={20} />,
      path: "industrialplotslist",
    },
    {
      name: "Admin-sell-list-residential",
      icon: <Image size={20} />,
      path: "addresidentialplot",
    },
    {
      name: "Admin-sell-list-residential-Gallery",
      icon: <Image size={20} />,
      path: "residentialplotslist",
    },
    {
      name: "Admin-sell-list-Flats",
      icon: <Image size={20} />,
      path: "adminaddflats",
    },
    {
      name: "Admin-sell-list-Flats-Gallery",
      icon: <Image size={20} />,
      path: "flatslist",
    },
    {
      name: "Admin-sell-list-Commercial",
      icon: <Image size={20} />,
      path: "sellcommercial",
    },
    {
      name: "Admin-sell-list-Commercial-Gallery",
      icon: <Image size={20} />,
      path: "commercialspaceslist",
    },
    {
      name: "Required-on-rent-list",
      icon: <Image size={20} />,
      path: "viewrequiredonrent",
    },
    {
      name: "Rent-on-your-villa-list",
      icon: <Image size={20} />,
      path: "adminviewrentonrequre",
    },
    {
      name: "Rent-on-your-flats-list",
      icon: <Image size={20} />,
      path: "adminviewrentflats",
    },
    {
      name: "Rent-on-your-Shop-list",
      icon: <Image size={20} />,
      path: "adminviewrentonshops",
    },
    {
      name: "Rent-on-your-factory-list",
      icon: <Image size={20} />,
      path: "adminviewrentonfactories",
    },
    {
      name: "Rent-on-your-Warehouse-list",
      icon: <Image size={20} />,
      path: "adminviewrentonwarehouse",
    },
    {
      name: "Rent-on-your-Other-list",
      icon: <Image size={20} />,
      path: "adminviewrentonotherproperties",
    },
    {
      name: "Admin Post-Rent-your-villa",
      icon: <Image size={20} />,
      path: "AdminPostRentVillas",
    },
    {
      name: "Admin Post-Rent-your-flats",
      icon: <Image size={20} />,
      path: "AdminPostRentFlats",
    },
    {
      name: "Admin Post-Rent-your-warehouses",
      icon: <Image size={20} />,
      path: "AdminPostWarehouses",
    },
        {
      name: "Admin Post-Rent-your-shop",
      icon: <Image size={20} />,
      path: "AdminPostRentShops",
    },
            {
      name: "Admin Post-Rent-your-factories",
      icon: <Image size={20} />,
      path: "AdminPostRentFactories",
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg transform 
      transition-transform duration-300 ease-in-out 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 md:static md:inset-0`}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-center font-bold text-2xl border-b border-indigo-500">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 
                hover:bg-indigo-500 hover:shadow-lg
                ${isActive ? "bg-indigo-500 shadow-lg" : "bg-indigo-700"}`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium text-white">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
