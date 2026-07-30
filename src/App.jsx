import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { IntroProvider } from "./context/IntroContext";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./layouts/HomePage";
import ContactPage from "./pages/ContactUs";
import OurTeam from "./pages/OurTeam";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import DashboardPage from "./pages/admin/AdminDashboard";
import BannerPage from "./pages/admin/banners";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminAddProperty from "./pages/admin/lxyAdminAddProperty";
import Blog from "./pages/Blog";
import LatestProjects from "./pages/admin/LatestProject";
import LuxuryDetails from "./pages/LuxuryDetails";
import LatestDetails from "./pages/LatestDetails";
import BlogDetails from "./pages/BlogDetails";
import AdminlxyGallery from "./pages/admin/lxydetail";
import AdminLatestProjects from "./pages/admin/latestprojectdetails";
import BlogsAdmin from "./pages/admin/Blogs";
import DreamDetails from "./pages/DreamDetails";
import AdminCategories from "./pages/admin/AdminCategories";
import UpComingProject from "./pages/UpComingProject";
import PropertyManagement from "./pages/PropertyManagement";
import LegalAssistance from "./pages/LegalAssistance";
import AdminProjects from "./pages/admin/upcomingProject";
import SellProperty from "./pages/SellProperty";
import ApartmentSell from "./pages/ApartmentSell";
import Villa from "./pages/Villa";
import RentApartment from "./pages/RentApartment";
import RentVilla from "./pages/RentVilla";
import AdminVilla from "./pages/admin/AdminVilla";
import AdminApartment from "./pages/admin/AdminApartment";
import AdminApartmentForSale from "./pages/admin/AdminApartmentForSale";
import AdminVillaSale from "./pages/admin/AdminVillaSale";
import RentVillaDetails from "./pages/RentVillaDetails";
import RentApartmentDetails from "./pages/RentApartmentDetails";
import ApartmentSellDetails from "./pages/ApartmentSellDetails";
import VillaDetails from "./pages/VillaDetails";
import AdminApartmentGallery from "./pages/admin/AdminApartmentGallery";
import AdminVillaDetails from "./pages/admin/AdminVillaDetails";
import AdminVillaImages from "./pages/admin/AdminVillaImages";
import AdminApartmentDetails from "./pages/admin/AdminApartmentDetails";
import BuyPropertyTabs from "./pages/BuyPropertyTabs";
import AdminIndustrialForm from "./pages/admin/AdminIndustrialForm";
import PropertyDetails from "./pages/moredetailsproperty";
import AdminSellGallery from "./pages/admin/AdminSellGallery";
import AdminresidentialForm from "./pages/admin/adminresidential";
import AdminresidentialSellGallery from "./pages/admin/residentialsellgallery";
import MoreresidentialDetailsProperty from "./pages/residentialmoredetail";
import AdminflatsForm from "./pages/admin/adminsellflats";
import AdminflatsGallery from "./pages/admin/Adminsellflatsgellery";
import MoreDetailsflatsProperty from "./pages/sellflatsmoredetails";
import CommercialSpaces from "./pages/admin/AdminCommercial";
import MoreDetailsComercial from "./pages/commercialmoredetails";
import AdminCommercialGallery from "./pages/admin/AdminCommercialGellery";
import SellIndustrialPlot from "./pages/sellindustrialplot";
import IndustrialPlotsPage from "./pages/admin/IndustrialPlotsPage";
import ResidentialPlotsPage from "./pages/admin/ResidentialPlotsPage";
import FlatsPage from "./pages/admin/FlatsPage";
import CommercialSpacesPage from "./pages/admin/CommercialSpacesPage";
import AdminIndustrialList from "./pages/admin/AdminsellAddIndustrialPlot";
import SellPropertyCards from "./pages/ViewSellPropertaddbyadmin";
import AdminIndustrialPlots from "./pages/admin/AdminIndustrialPlots";
import MoreDetailsaddindstrial from "./pages/ViewSellPropertaddbyadmindetails";
import ResidentialList from "./pages/admin/AdminsellAddResidentialPlot";
import AdminResidentialPlots from "./pages/admin/AdminresidentialPlots";
import MoreDetailsaddresidential from "./pages/ViewSellPropertaddbyadminresidential";
import AdminSelladdFlats from "./pages/admin/AdminsellAddFlats";
import AdminFlatDetails from "./pages/admin/Adminflatsdetails";
import MorereflatsDetailsProperty from "./pages/flatsmoredetail";
import AdminSellCommercial from "./pages/admin/AdminSellCommercial";
import AdminCommercialGalleryy from "./pages/admin/AdminCommercialGallery";
import MoreDetailscomrsial from "./pages/sellcomrsialdetails";
import RequiredPropertyCards from "./pages/RequiredonRent";
import ViewRequiredonrent from "./pages/admin/viewrequiredonrent";
import RentyourPropertyCards from "./pages/Rentyourproperty";
import AdminViewVillas from "./pages/admin/admin-rent-on-villa";
import AdminViewflats from "./pages/admin/admi-rent-on-flats";
import AdminRentyourProperty from "./pages/admin/adminpostvilaarent";
import AdminPostRentFlats from "./pages/admin/AdminPostRentFlats";
import AdminPostWarehouses from "./pages/admin/AdminPostWarehouses";
import AdminrentpostShops from "./pages/admin/AdminpostrentShops";
import AdminrentpostFactories from "./pages/admin/AdminrentpostFactories";
import AdminrentonWarehouses from "./pages/admin/admin-rent-on-warehouse";
import AdminRentOnShops from "./pages/admin/admin-rent-on-shop";
import AdminRentOnFactories from "./pages/admin/admin-rent-on-factory";
import AdminRentOnOtherProperties from "./pages/admin/admin-rent-on-other";
import ContactPopup from "./pages/PopupContact";
import AdminVillaForm from "./pages/admin/AdminVillaForm";
import MoreDetailsVilla from "./pages/MoreDetailsVilla";
import AdminVillaGallery from "./pages/admin/AdminVillaGallery";


