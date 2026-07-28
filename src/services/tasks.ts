import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { NewTask } from "../types/task";

const tasksCollection = collection(db, "tasks");

export async function addTask(input: NewTask): Promise<string> {
  const docRef = await addDoc(tasksCollection, {
    title: input.title,
    description: input.description,
    completed: false,
    userId: input.userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateTask(taskId: string, changes: Partial<Pick<NewTask, "title" | "description">>): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, changes);
}

export async function toggleTaskCompleted(taskId: string, completed: boolean): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { completed });
}

export async function deleteTask(taskId: string): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}