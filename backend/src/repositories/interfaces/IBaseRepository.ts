/* eslint-disable no-unused-vars */
import { PaginatedData } from '@/types';
import { FilterQuery, Types } from 'mongoose';

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  update(id: string | Types.ObjectId, data: Partial<T>): Promise<T | null>;
  findById(id: string | Types.ObjectId): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  find(
    filter: FilterQuery<T>,
    page: string,
    limit: string,
    sort: Record<string, 1 | -1>,
  ): Promise<PaginatedData<T>>;
}
