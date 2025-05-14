import { Document, Model, FilterQuery, Types, isValidObjectId } from 'mongoose';
import { IBaseRepository } from '../interfaces';
import { PaginatedData } from '@/types';

export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected readonly model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async update(id: string | Types.ObjectId, data: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid ID format');
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }
  async findById(id: string | Types.ObjectId): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid ID format');
    return this.model.findById(id);
  }

  async find(
    filter: FilterQuery<T> = {},
    page = '1',
    limit = '5',
    sort: Record<string, 1 | -1> = {},
  ): Promise<PaginatedData<T>> {
    const skip = (parseInt(page, 2) - 1) * parseInt(limit, 2);
    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(parseInt(limit, 2)),
      this.model.countDocuments(filter),
    ]);
    return { data, total };
  }
}
