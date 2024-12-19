import React from "react";
import EventsTable from "../../components/events/EventsTable";

const Users = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-[#001229]">
      <EventsTable />
    </div>
  );
};

export default Users;
