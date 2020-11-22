import styled from 'styled-components';
import { Button, Header } from 'semantic-ui-react';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-color: #F69E4E;
  padding: 2%;
`;

const GameButton = styled(Button)`
  &&& {
    width: 46%;
    height: 110px;
    font-size: 2em;
    margin: 10px;
  }
`;

const GameHeading = styled(Header)`
  &&& {
    font-size: 4em;
    font-weight: normal;
    margin-bottom: 0;
    margin-top: 3em;
  }
`;

const GameSubheading = styled(Header)`
&&& {
  font-size: 1.7em;
  font-weight: normal;
  margin-top: 1.5em;
}
`;

export {
  GameButton, GameHeading, GameSubheading, GameContainer,
};
