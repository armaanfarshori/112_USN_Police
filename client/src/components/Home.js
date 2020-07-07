import React, { Component } from 'react'
import logo from '../assets/logo.png';

export class Home extends Component {
    render() {
        return (
            <div>
                <img src={logo} alt=' ' style={{ position: 'fixed', top: '150px', left: '500px' }} />
            </div>
        )
    }
}

export default Home
