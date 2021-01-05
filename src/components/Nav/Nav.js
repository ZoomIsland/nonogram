import { NavLink } from 'react-router-dom';

import './Nav.css';

function Nav() {
  return (
    <header>
      <div className="siteTitle">Nono Yaya</div>
      <div className="navLinks">
        <NavLink to="/nonograms">
          <div className="allPuzzles">Puzzle Index</div>
        </NavLink>
        <span className="lineDivide">&nbsp;|&nbsp;</span>
        <NavLink to="/nonograms/random">
          <div className="randomPuzzle">Random Puzzle</div>
        </NavLink>
        <span className="lineDivide">&nbsp;|&nbsp;</span>

        {/* below is "logged in" version */}
        <NavLink to="/nonograms/new">
          <div className="newPuzzle">Create New</div>
        </NavLink>
        <span className="lineDivide">&nbsp;|&nbsp;</span>
        <div className="logoutBtn">Logout</div>

        {/* below is the non-logged in version */}
        {/* <div className="loginBtn">Login</div>
        <span className="lineDivide">&nbsp;|&nbsp;</span>
        <div className="signupBtn">Sign up</div> */}
      </div>
    </header>
  )
}

export default Nav;