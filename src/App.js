import './App.css';
import Header from './Components/Header';
import Services from './Components/Services';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Pages/Home';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import ProfileUpdate from './Components/ProfileUpdate';
import Employee from './Components/Employee';
import AppointServiceForm from './Components/AppointServiceForm/AppointServiceForm';
import CarRegistration from './Components/Auto/CarRegistration';
import CarCrud from './Components/Auto/CarCrud';
import CarDetails from './Components/Auto/CarDetails';
import CarUpdate from './Components/Auto/CarUpdate';
import AppointServiceList from './Pages/AppointServiceList';
import AppointDetails from './Pages/AppointDetails';
import EmployeeAppointServiceList from './Pages/EmployeeAppointServiceList';
import EmployeeDetailsAppointService from './Pages/EmployeeDetailsAppointService';
import { useEffect, useContext } from 'react';
import UserContext from './Context';
import Fines from './Components/Fines/Fines';
import FineDetails from './Components/Fines/FineDetails';
import FineRegistration from './Components/Fines/FineRegistration';
import CarCheck from './Components/Auto/CarCheck';
import FineCheck from './Components/Fines/FineCheck';
import Dtp from './Components/DTP/Dtp';
import DtpDetails from './Components/DTP/DtpDetails';
import CreateDtp from './Components/DTP/СreateDtp';
// import MyCar from './Components/Auto/MyCar';

function App() {
  const { roleId, setRoleId } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="wrapper">
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              {/* <Route exact path="/contacts" component={Contacts} /> */}
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profileupdate" element={<ProfileUpdate />} />
              <Route path="/employee" element={<Employee />} />
              <Route
                path="registrationAppoint"
                element={<AppointServiceForm />}
              />
              <Route
                path="AppointServiceList"
                element={<AppointServiceList />}
              />
              <Route
                path="/EmployeeAppointServiceList"
                element={<EmployeeAppointServiceList />}
              />
              <Route path="AppointDetails/:id" element={<AppointDetails />} />
              <Route
                path="/EmployeeDetailsAppointService/:id"
                element={<EmployeeDetailsAppointService />}
              />
              <Route path="/carregistration" element={<CarRegistration />} />
              <Route path="/carcrud" element={<CarCrud />} />
              <Route path="/cardetails/:id" element={<CarDetails />} />
              <Route path="/cardetails" element={<CarDetails />} />
              <Route path="/carupdate/:id" element={<CarUpdate />} />
              <Route path="/carCheck" element={<CarCheck />} />
              <Route path="/fines" element={<Fines />} />
              <Route path="/FineDetails/:id" element={<FineDetails />} />
              FineRegistration
              <Route path="/fineregistration" element={<FineRegistration />} />
              <Route path="/fineCheck" element={<FineCheck />} />
              {/* <Route path="/mycar" element={<MyCar />} /> */}
              <Route path="/dtp" element={<Dtp />} />
              <Route path="/dtpDetails/:id" element={<DtpDetails />} />
              <Route path="/createDtp" element={<CreateDtp />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
