import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Task } from "../types/task";

export function useTasks(uid: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    setError(null);

    const q = query(collection(db, "tasks"), where("userId", "==", uid), orderBy("createdAt", "desc"));

   const unsubscribe = onSnapshot(
  q,
  (snapshot) => {
    console.log("SNAPSHOT DOCS:", snapshot.docs.length);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));
    setTasks(data);
    setLoading(false);
  },
  (err) => {
    console.log("ERROR FIRESTORE:", err);
    setError("No se pudieron obtener las tareas.");
    setLoading(false);
  }
);

    return () => unsubscribe();
  }, [uid]);

  return { tasks, loading, error };
}