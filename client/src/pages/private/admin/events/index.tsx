import { useNavigate } from "react-router-dom";
import PageTitle from "../../../../components/page-title";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../../../../api-service/event-service";
import { getDateTimeFormat } from "../../../../helper/date-time-formates";
import { Pen, Trash2 } from "lucide-react";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents({searchText:"",date:""});
      setEvents(response.data);
    } catch (error) {
      message.error("Failed to Featch Event");
    } finally {
      setLoading(false);
    }
  };

  const deleteEventHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteEvent(id);
      getData();
      message.success("Event Deleted Successfully");
    } catch (error) {
      message.error("Feild to Delete Event");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const columes = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date And Time",
      dataIndex: "date",
      render: (date: any, row: any) => {
        return getDateTimeFormat(`${date} ${row.time}`);
      },
      key: "date",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      Key: "organizer",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: any) => getDateTimeFormat(date),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-5">
          <Trash2 className="cursor-pointer text-red-700" size={16} onClick={()=>deleteEventHandler(record._id)}/>
          <Pen
            className="cursor-pointer text-green-700"
            onClick={() => navigate(`/admin/events/edit/${record._id}`)}
            size={16}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Events" />
        <Button type="primary" onClick={() => navigate("/admin/events/create")}>
          Create Event
        </Button>
      </div>

      <Table dataSource={events} columns={columes} loading={loading} />
    </div>
  );
}

export default EventsPage;
