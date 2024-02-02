import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useStore } from './customHooks/auth';
import MyForm from './components/forms/Listings';
import LoginForm from './components/forms/auth/Login';
import RegisterForm from './components/forms/auth/Register';
import Listing from './components/Listings';
import ProtectedRoute from './components/ProtectedRoutes';
import Profile from './components/Profile';
import './App.css';
// import MobileMenu from './components/menu';
// import HamburgerMenu from './components/menu/HamburgerMenu';
// import SearchBox from './components/search';
import ListingDetail from './components/ListingsDetails';
import StepSeven from './components/forms/Listings/steps/StepSeven';
import ListingByOwner from './components/ListingByOwner';
import Home from './components/Home';
import AddProperty from './components/MyProperties';

// const Navigation = () => {
//   const location = useLocation();

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column"
//     }}>
//       {location.pathname !== '/login' && location.pathname !== '/registration' && <HamburgerMenu />}
//       {/* {location.pathname !== '/login' && location.pathname !== '/registration' && <MobileMenu />} */}
//       {/* <SearchBox /> */}

//     </div>
//   );
// }
window.global = window;
const App = () => {
  window.global = window;
  return (
    <Router>
      {/* {
        location.pathname !== '/add-property' && <Navigation />
      } */}

      <div className="content">
        {/* {(location.pathname === '/' || location.pathname !== '/listings') && <SearchBox />} */}
        {/* <Features
        featureObj={
          [
            { icon: 'bed', text: '2 beds' },
            { icon: 'bath', text: '2 baths' },
            { icon: 'car', text: '1 car garage' },
          ]
        }
        showAll={true}
          
        /> */}
        <Routes>
        <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/add-property" element={<MyForm />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/listings/by-owner" element={<ListingByOwner />} />
          <Route path="/listing/:id" element={<ListingDetail/>} />
         <Route path="/success" element={<StepSeven />} />
         <Route path="/my-listings" element={<AddProperty />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;