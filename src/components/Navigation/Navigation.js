import React from "react";
import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <div className="top">

                <div>

                    <div className="logo">
                        <h1 className="logo">SmartBrain</h1>
                    </div>

                    <div className="logo-bottom">
                        <h1 className="logo"> </h1>
                    </div>

                </div>

                <nav>
                    <div className="nav-right">
                        <p onClick={() => onRouteChange('signout')} style={{ cursor: 'pointer' }}>Sign Out</p> {/* add Signout function to clear App.state */}
                    </div>
                </nav>

            </div>
        )

    } else {
        return (
            <div className="top">

                <div>

                    <div className="logo">
                        <h1 className="logo">SmartBrain</h1>
                    </div>

                    <div className="logo-bottom">
                        <h1 className="logo"> </h1>
                    </div>

                </div>


                <nav>
                    <div className="nav-right">
                        <p onClick={() => onRouteChange('signin')} style={{ cursor: 'pointer' }}>Sign in</p>
                        <p onClick={() => onRouteChange('register')} style={{ cursor: 'pointer' }}>Register</p>
                    </div>
                </nav>

            </div>

        )

    }
}

export default Navigation;