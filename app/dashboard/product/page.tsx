"use client";
import { ProductDialogProvider } from "./ProductDialog/useProductDialog";
import { ProductDialog } from "./ProductDialog/ProductDialog";
import { TagProvider } from "./DialogTagSection/useDialogTagSection";
import ProductDataTable from "./ProductDataTable";

const page = () => {
  return (
    <div className="w-full flex flex-col gap-2 py-5 px-4">
      <TagProvider>
        {/* Add Product */}
        <ProductDialogProvider mode="create">
          <div className="flex flex-row">
            <ProductDialog mode="create" />
          </div>
        </ProductDialogProvider>

        {/* View & Edit Product */}
        <ProductDialogProvider mode="edit">
          <ProductDialog mode="edit" />
          <ProductDataTable />
        </ProductDialogProvider>
      </TagProvider>
    </div>
  );
};

export default page;
