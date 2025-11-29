import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';

function PortfolioNavbar({ darkMode, activeSection }: { darkMode: boolean; activeSection: string }) {
  const scrollToSection = (sectionId: string) => {
    window.history.pushState(null, '', `#${sectionId}`);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar
      expand="lg"
      bg={darkMode ? 'dark' : 'white'}
      variant={darkMode ? 'dark' : 'light'}
      data-bs-theme={darkMode ? 'dark' : 'light'}
      className={darkMode ? 'bg-dark navbar-dark' : 'bg-white navbar-light'}
    >
      <Container className="justify-content-center">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="ms-auto">
            <Nav.Link 
              href="#home" 
              active={activeSection === 'home'}
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#resume" 
              active={activeSection === 'resume'}
              onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
            >
              Resume
            </Nav.Link>
            <Nav.Link 
              href="#photos" 
              active={activeSection === 'photos'}
              onClick={(e) => { e.preventDefault(); scrollToSection('photos'); }}
            >
              Photos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PortfolioNavbar;