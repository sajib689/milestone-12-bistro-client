import { Link } from "react-router-dom";
import CartCard from "../../Components/CartCard";
import useCart from "../../Hooks/useCart";


const Cart = () => {
  const [cart] = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  
  return (
    <>
      <div className="flex justify-evenly mt-12  items-center">
        <h1 className="text-2xl font-bold">Items: {cart.length}</h1>
        <h1 className="text-2xl font-bold">Total Price: $ {total}</h1>
        <Link to='/dashboard/payment'>
        <button disabled={!cart.length} className="btn bg-orange-400 text-white">PAY</button>
        </Link>
      </div>
      <div>
        <div className="overflow-x-auto ms-20">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartCard item={item} key={item._id}></CartCard>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
