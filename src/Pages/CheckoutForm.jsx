import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from './../Hooks/useAxiosSecure';
import useCart from './../Hooks/useCart';
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
  const [err, setErr]  = useState('')
  const[clientSecret, setClientSecret] = useState('')	
  const [transactionId, setTransactionId] = useState('')
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart,refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    useEffect( () => {
      if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent',{
          price: parseInt(totalPrice)
        })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret)
        })
      }
    },[axiosSecure,totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if(card === null) {
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
          setErr(error.message)
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErr('')
          }
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
              card: card,
              billing_details: {
                email: `${user?.email}` || 'batpar',
                name: `${user?.displayName}` || 'batpar',
              },
            }
          })
          if(confirmError) {
            console.log('confirm error: ' , confirmError)
          } else {
            console.log('payment Intent: ' , paymentIntent)
            if(paymentIntent.status === 'succeeded') {
              console.log('transaction id', paymentIntent.id)
              setTransactionId(paymentIntent.id)
              const payment = {
                email: user?.email,
                name: user?.displayName,
                transactionId: paymentIntent.id,
                price: totalPrice,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.foodId),
                status: 'pending'
              }
              axiosSecure.post('/payments',payment)
              .then(res => {
                console.log(res.data);
                refetch()
                if(res.data) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Success",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
                navigate('/dashboard/paymentHistory')
              })
            }
          }
    }
    return (
        <form onSubmit={handleSubmit}>
           <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-500">{err}</p>
        {transactionId && <p className="text-green-600">Your transaction id {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;