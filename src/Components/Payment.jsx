import { useLocation } from 'react-router-dom';
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const { paymentMethod } = location.state || {};

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "Debit Card":
      case "Credit Card":
        return (
          <div>
            <h2>Enter {paymentMethod} Details</h2>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Expiry Date (MM/YY)" />
            <input type="text" placeholder="CVV" />
          </div>
        );
      case "Netbanking":
        return (
          <div>
            <h2>Select Your Bank</h2>
            <select>
              <option value="">Select Bank</option>
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
              {/* Add more bank options here */}
            </select>
          </div>
        );
      case "UPI":
        return (
          <div>
            <h2>Enter UPI ID</h2>
            <input type="text" placeholder="UPI ID" />
          </div>
        );
      // Add cases for other payment methods as needed
      default:
        return <p>Please select a payment method.</p>;
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      {renderPaymentFields()}
      <button type="submit">Submit Payment</button>
    </div>
  );
};

export default Payment;
