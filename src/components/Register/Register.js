import React from "react";
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () => {        
        fetch('https://smartbrain-api-m35g.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.setState({error: ''});
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({error: 'register error'})
            }
        })

        
    }

    onKeyDownCustom = (event) => {
        if (event.key === 'Enter'){
            this.onSubmitSignIn()
        }
        
    }

    render() {
        return (
            <div className="register">
                <div>
                    {/* <fieldset> */}
                        <h1>::::: Register :::::</h1>
                        
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                type='text' 
                                id='name' 
                                name='name' 
                                size={24} 
                                onChange={this.onNameChange}
                            />
                        </div>
                        
                        <br/>

                        <div>
                            <label htmlFor='email'>Email</label>
                            <input 
                                type='email' 
                                id='email'
                                name='email' 
                                size={24} 
                                onChange={this.onEmailChange}
                                />
                        </div>

                        <br/>
                        
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input 
                                type='password' 
                                id='password' 
                                name='password' 
                                size={24} 
                                onChange={this.onPasswordChange}
                                />
                        </div>

                        <br/>
                        
                        
                        <div style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                            <input 
                                type='submit' 
                                value='Register'
                                onClick={this.onSubmitRegister}
                            />
                        </div>

                        {this.state.error ? <div style={{margin: '20px 0 0 0'}}>{':: ' + this.state.error + ' ::'}</div> : null}
                                        

                    {/* </fieldset> */}
                </div>
            </div>
        )
    }
}

export default Register;