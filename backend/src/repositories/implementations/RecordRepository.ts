import { BaseRepository } from './BaseRepository';
import { Model } from 'mongoose';
import { IRecordRepository } from '../interfaces';
import { IRecord } from '@/models';

export class RecordRepository extends BaseRepository<IRecord> implements IRecordRepository {
  constructor(model: Model<IRecord>) {
    super(model);
  }
}
