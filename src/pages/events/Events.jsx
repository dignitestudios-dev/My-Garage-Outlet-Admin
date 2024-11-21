import React from 'react'
import UsersTable from '../../components/users/userstable';
import EventsTable from '../../components/events/EventsTable';

const Users = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-star bg-[#001229]">
        {/* <h2 className="text-xl font-semibold text-gray-100">Events Management</h2> */}

        <EventsTable/>
    </div>
  )
}

export default Users;