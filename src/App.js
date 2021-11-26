import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Services from './Components/Services';
import NewsList from './Components/NewsList';
import NewsSidebar from './Components/NewsSidebar';
import AppointServiceForm from './Components/AppointServiceForm/AppointServiceForm';

function App() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="content">
          <Services />
          <AppointServiceForm />
          <div>
            <h1 className="news">Новости Госавтоинспекции</h1>
          </div>
          <div className="news-content">
            <NewsList />
            <NewsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
