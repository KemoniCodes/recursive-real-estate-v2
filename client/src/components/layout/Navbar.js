import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <div className="main-nav">
            <header>
                <nav className="main-nav">
                    <ul>
                        <li><a onClick={logout} >Log Out</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );

    const guestLinks = (
        <div className="main-nav">
            <header>
                <nav className="main-nav">
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        {/* <li><Link to='/Properties'>Properties</Link></li>
                        <li><Link to='/Agents'>Agents</Link></li>
                        <li><Link to='/Contact'>Contact</Link></li> */}

                        <div className="auth">
                            <li><Link to='/login'>Sign In</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </div>
                    </ul>
                </nav>
            </header>
        </div >
    );

    return (
        <div className="main-nav">
            <header>
                <nav className="main-nav">
                    {/* <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/Properties'>Properties</Link></li>
                        <li><Link to='/Agents'>Agents</Link></li>
                        <li><Link to='/Contact'>Contact</Link></li>

                        <div className="auth">
                            <li><Link to='/login'>Sign In</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </div>
                    </ul> */}
                </nav>
            </header>
    {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </div >
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);