export default function App() {
  return (
    <IntroProvider>
    <Router>
      <Routes>
        {/* ===== User Routes ===== */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact-popup" element={<ContactPopup />} />
          <Route path="contact-us" element={<ContactPage />} />
          <Route path="about-us" element={<OurTeam />} />
          <Route path="Blogs" element={<Blog />} />
          <Route path="LuxuryDetails/:id" element={<LuxuryDetails />} />
          <Route path="LatestDetails/:id" element={<LatestDetails />} />
          <Route path="/BlogDetails/:id" element={<BlogDetails />} />
          <Route path="DreamDetails/:id" element={<DreamDetails />} />
          <Route path="UpComingProject" element={<UpComingProject />} />
          <Route path="PropertyManagement" element={<PropertyManagement />} />
          <Route path="LegalAssistance" element={<LegalAssistance />} />
          <Route path="SellProperty" element={<SellProperty />} />
          <Route path="apartmentSell" element={<ApartmentSell />} />
          <Route path="buy-property" element={<BuyPropertyTabs />} />

          <Route
            path="/apartment-for-sale/:id"
            element={<ApartmentSellDetails />}
          />
          <Route path="villa" element={<Villa />} />
          <Route path="/villa-for-sale/:id" element={<VillaDetails />} />
          <Route path="rent-apartment" element={<RentApartment />} />
          <Route
            path="/rent-apartments/:id"
            element={<RentApartmentDetails />}
          />
          <Route path="rent-villa" element={<RentVilla />} />
          <Route path="/rent-villa-detail/:id" element={<RentVillaDetails />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route
            path="/property-residential-details/:id"
            element={<MoreresidentialDetailsProperty />}
          />
          <Route
            path="/property-flats-details/:id"
            element={<MoreDetailsflatsProperty />}
          />
          <Route
            path="/commercial-details/:id"
            element={<MoreDetailsComercial />}
          />
          <Route path="sell-industrial-plot" element={<SellIndustrialPlot />} />
          <Route path="sell-property-admin" element={<SellPropertyCards />} />
          <Route
            path="/property-industrial-details/:id"
            element={<MoreDetailsaddindstrial />}
          />
          <Route
            path="/property-residentiallist-detailss/:id"
            element={<MoreDetailsaddresidential />}
          />
          <Route
            path="/property-flatslist-details/:id"
            element={<MorereflatsDetailsProperty />}
          />
           <Route
            path="/property-comrsial-details/:id"
            element={<MoreDetailscomrsial />}
          />
                     <Route
            path="/required-on-rent"
            element={<RequiredPropertyCards />}
          />

                   <Route
            path="/rent-on-property"
            element={<RentyourPropertyCards />}
          />
            <Route path="moredetailsvilla/:id" element={<MoreDetailsVilla/>} />


        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="banner" element={<BannerPage />} />
            <Route path="lxyproperty" element={<AdminAddProperty />} />
            <Route path="latestproject" element={<LatestProjects />} />
            <Route path="LxyPropertyDetails" element={<AdminlxyGallery />} />
            <Route path="upcomingproject" element={<AdminProjects />} />
            <Route path="rentvilla" element={<AdminVilla />} />
            <Route path="rentapartment" element={<AdminApartment />} />
            <Route
              path="apartmentforsale"
              element={<AdminApartmentForSale />}
            />
            <Route
              path="sellappartmentdetails"
              element={<AdminApartmentDetails />}
            />

            <Route
              path="latestprojectDetails"
              element={<AdminLatestProjects />}
            />
            <Route path="blogs" element={<BlogsAdmin />} />
            <Route path="DreamHouse" element={<AdminCategories />} />
            <Route path="sellaprtment" element={<AdminApartmentGallery />} />
            <Route path="sellvilldetails" element={<AdminVillaDetails />} />
            <Route path="rentvilladetails" element={<AdminVillaImages />} />
            <Route
              path="sellappartmentdetails"
              element={<AdminApartmentDetails />}
            />
            <Route path="villasale" element={<AdminVillaSale />} />
            <Route path="industrial" element={<AdminIndustrialForm />} />
            <Route path="sellgallery" element={<AdminSellGallery />} />
            <Route path="residential" element={<AdminresidentialForm />} />
            <Route
              path="residentialsellgallery"
              element={<AdminresidentialSellGallery />}
            />
            <Route path="flats" element={<AdminflatsForm />} />
            <Route path="sellflatsgallery" element={<AdminflatsGallery />} />
            <Route path="commercialspaces" element={<CommercialSpaces />} />
            <Route
              path="admincommercialspaces"
              element={<AdminCommercialGallery />}
            />
            <Route path="industrialplots" element={<IndustrialPlotsPage />} />
            <Route path="residentialplots" element={<ResidentialPlotsPage />} />
            <Route path="flatsdetails" element={<FlatsPage />} />
            <Route
              path="commercialspacesdetails"
              element={<CommercialSpacesPage />}
            />
            <Route path="addindustrialplot" element={<AdminIndustrialList />} />
            <Route
              path="industrialplotslist"
              element={<AdminIndustrialPlots />}
            />
            <Route path="addresidentialplot" element={<ResidentialList />} />
            <Route path="residentialplotslist" element={<AdminResidentialPlots />} />
            <Route path="adminaddflats" element={<AdminSelladdFlats />} />
            <Route path="flatslist" element={<AdminFlatDetails />} />
            <Route path="sellcommercial" element={<AdminSellCommercial />} />
            <Route path="commercialspaceslist" element={<AdminCommercialGalleryy />} />
            <Route path="commercialspaceslist" element={<AdminCommercialGalleryy />} />
            <Route path="viewrequiredonrent" element={<ViewRequiredonrent />} />
            <Route path="adminviewrentonrequre" element={<AdminViewVillas/>} />
            <Route path="adminviewrentflats" element={<AdminViewflats/>} />
            <Route path="adminviewrentonwarehouse" element={<AdminrentonWarehouses/>} />
            <Route path="adminviewrentonshops" element={<AdminRentOnShops/>} />
            <Route path="AdminPostRentVillas" element={<AdminRentyourProperty/>} />
            <Route path="AdminPostRentFlats" element={<AdminPostRentFlats/>} />
            <Route path="AdminPostWarehouses" element={<AdminPostWarehouses/>} />
            <Route path="AdminPostRentShops" element={<AdminrentpostShops/>} />
            <Route path="AdminPostRentFactories" element={<AdminrentpostFactories/>} />
            <Route path="adminviewrentonfactories" element={<AdminRentOnFactories/>} />
            <Route path="adminviewrentonotherproperties" element={<AdminRentOnOtherProperties/>} />
            <Route path="adminvillsellonvillas" element={<AdminVillaForm/>} />
            <Route path="adminvillagallery" element={<AdminVillaGallery/>} />
          </Route>
        </Route>

        {/* ===== Fallback ===== */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </IntroProvider>
  );
}
