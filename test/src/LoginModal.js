import {Button, Modal, FloatingLabel, Form, CloseButton} from 'react-bootstrap'
import { useState , useEffect, KeyboardEvent} from 'react';
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

    const handleSubmit = (e) => {
        axios.post('/user/login',{
            email: email,
            password : password
        })
        .then((res)=>{
            const userData = res.data; // 세션에 저장된 사용자 데이터
            alert('로그인 성공')
            props.setModal(false)
            props.setSm('')
            console.log(userData)
            navigate('/home', { state: { userData } });
        })
        .catch((err)=>{ 
            alert('로그인 실패! ' + err)
            //navigate('/home', );
            
        })   
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
          handleSubmit(); // 작성한 댓글 post 요청하는 함수 
        }
      };

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
                        <Form.Control spellcheck="false" autocomplete='off' type="password" placeholder="Password"  onKeyDown={ handleEnter} onChange={(e)=>{
                            const currentPassword = e.target.value;
                            setPassword(currentPassword);
                        }} />
                    </FloatingLabel>
                </>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{ props.setModal(false); props.setSm('') }}>닫기</Button>
                    <Button variant="primary" onClick={ handleSubmit }>로그인</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}



function AfterLoginModal () {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;
    console.log(userData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userData) {
          navigate('/'); // 세션 데이터가 없으면 로그인 페이지로 리다이렉트
        }
      }, [userData, navigate]);
    

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [sm, setSm] = useState('');
    
    // const [userId, setUserId] = useState('')
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    
    return(
        <div className='home'>
          <div>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                  <Navbar.Brand href="/">MonKey</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/about" style={{marginLeft:"40px"}}>어바웃</Nav.Link>
                    <Nav.Link href="/member">멤버</Nav.Link>
                  </Nav>
                  <Nav className='ml-auto'>
                    <Nav.Link onClick={()=>{ 
                        axios.post('/user/logout',{
                            userData:userData
                        })
                        .then((res)=>{
                            alert(res.data.message)
                            navigate('/');
                        })
                        .catch((err)=>{
                            alert(err);
                        })
                    }}>로그아웃</Nav.Link>
                  </Nav>
                </Container>
            </Navbar>

            <Container>
                <span style={{float:'right', fontSize:'12px', color:'white'}}>{userData.user.name}님 환영합니다😊</span>
            </Container>
        
            <Container style={{position: 'absolute', top: '17%', left: '50%', transform: 'translate(-50%, -50%)',}}>
                {/* <div> */}
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control spellcheck="false" autocomplete='off' type="email" placeholder="프롬프트 입력" 
                                onChange={(e)=>{
                                    let currentPrompt = e.target.value;
                                    setPrompt(currentPrompt);   
                                }}/>
                            <Form.Text style={{fontSize:'12px', color:'white'}}>
                                ex. 긴 얼굴에 보통 크기이다. 이마 모서리는 앞머리로 보이지 않고 보통 크기이다.
                                볼살은 적고 볼에서 턱뼈까지 일자로 내려온다.
                            </Form.Text>
                          </Form.Group>
                    </>
                {/* </div> */}
                <Button variant='outline-dark' style={{height:'1.8rem', fontSize:'0.675rem', background:'grey'}} onClick={()=>{
                        setLoading(true);
                        axios.post('/openai/read',{
                            userId: userData.user.id,
                            prompt : prompt
                        })
                        .then((res)=>{
                            const imageUrl = res.data.result; // 응답 데이터에서 URL 추출
                            console.log('이미지 URL:', imageUrl); // URL 출력
                            if (typeof imageUrl === 'string') { // 올바른 문자열인지 확인
                                setImageUrl(imageUrl);
                                setLoading(false);
                            } else {
                                console.error('올바르지 않은 URL 형식:', imageUrl);
                                setLoading(false);
                            }
                        })
                        .catch((err)=>{ 
                            alert('Failed created Command!! ' + err)
                            // setImageUrl("https://codingapple1.github.io/shop/shoes1.jpg")
                            setLoading(false);
                        })
                    }
                }>생성</Button>
            </Container>
            
            <Container>
                <div style={styles.imageBox}>
                    {loading === true ? <div className='spinner' style={{top:'50%', left:'50%'}}></div> : null}
                    {imageUrl && typeof imageUrl === 'string' && (
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
    width:'600px',
    height:'600px',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '20px 0',
    borderRadius: '5px',
    textAlign: 'center',
    position: 'absolute', // 절대적인 위치로 설정합니다.
    left: '50%', // 가로 중앙 정렬을 위해 left를 50%로 설정합니다.
    transform: 'translateX(-50%)', // 가로 방향으로 중앙 정렬합니다.
    bottom: '20px', // 생성 버튼 아래로 이동시키기 위해 값을 조정합니다.
    zIndex: '1', // 다른 요소 위에 나타나도록 zIndex를 설정합니다.
    backgroundColor: 'white', // 배경색을 흰색으로 설정합니다.
},
image: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
},
};

export {LoginModal, AfterLoginModal};