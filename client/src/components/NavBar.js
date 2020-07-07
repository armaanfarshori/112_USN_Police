import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaBlog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/authActions';
import police from '../assets/police.png';

class NavBar extends Component {
    render() {
        return (
            <Navbar expand='lg' bg='light'>
                <Container>
                    <Navbar.Brand style={{ color: '#008dc8' }}><img src={police} style={{ height: '40px', width: '40px' }} /> USN Police</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ml-auto'>
                            <NavLink activeStyle={{ borderBottom: '2px solid #008dc8' }} to="/" style={{ color: 'black', marginRight: '30px', textDecoration: 'none' }}>Home</NavLink>
                            {!this.props.isAuth && <NavLink activeStyle={{ borderBottom: '2px solid #008dc8' }} to="/signUp" style={{ color: 'black', marginRight: '30px', textDecoration: 'none' }}>SignUp</NavLink>}
                            {!this.props.isAuth && <NavLink activeStyle={{ borderBottom: '2px solid #008dc8' }} to="/signIn" style={{ color: 'black', marginRight: '30px', textDecoration: 'none' }}>SignIn</NavLink>}
                            {this.props.isAuth && <NavLink activeStyle={{ borderBottom: '2px solid #008dc8' }} to="/" onClick={this.props.logOut} style={{ color: 'black', marginRight: '30px', textDecoration: 'none' }}>LogOut</NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
