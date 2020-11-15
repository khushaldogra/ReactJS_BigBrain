import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const RegisterBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #88c747;
  flex-grow: 1;
  justify-content: center;
`

const RegisterSegment = styled(Segment)`
  &&& {
    width: 600px;
    height: 400px;
  }
`

export { RegisterBody, RegisterSegment }