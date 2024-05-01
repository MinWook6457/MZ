import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LoginModal, AfterLoginModal} from './LoginModal.js';
import SignUpModal from './SignUpModal.js';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={ <BeforeLoginModal/> }/>
        <Route path="/home" element={  <AfterLoginModal/> }/>
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
      <div>
        <div>
          <Navbar bg="white" data-bs-theme="white">
              <Container>
                <Navbar.Brand href="/">MonKey</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/about" style={{marginLeft:"40px"}}>어바웃</Nav.Link>
                  <Nav.Link href="/member">멤버</Nav.Link>
                </Nav>
                <Nav className='ml-auto'>
                  <Nav.Link onClick={()=>{ setModal(true); setSm('show-modal');}}>로그인</Nav.Link>
                  <Nav.Link onClick={()=>{ setModal2(true); setSm('show-modal');}}>회원가입</Nav.Link>
                </Nav>
              </Container>
          </Navbar>
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
