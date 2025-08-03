import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { BookingType } from "../../../../interfaces";
import { message, Table } from "antd";

import { getAllBookings } from "../../../../api-service/booking-service";
import { getDateTimeFormat } from "../../../../helper/date-time-formates";

function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
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

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (event: any) => event.name,
    },
    {
      title: "Event Date and Time",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`)
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
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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

export default AdminBookingsPage;
