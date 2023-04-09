import React from "react";
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        this.setState({loading: true})

        fetch('https://smartbrain-api-m35g.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.setState({error: ''});
                this.props.onRouteChange('home')
            } else {
                this.setState({error: 'login error'});
                this.setState({loading: ''}); 
            }
        })
        
    }

    onKeyDownCustom = (event) => {
        if (event.key === 'Enter'){
            this.onSubmitSignIn()
        }
        
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="sign-in">
                <div>
                    {/* <fieldset> */}
                        <h1>::::: Sign-In :::::</h1>

                        <div>
                            <label  htmlFor='email'>Email</label>
                            <input 
                                type='email' 
                                id='email' 
                                name='email' 
                                size={24} 
                                onChange={this.onEmailChange}
                                onKeyDown={this.onKeyDownCustom}
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
                                onKeyDown={this.onKeyDownCustom}
                            />
                        </div>
                        <br/>

                        <div style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                            <input 
                                type='submit' 
                                value='Sign In'
                                onClick={this.onSubmitSignIn}
                            />
                            <p onClick={() => onRouteChange('register')} style={{cursor:'pointer'}}>Register</p> 
                        </div>

                        {this.state.loading ? <div style={{color:'coral', margin: '20px 0 0 0'}}>Loading...</div> : null}
                        {this.state.error ? <div style={{margin: '20px 0 0 0'}}>{':: ' + this.state.error + ' ::'}</div> : null}

                    {/* </fieldset> */}
                </div>
            </div>
        )
    }
}

export default SignIn;