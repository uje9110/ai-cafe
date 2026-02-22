export type Promo = {
  theme: string;
  segment: string;
  whyNow: string;
  message: string;
  bestTimeWindow: string;
};

export type PromoWithDateAndId = Promo & {
  createdAt: Date;
  id : string
};
