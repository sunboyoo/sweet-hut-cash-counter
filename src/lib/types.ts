export type Denomination =
  | 1000
  | 2000
  | 5000
  | 10000
  | 20000
  | 50000
  | 100000
  | 200000
  | 500000;

export type BillEntry = { denom: Denomination; count: number };

export type CashState = Partial<Record<Denomination, number>>;
