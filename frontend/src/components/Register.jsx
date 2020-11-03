import React from 'react';
import { Button, Form } from 'semantic-ui-react'

function Register() {
    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input type='text' placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input type='text' placeholder='Name' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type='password' placeholder='password' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default Register;