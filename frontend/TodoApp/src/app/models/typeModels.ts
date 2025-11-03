export interface UserModels {
  username?: string;
  email?: string;
  password?: string;
}

export interface Root {
  _id: string;
  dailyLogId: DailyLogId;
  categoryId: CategoryId;
  title: string;
  startTime: string;
  endTime: string;
  duration: number;
  energy: string;
  rating: number;
  note: string;
  createdAt: string;
}

export interface DailyLogId {
  _id: string;
  userId: string;
  date: string;
  mood: string;
  topWins: string[];
  notes: string;
  totalScore: number;
  createdAt: string;
}

export interface CategoryId {
  _id: string;
  name: string;
  color: string;
  description: string;
  createdAt: string;
}
