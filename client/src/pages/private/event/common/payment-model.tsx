import { Button, message, Modal } from "antd";
import { EventType } from "../../../../interfaces";

import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { createBooking } from "../../../../api-service/booking-service";
import { useNavigate } from "react-router-dom";

function PaymentModel({
  showPaymentModel,
  setShowPaymentModel,
  selectTicketType,
  selectTicketsCount,
  totalAmount,
  event,
}: {
  showPaymentModel: any;
  setShowPaymentModel: any;
  selectTicketType: string;
  selectTicketsCount: number;
  totalAmount: number;
  event: EventType;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successful");
        const bookingPayload = {
          event: event._id,
          ticketType: selectTicketType,
          ticketsCount: selectTicketsCount,
          totalAmount,
          paymentId: result.paymentIntent.id,
          status:'Booked'
        }
        await createBooking(bookingPayload);
        message.success("Booking successful");
        navigate("/profile/bookings");
        setShowPaymentModel(false);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <Modal
      open={showPaymentModel}
      onCancel={() => setShowPaymentModel(false)}
      title="MAKE PAYMENT"
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ mode: "shipping", allowedCountries: ["US"] }}
        />

        <div className="mt-7 flex justify-end gap-6">
          <Button disabled={loading} onClick={() => setShowPaymentModel(false)}> Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentModel;
