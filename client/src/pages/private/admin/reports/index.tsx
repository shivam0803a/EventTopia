import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import AdminReportsFilters from "./filters";
import { getEvents } from "../../../../api-service/event-service";
import { message, Table } from "antd";
import { getAdminReports } from "../../../../api-service/reports-service";
import ReportCard from "./report-card";

function AdminReports() {
  const [reports, setReports] = useState<any>({});
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    eventId: "",
  });

  const getReports = async () => {
    try {
      const response = await getAdminReports(filters);
      setReports(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const getEventData = async () => {
    try {
      const response = await getEvents({ searchText: "", date: "" });
      setEvents(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      getReports();
    }
  }, [events]);

  const ticketTypesColumns = [
    {
      title: "Ticket Type",
      dataIndex: "name",
      Key: "name",
    },
    {
      title: "Tickets Sold",
      dataIndex: "ticketsSold",
      key:"ticketsSold"
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key:"revenue"
    },
  ];

  return (
    <div>
      <PageTitle title="Reports" />
      <AdminReportsFilters
        events={events}
        filters={filters}
        setFilters={setFilters}
        onFilters={getReports}
      />
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ReportCard
          title="Total Booking"
          description="Total Number of Booking"
          value={reports.totalBookings}
          isAmountProperty={false}
        />

        <ReportCard
          title="Cancelled Booking"
          description="Total Number of Cancelled Booking"
          value={reports.cancelledBookings}
          isAmountProperty={false}
        />

        <ReportCard
          title="Total Revenue"
          description="Total Revenue Generated"
          value={reports.totalRevenueCollected}
          isAmountProperty={true}
        />

        <ReportCard
          title="Refunded Amount"
          description="Total Amount Refunded"
          value={reports.totalRevenueRefunded}
          isAmountProperty={true}
        />

        <ReportCard
          title="Tickets Sold"
          description="Total Number of Tickets Sold"
          value={reports.totalTickets}
          isAmountProperty={false}
        />

        <ReportCard
          title="Tickets Cancelled"
          description="Total Number of Tickets Cancelled"
          value={reports.cancelledTickets}
          isAmountProperty={false}
        />
      </div>

      {reports.ticketTypesAndTheirSales && (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <h1 className="text-red-500 text-sm font-bold col-span-4">
            Tickets Sales by Event
          </h1>
          <Table columns={ticketTypesColumns} dataSource={reports.ticketTypesAndTheirSales}/>
        </div>
        
      )}
    </div>
  );
}

export default AdminReports;
