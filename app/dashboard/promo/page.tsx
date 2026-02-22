"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneratePromo from "./component/GeneratePromo";
import PromoDataTable from "./component/PromoDataTable";

export default function page() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Promo Management</h1>
        <p className="text-muted-foreground text-sm">
          Manage and generate promotional campaigns.
        </p>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="generate">Generate Promo</TabsTrigger>
          <TabsTrigger value="table">Promo Table</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-4">
          <GeneratePromo />
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <PromoDataTable />
        </TabsContent>

      </Tabs>
    </div>
  );
}