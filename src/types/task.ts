export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: unknown; // Firestore Timestamp
}

export interface NewTask {
  title: string;
  description: string;
  userId: string;
}