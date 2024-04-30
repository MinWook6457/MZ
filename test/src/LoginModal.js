import {Button, Modal, FloatingLabel, Form, CloseButton} from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SignUpModal from './SignUpModal.js';

function LoginModal(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [isEmail, setIsEmail] = useState(false);
    let navigate = useNavigate();


    return(
        <div
         className="modal show"
         style={{ display: 'block', position: 'initial'}}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>로그인</Modal.Title>
                    <CloseButton onClick={()=>{ props.setModal(false); props.setSm('') }}/>
                </Modal.Header>

                <Modal.Body>
                <>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="이메일 입력"
                        className="mb-3">
                        <Form.Control spellcheck="false" autocomplete='off' type="email" placeholder="name@example.com" onChange={(e)=>{
                            const currentEmail = e.target.value;
                            const emailRegex =
                            /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                            setEmail(currentEmail);

                            if (!emailRegex.test(currentEmail)) {
                                setEmailMessage('이메일 형식이 아니에요!')
                                setIsEmail(false)
                            }else{
                                setEmailMessage('');
                                setIsEmail(true);
                            }
                        }}/>
                        {email.length > 0 && <span className={`${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}   
                    </FloatingLabel>
                        
                    <FloatingLabel controlId="floatingPassword" label="비밀번호">
                        <Form.Control spellcheck="false" autocomplete='off' type="password" placeholder="Password" onChange={(e)=>{
                            const currentPassword = e.target.value;
                            setPassword(currentPassword);
                        }} />
                    </FloatingLabel>
                </>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{ props.setModal(false); props.setSm('') }}>닫기</Button>
                    <Button variant="primary" onClick={()=>{
                        axios.post('/user/login',{
                            email: email,
                            password : password
                        })
                        .then((res)=>{
                            alert('로그인 성공!')
                            props.setModal(false)
                            props.setSm('')
                            navigate('/home', {state: {userId : res.data.results[0], name : res.data.results[1]}});
                        })
                        .catch((err)=>{ 
                            alert('로그인 실패! ' + err)
                        })   
                    }}>로그인</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}



function AfterLoginModal(){
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [sm, setSm] = useState('');
    const location = useLocation();
    //const name = location.state.name;
    //const userId = location.state.userId
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState('');
  
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
                    <Nav.Link onClick={()=>{ setModal(true); setSm('show-modal');}}>로그아웃</Nav.Link>
                  </Nav>
                </Container>
            </Navbar>

            <Container>
                <span style={{float:'right', fontSize:'12px'}}>박지우님 환영합니다😊</span>
            </Container>

            <Container style={{position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)',}}>
                {/* <div> */}
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control spellcheck="false" autocomplete='off' type="email" placeholder="프롬프트 입력" 
                                onChange={(e)=>{
                                    let currentPrompt = e.target.value;
                                    setPrompt(currentPrompt);   
                                }}/>
                            <Form.Text className="text-muted" style={{fontSize:'12px'}}>
                                ex. 긴 얼굴에 보통 크기이다. 이마 모서리는 앞머리로 보이지 않고 보통 크기이다.
                                볼살은 적고 볼에서 턱뼈까지 일자로 내려온다.
                            </Form.Text>
                          </Form.Group>
                    </>
                {/* </div> */}
                <Button variant="outline-dark" style={{height:'2rem', fontSize:'0.775rem'}} onClick={()=>
                    axios.post('/openai/read',{
                        userId: userId,
                        prompt : prompt
                    })
                    .then((res)=>{
                        setImageUrl(res.data.result[0])
                    })
                    .catch((err)=>{ 
                        alert('Failed created Command!! ' + err)
                        setImageUrl("https://codingapple1.github.io/shop/shoes1.jpg")
                    })   
                }>생성</Button>
            </Container>
            
            <Container>
                <div style={styles.imageBox}>  
                    {imageUrl && (
                        <div>
                        <img src={imageUrl} alt="Preview" style={styles.image} />
                        </div>
                    )}
                </div>
            </Container>

          </div>
        </div>
    )
  }

const styles = {
imageBox: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '20px 0',
    borderRadius: '5px',
    transform: 'translateY(37%)'
},
image: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
},
};

export {LoginModal, AfterLoginModal};