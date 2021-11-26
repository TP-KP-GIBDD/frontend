import "./App.css";
import Header from "./Components/Header";
import Services from "./Components/Services";
import NewsList from "./Components/NewsList";
import NewsSidebar from "./Components/NewsSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="content">
          <BrowserRouter>
            <Routes>
              {/* <Route exact path="/home" component={Home} />
                <Route exact path="/contacts" component={Contacts} /> */}
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
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
  );
}

export default App;
