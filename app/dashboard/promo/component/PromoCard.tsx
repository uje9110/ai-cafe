import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Promo } from "@/types/promo";
import { Copy } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "sonner";

type PromoCardProps = {
  promo: Promo;
  index: number;
  setSelectedPromos: Dispatch<SetStateAction<Promo[]>>;
  toggleSelectedPromo: (selectedPromo: Promo) => void;
  isPromoExist: (selectedPromo: Promo) => boolean;
};

const PromoCard: FC<PromoCardProps> = ({
  promo,
  index,
  isPromoExist,
  toggleSelectedPromo,
}) => {
  const copyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    toast.success("Message copied", {
      description: "Promo message copied to clipboard.",
    });
  };

  return (
    <Card key={promo.theme} className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {promo.theme}
          <Badge variant="secondary">Campaign #{index + 1}</Badge>
        </CardTitle>
        <CardDescription>{promo.segment}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Why Now */}
        <div>
          <p className="text-sm font-medium">Why Now</p>
          <p className="text-sm text-muted-foreground">{promo.whyNow}</p>
        </div>

        {/* Best Time */}
        {promo.bestTimeWindow && (
          <div>
            <Badge variant="outline">{promo.bestTimeWindow}</Badge>
          </div>
        )}

        <Separator />

        {/* Message */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Ready Message</p>

          <div className="bg-muted p-3 rounded-md text-sm">{promo.message}</div>

          <Button
            size="sm"
            variant="secondary"
            className="w-full"
            onClick={() => copyMessage(promo.message)}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Message
          </Button>

          <div className={cn("w-full py-2 font-medium flex flex-row items-center justify-center gap-2  rounded-md ", isPromoExist(promo) ? "bg-blue-100" : "bg-slate-100")} onClick={() => copyMessage(promo.message)}>
            <Checkbox
              id={promo.theme}
              checked={isPromoExist(promo)}
              onCheckedChange={() => toggleSelectedPromo(promo)}
            />
            <Label htmlFor={promo.theme}>Save This Promo</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoCard;
