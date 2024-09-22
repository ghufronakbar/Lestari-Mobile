export interface Response {
  status: number;
  message: string;
}

export interface ResponseFail {
  response?: {
    data?: Response;
  };
}
