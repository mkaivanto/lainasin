export interface Loan {
  id: number | null;
  borrower: string;
  item: string;
  expires: number;
  returned: boolean;
  //base64 encoded image string
  image: string;
}
