import { useEffect, useState } from "react";
import PageTitle from "../../../../../components/page-title";
import EventForm from "../common/event-form";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../../../api-service/event-service";
import Spinner from "../../../../../components/spinner";

function EditEventPage() {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const params:any=useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);     
      setEventData(response.data);
    } catch (error) {
      message.error("Faild to Fetch Event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (<div className="flex justify-center items-center h-screen">
      <Spinner/>
    </div>)
  }

  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className="mt-5">
        <EventForm  initialData={eventData} type="edit"/>
      </div>
    </div>
  );
}

export default EditEventPage;
