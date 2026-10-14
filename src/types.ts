export interface Option {
  id: string;
  text: string;
  reaction: string;
}

export interface QuestionItem {
  id: number;
  question: string;
  options: Option[];
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  selectedOptionText: string;
  reaction: string;
}
