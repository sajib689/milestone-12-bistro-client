import {
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUtensils,
  FaVoicemail,
} from "react-icons/fa";
import { FaD } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
 
  const {loading} = useContext(AuthContext)
  // TODO:
  const [isAdmin] =  useAdmin()
  if(loading) return <p>Loading.....</p>
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
            <NavLink to="/dashboard/adminHome" className="bg-orange-400">
              <FaHome /> Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addItems" className="bg-orange-400">
              <FaUtensils /> Add Items
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/dashboard/manageItems" className="bg-orange-400">
              <FaD /> Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings" className="bg-orange-400">
              <FaBook /> Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users" className="bg-orange-400">
              <FaUser />All Users
            </NavLink>
          </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className="bg-orange-400">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation" className="bg-orange-400">
                  <FaCalendar /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory" className="bg-orange-400">
                  <FaCalendar /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart" className="bg-orange-400">
                  <FaShoppingCart /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review" className="bg-orange-400">
                  <FaD /> Add A Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className="bg-orange-400">
                  <FaList /> My Bookings
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav */}
          <div className="divider"></div>
          <li>
            <NavLink to="/" className="bg-orange-400">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className="bg-orange-400">
              <FaSearch /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className="bg-orange-400">
              <FaVoicemail /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
