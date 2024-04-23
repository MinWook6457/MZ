import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css';
import { useState } from 'react';
import Dropdown from './Dropdown.js';

function App() {
  let [view, setView] = useState(false);

  return (
    <div className="App">


      <div className='login-form'>
        <>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="이메일 주소 입력"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2" onClick={ setView(!view) (view && <Dropdown/>) }>이메일 종류 선택</InputGroup.Text>
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>With textarea</InputGroup.Text>
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>
        </>
      </div>

    </div>
  );
}


export default App;
