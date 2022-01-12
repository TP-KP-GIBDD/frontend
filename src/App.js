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
              <Route path="/fines" element={<Fines />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
