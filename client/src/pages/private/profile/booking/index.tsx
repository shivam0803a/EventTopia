import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { BookingType } from "../../../../interfaces";
import { message, Popconfirm, Table } from "antd";
import {
  cancelBooking,
  getUserBooking,
} from "../../../../api-service/booking-service";
import { getDateTimeFormat } from "../../../../helper/date-time-formates";

function UserBookingsPage() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserBooking();
      setBookings(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onCancelBooking = async (booking: BookingType) => {
    try {
      setLoading(true);
      const payload = {
        eventId: booking.event._id,
        ticketTypeName: booking.ticketType,
        ticketsCount: booking.ticketsCount,
        bookingId: booking._id,
        paymentId: booking.paymentId,
      };
      await cancelBooking(payload);
      message.success("Booking Cancelled Successfully");
      getData();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    
    {
      title: "Event Date and Time",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Ticket Count",
      dataIndex: "ticketsCount",
      key: "ticketsCount",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (record: BookingType) => {
        if (record.status === "Booked") {
          return (
            <Popconfirm
              title="Are You Sure want to cancel this Booking"
              onConfirm={() => onCancelBooking(record)}
              okText="Yes"
              cancelText="No"
            >
              {" "}
              <span
                className="cursor-pointer text-sm"
                onClick={() => onCancelBooking(record)}
              >
                {" "}
                Cancel
              </span>
            </Popconfirm>
          );
        } else {
          return "";
        }
      },
    },
  ];

  return (
    <div>
      <PageTitle title="Booking" />
      <Table
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
}

export default UserBookingsPage;
