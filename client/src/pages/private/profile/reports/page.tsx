import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { message } from "antd";
import { getUserReports } from "../../../../api-service/reports-service";
import ReportCard from "../../admin/reports/report-card";

function UserReports() {
  const [reports, setReports] = useState<any>({});

  const getData = async () => {
    try {
      const response = await getUserReports();

      setReports(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
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
          title="Amount Spend"
          description="Total Amount by Current User"
          value={reports.totalAmountSpend}
          isAmountProperty={true}
        />

        <ReportCard
          title="Amount Recieved in Refunds"
          description="Total amount spent on booking by current user"
          value={reports.totalAmountRecrivedAsRefunded}
          isAmountProperty={true}
        />

        <ReportCard
          title="Tickets Purchased"
          description="Total Number tickets purchased for all events by current user"
          value={reports.totalTickets}
          isAmountProperty={false}
        />

        <ReportCard
          title="Tickets Cancelled"
          description="Total Number of Tickets Cancelled by Current User"
          value={reports.cancelledTickets}
          isAmountProperty={false}
        />
      </div>
    </div>
  );
}

export default UserReports;
