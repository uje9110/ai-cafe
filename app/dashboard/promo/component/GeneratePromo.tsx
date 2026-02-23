"use client";

import { Button } from "@/components/ui/button";
import usePromo from "../usePromo";
import Loading from "./Loading";
import Empty from "./Empty";
import PromoCard from "./PromoCard";


export default function GeneratePromo() {
  const {
    generatePromo,
    loading,
    promos,
    selectedPromos,
    setSelectedPromos,
    isPromoExist,
    toggleSelectedPromo,
    createPromos,
  } = usePromo();

  return (
    <div className="space-y-8 max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 justify-between items-center md:flex-row">
        <div className="flex flex-col justify-start items-start ">
          <h1 className="text-2xl font-bold text-start md:text-3xl ">Global Promo Ideas</h1>
          <p className="text-muted-foreground text-sm text-start md:text-base ">
            AI-powered campaigns based on all customer interests
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-2 w-full">
          <Button onClick={generatePromo} disabled={loading}>
            {loading ? "Generating..." : "Generate Promo"}
          </Button>

          <Button
            disabled={selectedPromos.length > 0 ? false : true}
            onClick={async () => {
              await createPromos();
            }}
            className="disabled:bg-slate-200 bg-blue-100 text-black hover:bg-blue-300 disabled:text-slate-500"
          >
            Save selected promo
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <Loading />}

      {/* Empty State */}
      {!loading && promos.length === 0 && (
        <Empty generatePromo={generatePromo} />
      )}

      {/* Promo Cards */}
      {!loading && promos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <PromoCard
              key={promo.theme}
              isPromoExist={isPromoExist}
              toggleSelectedPromo={toggleSelectedPromo}
              promo={promo}
              index={index}
              setSelectedPromos={setSelectedPromos}
            />
          ))}
        </div>
      )}
    </div>
  );
}
