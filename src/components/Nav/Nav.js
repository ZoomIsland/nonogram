import './Nav.css';

function Nav() {
  return (
    <header>
      <div className="siteTitle">Nono Yaya</div>
      <div className="navLinks">
        <div className="allPuzzles">Puzzle Index</div>
        <span>&nbsp;|&nbsp;</span>
        <div className="randomPuzzle">Random Puzzle</div>
        <span>&nbsp;|&nbsp;</span>
        <div className="loginBtn">Login</div>
        <span>&nbsp;|&nbsp;</span>
        <div className="signupBtn">Sign up</div>
      </div>
    </header>
  )
}

export default Nav;