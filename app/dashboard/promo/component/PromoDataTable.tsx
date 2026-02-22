import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getPromoColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { PromoWithDateAndId } from "@/types/promo";
import usePromo from "../usePromo";

const PromoDataTable = () => {
  const { deletePromo } = usePromo();
  const columns = getPromoColumns({ deletePromo });

  const { data: promos } = useQuery<PromoWithDateAndId[]>({
    queryKey: ["promos"],
    queryFn: async () => {
      const res = await axios.get("/api/promos");
      if (!res.status) throw new Error("Failed to fetch promos");
      return res.data;
    },
  });

  if (!promos) return <p>Loading...</p>;

  return <DataTable columns={columns} data={promos} />;
};

export default PromoDataTable;
