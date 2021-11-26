import "./App.css";
import Header from "./Components/Header";
import Services from "./Components/Services";
import NewsList from "./Components/NewsList";
import NewsSidebar from "./Components/NewsSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Pages/Home";

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
            </Routes>

            {/* <div>
            <h1 className="news">Новости Госавтоинспекции</h1>
          </div>
          <div className="news-content">
            <NewsList />
            <NewsSidebar />
          </div> */}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
