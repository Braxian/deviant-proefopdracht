import { Question } from './question.model';

export interface Oefening {
  name: string;
  introText: string;
  questions: Question[];
  started: boolean;
  finished: boolean;
}
