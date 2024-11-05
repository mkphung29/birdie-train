import React from 'react'
import {Link} from 'react-router-dom'

export function InitialPage(){
    return(
        <div>
            <div>
                {/* Insert logo here */}
                <button>Login</button>
            </div>
            <div>
                <h1>Get On The Birdie Train</h1>
                <button>Create Your Account</button>
            </div>
        </div>
    );
}