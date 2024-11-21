import React from 'react'
import SubscriptionTable from '../../components/subscriptions/SubcriptionTable'

const Subscription = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-star bg-[#001229]">
        <h2 className="text-xl font-semibold text-gray-100 uppercase">Subscriptions</h2>
    <SubscriptionTable/>
    </div>
  )
}

export default Subscription;