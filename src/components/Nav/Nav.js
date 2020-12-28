import { NavLink } from 'react-router-dom';

import './Nav.css';

function Nav() {
  return (
    <header>
      <div className="siteTitle">Nono Yaya</div>
      <div className="navLinks">
        <div className="allPuzzles">Puzzle Index</div>
        <span className="lineDivide">&nbsp;|&nbsp;</span>
        <div className="randomPuzzle">Random Puzzle</div>
        <span className="lineDivide">&nbsp;|&nbsp;</span>

        {/* below is "logged in" version */}
        <div className="newPuzzle">Create New</div>
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