import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {

    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        // Blocked native form submission
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        // console.log(CardElement)
        if (card == null) {
            return;
        }

        // Payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log("Payment error", error);
            setError(error.message);
        } else {
            console.log('Payment Method', paymentMethod);
            setError(" ");
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error', confirmError);
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction Id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post("/payments", payment);
                console.log('payment saved', res.data);

                // refetch();
                if (res.data?.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your payment has been successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/dashboard/paymentHistory");
                }
            }
        }

    }

    return (
        <div className="p-10">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                color: '#424770',
                                '::placeholder': {
                                    color: 'gray',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} >
                </CardElement>

                <button className="btn border text-lg bg-amber-500 mt-10" type="submit" disabled={!stripe || !elements}>Pay</button>

                <p className="text-red-600 text-semibold">{error}</p>
                {transactionId && <p className="text-green-600 font-semibold">Your transaction Id: {transactionId}</p>}
            </form>
        </div >
    );
};

export default CheckOutForm;