"use client";
import { CustomerDialogProvider } from "./CustomerDialog/useCustomerDialog";
import { CustomerDialog } from "./CustomerDialog/CustomerDialog";
import { CustomerDataTable } from "./CustomerDataTable";
import { FavoriteItemSectionProvider } from "./FavoriteItemSection/useFavoriteItemSection";
import { TagProvider } from "../product/DialogTagSection/useDialogTagSection";

const page = () => {
  return (
    <TagProvider>

    <FavoriteItemSectionProvider>
      <div className="w-full flex flex-col gap-2 py-5 px-4">
        {/* Add Customer */}
        <CustomerDialogProvider mode="create">
          <div className="flex flex-row">
            <CustomerDialog mode="create" />
          </div>
        </CustomerDialogProvider>

        {/* View & Edit Customer */}
        <CustomerDialogProvider mode="edit">
          <CustomerDialog mode="edit" />
          <CustomerDataTable />
        </CustomerDialogProvider>
      </div>
    </FavoriteItemSectionProvider>
    </TagProvider>
  );
};

export default page;
