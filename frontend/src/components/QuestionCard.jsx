import React, { useState } from 'react';
import { Card } from 'semantic-ui-react'

function QuestionCard() {
    return (
        <Card>
            <Card.Content>
                <Card.Header content='Jake Smith' />
                <Card.Meta content='Musicians' />
                <Card.Description content='Jake is a drummer living in New York.' />
            </Card.Content>
        </Card>
    )
}

export default QuestionCard;