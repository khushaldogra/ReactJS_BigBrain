import styled from 'styled-components';

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

  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
  }
`

const ChartBox = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 5px #a3a3a3;
  border-radius: 5px;
  width: 700px;

  @media (max-width: 700px) {
    width: 390px;
  }
`

export { GameResultsBody, ChartsSection, ChartBox }