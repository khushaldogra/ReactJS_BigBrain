import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

const GameResultsBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f2f2f2;
  padding: 2%;
`

const ChartsSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  margin: 3% 0%;
`

const ChartBox = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 5px #a3a3a3;
  border-radius: 5px;
`

export { GameResultsBody, ChartsSection, ChartBox }