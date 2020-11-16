import styled from 'styled-components';
import { Segment, Button } from 'semantic-ui-react';

const RegisterBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  flex-grow: 1;
  justify-content: center;
`

const RegisterTitle = styled.h1`
  text-align: center;
`

const RegisterSegment = styled(Segment)`
  &&& {
    width: 28%;
    box-shadow: 0px 0px 5px #a3a3a3;
  }
`
const RegisterButton = styled(Button)`
  &&& {
    width: 100%;
  }
`

export { RegisterBody, RegisterSegment, RegisterButton, RegisterTitle }