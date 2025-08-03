import { useEffect, useState } from "react";
import userGlobelStore, { UsersStoreType } from "../../../store/user-store";
import { getEvents } from "../../../api-service/event-service";
import { message } from "antd";
import EventCard from "./common/event-card";
import { EventType } from "../../../interfaces";
import Filter from "./common/filter";
import Spinner from "../../../components/spinner";

function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    searchText: "",
    date: "",
  });
  const { currentUser } = userGlobelStore() as UsersStoreType;

  const getData = async (filterObj: any) => {
    try {
      setLoading(true);
      const response = await getEvents(filterObj);
      setEvents(response.data);
    } catch (error) {
      message.error("Faield to Fetch Data");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    getData({ searchText: "", date: "" });
  }, []);

 if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    )
  }


  return (
    <div>
      <p className="text-gray-600 text-xl font-bond">
        Welcome,{currentUser?.name}!
      </p>

      <Filter filter={filter} setFilter={setFilter} onFilter={getData}></Filter>

      <div className="flex flex-col gap-7 mt-7">
        {events.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
