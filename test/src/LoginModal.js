import { Button, Modal, FloatingLabel, Form, CloseButton} from 'react-bootstrap'
import { useState , useEffect, KeyboardEvent} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import "./Btn.css"
import "./Btn2.css"
import "./Navbar2.css"
import "./InputStyle.css"
import "./InputStyle2.css"

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
         style={{ display: 'block', position: 'absolute', zIndex:'1000'}}
        >
            <Modal.Dialog style={{background:'grey'}}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                    <CloseButton onClick={()=>{ props.setModal(false); props.setSm('') }}/>
                </Modal.Header>

                <Modal.Body style={{marginTop:'15px'}}>
                <>
                    <FloatingLabel
                        controlId="floatingInput"
                        className="mb-3">
                        <div class="input-wrapper">
                            <input type="username" style={{marginTop:''}}id="username" name="username" required autocomplete="off" onChange={(e)=>{
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
                            <label for="username">Enter Username</label>
                            <div class="underline"></div>
                        </div>
                        {email.length > 0 && <span className={`${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}   
                    </FloatingLabel>
                        
                    <FloatingLabel controlId="floatingPassword" style={{marginTop:'30px'}}>
                        <div class="input-wrapper">
                            <input type="password" id="username" name="username" required autocomplete="off"  onKeyDown={ handleEnter} onChange={(e)=>{
                                const currentPassword = e.target.value;
                                setPassword(currentPassword);
                            }}/>
                            <label for="username">Enter Username</label>
                            <div class="underline"></div>
                        </div>
                    </FloatingLabel>
                </>
                </Modal.Body>

                <Modal.Footer>
                    <button className='btn' onClick={()=>{ props.setModal(false); props.setSm('') }}>Close</button>
                    <button className='btn' onClick={ handleSubmit }>Login</button>
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
        <div className='home' style={{paddingTop:'16px'}}>
            <div>
              <nav>
                <ul>
                    <li><a className="logo drag-prevent" style={{ textDecoration: "none"}} href='/'>MonKey🐵</a></li>
                    <li><a className="link drag-prevent" style={{ textDecoration: "none"}} href='/about'>About</a></li>
                    <li><a className="link drag-prevent" style={{ textDecoration: "none"}} href='/member'>Member</a></li>
                    <li><a className="link drag-prevent" style={{ textDecoration: "none"}} onClick={()=>{ 
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
                    }}>Logout</a></li>
                </ul>
              </nav>
              <span className='drag-prevent' style={{float:'right', fontSize:'13px', color:'white', marginRight:'15px'}}>🍌{userData.user.name}님 환영합니다🍌</span>
            </div>

            <div>
                <Container style={{paddingTop:'0px'}}>
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop:'60px'}}>
                            <back>
                                <div className="input-wrapper2">
                                <input className="input" type="text" spellCheck='false' placeholder="프롬프트 입력" onChange={(e)=>{
                                    let currentPrompt = e.target.value;
                                    setPrompt(currentPrompt);
                                }}/>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.43949 3.83408C6.70916 2.72197 8.29084 2.72197 8.56051 3.83408L9.30252 6.89413C9.3988 7.29118 9.70882 7.6012 10.1059 7.69748L13.1659 8.43949C14.278 8.70916 14.278 10.2908 13.1659 10.5605L10.1059 11.3025C9.70882 11.3988 9.3988 11.7088 9.30252 12.1059L8.56051 15.1659C8.29084 16.278 6.70916 16.278 6.43949 15.1659L5.69748 12.1059C5.6012 11.7088 5.29118 11.3988 4.89413 11.3025L1.83408 10.5605C0.721973 10.2908 0.721972 8.70916 1.83408 8.43949L4.89413 7.69748C5.29118 7.6012 5.6012 7.29118 5.69748 6.89413L6.43949 3.83408Z" fill="#B5FF00" />
                                    <path d="M15.3474 14.5133C15.5133 13.8289 16.4867 13.8289 16.6526 14.5133L17.1092 16.3964C17.1685 16.6407 17.3593 16.8315 17.6036 16.8908L19.4867 17.3474C20.1711 17.5133 20.1711 18.4867 19.4867 18.6526L17.6036 19.1092C17.3593 19.1685 17.1685 19.3593 17.1092 19.6036L16.6526 21.4867C16.4867 22.1711 15.5133 22.1711 15.3474 21.4867L14.8908 19.6036C14.8315 19.3593 14.6407 19.1685 14.3964 19.1092L12.5133 18.6526C11.8289 18.4867 11.8289 17.5133 12.5133 17.3474L14.3964 16.8908C14.6407 16.8315 14.8315 16.6407 14.8908 16.3964L15.3474 14.5133Z" fill="#B5FF00" />
                                    <path d="M18.5717 3.71184C18.6806 3.26272 19.3194 3.26272 19.4283 3.71184L19.7279 4.94763C19.7668 5.10798 19.892 5.23318 20.0524 5.27206L21.2882 5.57172C21.7373 5.68062 21.7373 6.31938 21.2882 6.42828L20.0524 6.72794C19.892 6.76682 19.7668 6.89202 19.7279 7.05237L19.4283 8.28816C19.3194 8.73728 18.6806 8.73728 18.5717 8.28816L18.2721 7.05237C18.2332 6.89202 18.108 6.76682 17.9476 6.72794L16.7118 6.42828C16.2627 6.31938 16.2627 5.68062 16.7118 5.57172L17.9476 5.27206C18.108 5.23318 18.2332 5.10798 18.2721 4.94763L18.5717 3.71184Z" fill="#B5FF00" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 3.93109L18.7554 4.93972C18.6577 5.34288 18.3429 5.65766 17.9397 5.75542L16.9311 6L17.9397 6.24458C18.3429 6.34234 18.6577 6.65712 18.7554 7.06029L19 8.06891L19.2446 7.06029C19.3423 6.65712 19.6571 6.34234 20.0603 6.24458L21.0689 6L20.0603 5.75542C19.6571 5.65766 19.3423 5.34288 19.2446 4.93972L19 3.93109ZM19.4895 3.38496C19.365 2.87168 18.635 2.87168 18.5105 3.38496L18.1681 4.79729C18.1236 4.98055 17.9805 5.12363 17.7973 5.16807L16.385 5.51054C15.8717 5.635 15.8717 6.365 16.385 6.48947L17.7973 6.83193C17.9805 6.87637 18.1236 7.01945 18.1681 7.20271L18.5105 8.61504C18.635 9.12832 19.365 9.12832 19.4895 8.61504L19.8319 7.20271C19.8764 7.01945 20.0195 6.87637 20.2027 6.83193L21.615 6.48947C22.1283 6.365 22.1283 5.635 21.615 5.51054L20.2027 5.16807C20.0195 5.12363 19.8764 4.98055 19.8319 4.79729L19.4895 3.38496Z" fill="#B5FF00" />
                                    <path d="M7 23C6.44772 23 6 22.5523 6 22C6 21.4477 6.44772 21 7 21C7.55228 21 8 21.4477 8 22C8 22.5523 7.55228 23 7 23Z" fill="#B5FF00" />
                                    <path d="M2 19C1.44772 19 1 18.5523 1 18C1 17.4477 1.44772 17 2 17C2.55228 17 3 17.4477 3 18C3 18.5523 2.55228 19 2 19Z" fill="#B5FF00" />
                                    <path d="M13 3C12.4477 3 12 2.55228 12 2C12 1.44772 12.4477 1 13 1C13.5523 1 14 1.44772 14 2C14 2.55228 13.5523 3 13 3Z" fill="#B5FF00" />
                                    <path d="M22 14C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12C22.5523 12 23 12.4477 23 13C23 13.5523 22.5523 14 22 14Z" fill="#B5FF00" />
                                </svg>
                                </div>
                            </back>
                            <Form.Text style={{fontSize:'12px', color:'white'}}>
                                ex. 긴 얼굴에 보통 크기이다. 이마 모서리는 앞머리로 보이지 않고 보통 크기이다.
                                볼살은 적고 볼에서 턱뼈까지 일자로 내려온다.
                            </Form.Text>
                        </Form.Group>
                    </>

                    <button className='btn2' onClick={()=>{
                            setImageUrl('');
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
                    }>
                        Submit
                    </button>

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
    width: '600px',
    height: '600px',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '20px auto', // 수평 가운데 정렬을 위해 margin을 auto로 설정합니다.
    borderRadius: '5px',
    textAlign: 'center',
    position: 'relative', // 절대적인 위치로 설정합니다.
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