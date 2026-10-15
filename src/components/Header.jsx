import { NavLink } from "react-router-dom";

function Header({ cartQuantity }) {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            The Generics
          </NavLink>

          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/store">
              Store
            </NavLink>

            <NavLink className="nav-link" to="/about">
              About
            </NavLink>

            <NavLink className="nav-link" to="/cart">
              Cart ({cartQuantity})
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
