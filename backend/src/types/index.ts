export interface PaginatedData<T> {
  data: T[];
  total: number;
}

export interface ResponseDTO {
  success: boolean;
  data: any;
  statusCode?: number;
}

export interface ICreateRecordDTO {
  frontImagePath: string;
  backImagePath: string;
}
