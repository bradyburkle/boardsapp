import React from 'react';
import Logo from '../Logo/Logo';

const navStyle = {
    backgroundImage: 'linear-gradient(271deg, #48B9C2, #51D0B5)',
    // boxShadow: '0 2px 2px 0',
}

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
        return(
            <nav className='dt w-100 border-box pa1 ph1-ns shadow-3' style={navStyle}>
                    <a className='dtc v-mid mid-gray link dim w-25'>
                        <Logo />
                    </a>

                    <div className='dtc v-mid w-75 tr' >
                        <p onClick={() => onRouteChange('account')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Account</p>
                        <p onClick={() => onRouteChange('trade')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Trade</p>
                        <p onClick={() => onRouteChange('signout')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Sign Out</p>
                    <p onClick={() => onRouteChange('simulation')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Simulation</p>
                    </div>

                </nav>
                )
        } else {
            return (
                <nav className='dt w-100 border-box pa1 ph1-ns shadow-3' style={navStyle}>
                    
                    <a className='dtc mid-gray link dim w-25'>
                        <Logo />
                    </a>

                    <div className='dtc w-75 tr' >
                        <p onClick={() => onRouteChange('signin')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Sign In</p>
                        <p onClick={() => onRouteChange('register')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Register</p>
                        <p onClick={() => onRouteChange('simulation')} className='link dim white f6 f3-ns dib mr3 mr4-ns pointer'>Simulation</p>
                    </div>
                    
                </nav>
            )
   
        }
}

export default Navigation

/*         
                <nav style={navStyle}>

                    <div className='tl'>
                        <Logo />
                    </div>

                    <div style={menuLinkStyle} className='tr'>

                    </div>
                </nav>   
                
*/