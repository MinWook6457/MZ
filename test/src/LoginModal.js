import {Button, Modal, FloatingLabel, Form, CloseButton} from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

function LoginModal(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [isEmail, setIsEmail] = useState(false);

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
                            alert('로그인 성공!');
                            props.setModal(false); props.setSm('')
                        })
                        .catch((err)=>{ 
                            alert('로그인 실패!')
                        })
                    }}>로그인</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default LoginModal;