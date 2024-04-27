import { useState } from 'react';
import {Button, Modal, FloatingLabel, Form, CloseButton} from 'react-bootstrap'

function LoginModal(props){
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
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                        
                    <FloatingLabel controlId="floatingPassword" label="비밀번호">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                </>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{ props.setModal(false); props.setSm('') }}>닫기</Button>
                    <Button variant="primary" onClick={()=>{


                    }}>로그인</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default LoginModal;