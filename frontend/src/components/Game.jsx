import React from 'react';
import { Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';

const Game = () => {
    const history = useHistory();
    const { id } = useParams();
    return (
        <div>
            <Button onClick={() => history.push(`/card/edit/${id}`)}>Edit</Button>
            {id}
        </div>
    )
}

export default Game;