import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../Hooks/useCart";

const Navbar = () => {
  const [cart] = useCart()
  const { user, logOut,loading } = useContext(AuthContext);

 
  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  if(loading) return <p>Loader</p>
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order">Order Food</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to='/dashboard/cart' className="btn">
            <FaCartPlus />
              <div className="badge badge-secondary">+{cart?.length}</div>
            </Link>
          </li>
          <div className="flex me-2 justify-center items-center">
            <div>
              <img
                className="me-2 w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <Link>{user?.displayName}</Link>
          </div>
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-black text-white max-w-screen-xl bg-opacity-30 z-10 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
