import axios from 'axios';
import { useState } from 'react';
import {Button, Modal, FloatingLabel, Form, CloseButton, Col, Row} from 'react-bootstrap'


function SignUpModal(props){
    //이메일, 이름, 비밀번호, 비밀번호 확인 저장
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk] = useState('');

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordChkMessage, setPasswordChkMessage] = useState('')

    //유효성 검사
    const [isName, setIsName] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordChk, setIsPasswordChk] = useState(false)

    return(
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>회원가입</Modal.Title>
                    <CloseButton onClick={()=>{ props.setModal2(false); props.setSm('')}}/>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                            이름
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control spellcheck="false" autocomplete='off' type="name" placeholder="이름" onChange={(e)=>{ 
                                setName(e.target.value)
                                //이름 유효성 검사
                                if (e.target.value.length < 2 || e.target.value.length > 5) {
                                    setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
                                    setIsName(false)
                                } else {
                                    setNameMessage('올바른 이름 형식입니다 :)')
                                    setIsName(true)
                                 }
                            }} />
                            </Col>
                            {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={3}>
                            이메일
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control spellcheck="false" autocomplete='off' type="email" placeholder="이메일" onChange={(e)=>{ 
                                setEmail(e.target.value)
                                //이메일 유효성 검사
                                const emailRegex =
                                /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

                                if (!emailRegex.test(e.target.value)) {
                                setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜㅜ')
                                setIsEmail(false)
                                } else {
                                setEmailMessage('올바른 이메일 형식이에요 :)')
                                setIsEmail(true)
                                }
                            }} />
                            </Col>
                            {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={3}>
                            비밀번호
                            </Form.Label>
                            <Col sm={20}>
                            <Form.Control spellcheck="false" autocomplete='off' type="password" placeholder="비밀번호" onChange={(e)=>{ 
                                setPassword(e.target.value)
                                //비밀번호 유효성 검사
                                const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

                                if (!passwordRegex.test(e.target.value)) {
                                setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
                                setIsPassword(false)
                                } else {
                                setPasswordMessage('안전한 비밀번호에요 : )')
                                setIsPassword(true)
                                }
                            }}/>
                            </Col>
                            {password.length > 0 && (<span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={4}>
                            비밀번호 확인
                            </Form.Label>
                            <Col sm={20}>
                            <Form.Control spellcheck="false" autocomplete='off' type="password" placeholder="비밀번호 확인" onChange={(e)=>{
                                setPasswordChk(e.target.value) 
                                const currentPasswordChk = e.target.value;
                                //비밀번호 확인 유효성 검사
                                if (password === currentPasswordChk) {
                                    setPasswordChkMessage('비밀번호를 똑같이 입력했어요 :)')
                                    setIsPasswordChk(true)
                                } else {
                                    setPasswordChkMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜㅜ')
                                    setIsPasswordChk(false)
                                }
                            }}/>
                            </Col>
                            {passwordChk.length > 0 && (<span className={`message ${isPasswordChk ? 'success' : 'error'}`}>{passwordChkMessage}</span>)}
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{ props.setModal2(false); props.setSm('')}}>닫기</Button>
                    {/* 4개 모두 유효하면 버튼 활성화 */}
                    <Button disabled={!(isName && isEmail && isPassword && isPasswordChk)} variant="primary" onClick={()=>{
                        axios.post('/register/createUser',{
                            name: name,
                            email: email,
                            password : password
                        })
                        .then((res)=>{
                            console.log('회원가입 성공 '+ res.data);
                        })
                        .catch((err)=>{ 
                            console.log('회원가입 실패!')
                        })
                    }}>회원가입</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default SignUpModal;