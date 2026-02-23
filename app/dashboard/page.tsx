import { Users, TrendingUp, Sparkles, Copy, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "./getDashboardData";
import CopyButton from "@/components/ui/copy-button";

const Page = async () => {

  const { totalCustomers, topInterests, weeklyPromos, newCustomersThisWeek } =
    await getDashboardData();

  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Insights about your customers and campaigns this week.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Customers */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All registered customers
            </p>
          </CardContent>
        </Card>

        {/* New Customer */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Customers This Week
            </CardTitle>
            <UserPlus className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold">{newCustomersThisWeek}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Joined this week
            </p>
          </CardContent>
        </Card>

        {/* Top Interests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Interests
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent className="space-y-3">
            {topInterests.length === 0 && (
              <p className="text-muted-foreground text-sm">No interests yet.</p>
            )}

            {topInterests.map((interest, index) => (
              <div
                key={interest.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <span className="font-medium">{interest.name}</span>
                </div>

                <span className="text-sm font-semibold">{interest.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Promos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">This Week’s Saved Campaigns</h2>
        </div>

        {weeklyPromos.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No promos generated this week.
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {weeklyPromos.map((promo) => (
            <Card key={promo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{promo.theme}</h3>
                    <p className="text-sm text-muted-foreground">
                      Segment: {promo.segment}
                    </p>
                  </div>

                  <Badge variant="outline">{promo.bestTimeWindow}</Badge>
                </div>

                <p className="text-sm leading-relaxed">{promo.message}</p>

                <div className="flex justify-end">
                  <CopyButton text={promo.message} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
