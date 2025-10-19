export interface APIResponse<T = any> {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string;
  data: T;
}
