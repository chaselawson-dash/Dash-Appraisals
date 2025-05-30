import { useState } from "react";
import "./App.css";
import { 
  Navigation, 
  HeroSection, 
  ServicesSection, 
  AboutSection, 
  AreasSection, 
  ContactSection, 
  Footer 
} from './components';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <HeroSection />
            <ServicesSection />
          </>
        );
      case 'services':
        return <ServicesSection />;
      case 'about':
        return <AboutSection />;
      case 'areas':
        return <AreasSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <>
            <HeroSection />
            <ServicesSection />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="pt-16">
        {renderCurrentPage()}
        
        {/* Show additional sections on home page */}
        {currentPage === 'home' && (
          <>
            <AboutSection />
            <AreasSection />
            <ContactSection />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;