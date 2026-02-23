"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneratePromo from "./component/GeneratePromo";
import PromoDataTable from "./component/PromoDataTable";

export default function page() {
  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="generate" className="w-full">
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