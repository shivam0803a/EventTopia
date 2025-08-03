import { useState } from "react";
import { EventType } from "../../../../interfaces";

import { Button, Input, message } from "antd";
import PaymentModel from "./payment-model";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../../../api-service/payments-services";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function TicketSelection({ eventData }: { eventData: EventType }) {
  const [selectTicketType, setSelectTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectTicketsCount, setSelectTicketsCount] = useState<number>(1);
  const [showPaymentModel, setShowPaymentModel] = useState<boolean>(false);
  const [stripeOption, setStripeOption] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const ticketTypes = eventData.ticketTypes;

  const selectedTicketPrice = ticketTypes.find(
    (ticketType) => ticketType.name === selectTicketType
  )?.price;

  const totalAmount = (selectedTicketPrice || 0) * selectTicketsCount;

  const getClientSecretAndOpenPaymentModel = async () => {
    try {
      setLoading(true);
      const response = await getClientSecret(totalAmount);
      setStripeOption({ clientSecret: response.clientSecret });
      setShowPaymentModel(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-sm text-red-500 font-bold">Select Ticket Type</h1>

        <div className="flex flex-wrap gap-5 mt-3">
          {ticketTypes.map((tickettype, index) => {
            const available = tickettype.available ?? tickettype.limit;
            return (
              <div
                key={index}
                className={`p-2 border border-gray-200 bg-gray-100 lg:w-96 w-full cursor-pointer
                ${
                  selectTicketType === tickettype.name
                    ? "border-primary border-solid border-2"
                    : ""
                }`}
                onClick={() => {
                  setSelectTicketType(tickettype.name);
                  setMaxCount(available);
                }}
              >
                <h1 className="text-sm text-gray-700">{tickettype.name}</h1>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">${tickettype.price}</h1>
                  <h1 className="text-xs ">{available}Left</h1>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1">
        <h1 className="text-sm text-red-500 font-bold mt-10">
          Select Ticket Count
        </h1>
        <Input
          type="number"
          value={selectTicketsCount}
          className="w-96"
          onChange={(e) => setSelectTicketsCount(parseInt(e.target.value))}
          min={1}
          max={maxCount}
        />
        </div>

        <span className="text-gray-500 text-sm">
          {selectTicketsCount > maxCount
            ? `Only ${maxCount} tickets available`
            : ""}
        </span>

        <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3">
          <h1 className="text-xl text-gray-500 font-bold">
            Total Amount:${totalAmount}
          </h1>
          <Button
            type="primary"
            onClick={() => {
              getClientSecretAndOpenPaymentModel();
            }}
            disabled={!selectTicketType || !selectTicketsCount || loading || selectTicketsCount>maxCount}
            loading={loading}
          >
            Book Now
          </Button>
        </div>
      </div>

      {stripeOption?.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOption}>
          {showPaymentModel && (
            <PaymentModel
              showPaymentModel={showPaymentModel}
              setShowPaymentModel={setShowPaymentModel}
              selectTicketType={selectTicketType}
              selectTicketsCount={selectTicketsCount}
              totalAmount={totalAmount}
              event={eventData}
            />
          )}
        </Elements>
      )}
    </div>
  );
}

export default TicketSelection;
