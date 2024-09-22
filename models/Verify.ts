export interface Verify {
  verifyId: number;
  email: string;
  token: string;
  expiredAt: Date;
  used: boolean;
  type: "CREATE" | "RESET";
}
