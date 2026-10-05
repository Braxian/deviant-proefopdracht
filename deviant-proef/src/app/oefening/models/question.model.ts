import { Answer } from './answer.model';

export interface Question {
  questionId: number;
  question: string;
  questionType: 'multiple_choice' | 'open_question';
  answers?: Answer[];
  userAnswer: number | string | null;
}
