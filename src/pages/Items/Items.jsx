import React from "react";
import ItemsTable from "../../components/items/ItemsTable";

const Items = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-star bg-[#001229]">
      <ItemsTable />
    </div>
  );
};

export default Items;
