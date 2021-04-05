export interface Loan {
  id: number | null;
  borrower: string;
  item: string;
  expires: Date;
  returned: boolean;
}
