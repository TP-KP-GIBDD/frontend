import './App.css';
import Header from './Components/Header';
import Services from './Components/Services';
import NewsList from './Components/NewsList';
import NewsSidebar from './Components/NewsSidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Pages/Home';
import Registration from './Components/Registration';
import Profile from './Components/Profile';
import ProfileUpdate from './Components/ProfileUpdate';
import Employee from './Components/Employee';
import AppointServiceForm from './Components/AppointServiceForm/AppointServiceForm';

function App() {
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
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
