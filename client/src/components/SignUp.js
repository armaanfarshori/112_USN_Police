import React, { Component } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { register } from '../store/actions/authActions';

export class SignIn extends Component {
    state = {
        name: '',
        regId: '',
        password: '',
        msg: null
    }
    componentDidUpdate(prevProps) {
        const { error, isAuth } = this.props;
        if (error !== prevProps.error) {
            console.log(error.msg.msg, "   ", prevProps.error.msg.msg);
            this.setState({ msg: error.msg.msg });
        }
        if (isAuth) {
            this.props.history.replace('/');
        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitHandler = (e) => {
        const { name, regId, password } = this.state;
        console.log(name, regId, password);
        const user = {
            name,
            regId,
            password
        }
        this.props.signUp(user);
        e.preventDefault();
    }
    render() {
        return (
            <Container style={{ marginTop: '100px', border: '1px solid #ccc', padding: '20px', width: '60%' }}>
                {this.state.msg && <Alert variant='danger'>{this.state.msg}</Alert>}
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.onChangeHandler} name="name" type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Reg. Id</Form.Label>
                        <Form.Control onChange={this.onChangeHandler} name="regId" type="text" placeholder="Enter Reg. Id" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.onChangeHandler} name="password" type="password" placeholder="Password" />
                        <Form.Text className="text-muted">
                            We'll never share your info with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        GO!
                    </Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (user) => dispatch(register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
