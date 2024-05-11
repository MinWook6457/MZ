import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LoginModal, AfterLoginModal} from './LoginModal.js';
import SignUpModal from './SignUpModal.js';
import AboutPage from './AboutPage.js';
import MemberPage from './MemberPage.js';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import './Navbar2.css'

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={ <BeforeLoginModal/> }/>
        <Route path="/home" element={  <AfterLoginModal/> }/>
        <Route path="/about" element={  <AboutPage/> }/>
        <Route path="/member" element={  <MemberPage/> }/>
        <Route path='*' element={ <div>not found 404</div> }/>
      </Routes>


    </div>
  );
}


function BeforeLoginModal(){
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [sm, setSm] = useState('');

  return(
      <div className='home' style={{paddingTop:'16px'}}>
        <div>
          {/* <Navbar bg="dark" data-bs-theme="light">
              <Container>
                <Navbar.Brand href="/">MonKey</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/about" style={{marginLeft:"40px"}}>About</Nav.Link>
                  <Nav.Link href="/member">Member</Nav.Link>
                </Nav>
                <Nav className='ml-auto'>
                  <Nav.Link onClick={()=>{ setModal(true); setSm('show-modal');}}>Login</Nav.Link>
                  <Nav.Link onClick={()=>{ setModal2(true); setSm('show-modal');}}>SignUp</Nav.Link>
                </Nav>
              </Container>
          </Navbar> */}
              <nav>
                <ul>
                  <li><a className="logo drag-prevent" style={{ textDecoration: "none"}} href='/'>MonKey🐵</a></li>
                  <li><a className="link drag-prevent" style={{ textDecoration: "none"}} href='/about'>About</a></li>
                  <li><a className="link drag-prevent" style={{ textDecoration: "none"}} href='/member'>Member</a></li>
                  <li><a className="link drag-prevent" style={{ textDecoration: "none"}} onClick={()=>{ setModal(true); setSm('show-modal');}}>Login</a></li>
                  <li><a className="link drag-prevent" style={{ textDecoration: "none"}} onClick={()=>{ setModal2(true); setSm('show-modal');}}>SignUp</a></li>
                </ul>
              </nav>
        </div>

        <div className={'modal-background ' + sm}>
          { 
            modal === true ? <LoginModal setModal={setModal} setSm={setSm}/> : null
          }
          {
            modal2 === true ? <SignUpModal setModal2={setModal2} setSm={setSm}/> : null
          }
        </div>
      </div>

  )
}

export default App;
