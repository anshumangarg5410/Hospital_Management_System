import './App.css';
import Navbar from './components/navbar.jsx';
import LandingPage from './components/landing.jsx'; // Import the landing page
// import Footer from './components/Footer.jsx'; // Import your footer component

function App() {
  return (
    <div className="App">
      <Navbar/>
      <LandingPage/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;