import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stirpePriomise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading='Payment'/>
            <div>
              <Elements stripe={stirpePriomise}>
                <CheckoutForm />
                </Elements>  
            </div>
        </div>
    );
};

export default Payment;