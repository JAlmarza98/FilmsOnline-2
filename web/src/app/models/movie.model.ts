import { category } from '../models/categories.models';
import { saga } from '../models/saga.model';

export class movie{
  constructor(
    public category: category[],
    public overview: string,
    public saga: saga,
    public status: boolean,
    public title: string,
    public vote_average: number,
    public year: string,
    public __v: number,
    public _id: string,
    public backdrop?: string,
    public poster?: string,
    public trailer?: string,
    public movie?: string,
  ){}
}
