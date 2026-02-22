import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

type EmptyProps = {
  generatePromo: () => void;
};

const Empty: FC<EmptyProps> = ({ generatePromo }) => {
  return (
    <Card className="text-center py-16">
      <CardContent>
        <p className="text-muted-foreground">No promo generated yet.</p>
        <Button variant="outline" className="mt-4" onClick={generatePromo}>
          Generate First Campaign
        </Button>
      </CardContent>
    </Card>
  );
};

export default Empty;
