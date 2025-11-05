import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "tasks.json");

// Load tasks dari file
export async function loadTasks() {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Jika file tidak ada / rusak
  }
}

// Simpan tasks ke file
export async function saveTasks(tasks) {
  await writeFile(filePath, JSON.stringify(tasks, null, 2));
}

// Tambah task
export async function addTask(description) {
  const tasks = await loadTasks();

  const newTask = {
    id: tasks.length + 1,
    description,
    completed: false,
  };

  tasks.push(newTask);
  await saveTasks(tasks);

  console.log(`✅ Tugas ditambahkan: "${description}"`);
}

// List task
export async function listTasks() {
  const tasks = await loadTasks();

  if (tasks.length === 0) {
    console.log("📭 Tidak ada tugas.");
    return;
  }

  console.log("\n📋 DAFTAR TUGAS:");
  tasks.forEach((task) => {
    const status = task.completed ? "✅ Selesai" : "❌ Belum";
    console.log(`${task.id}. ${task.description} - ${status}`);
  });
  console.log("");
}

// Tandai selesai
export async function markDone(id) {
  const tasks = await loadTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    console.log("❌ ID tugas tidak ditemukan.");
    return;
  }

  task.completed = true;
  await saveTasks(tasks);
  console.log(`✅ Tugas ID ${id} telah ditandai selesai.`);
}

// Hapus task
export async function deleteTask(id) {
  let tasks = await loadTasks();

  if (!tasks.some((t) => t.id === id)) {
    console.log("❌ ID tugas tidak ditemukan.");
    return;
  }

  tasks = tasks.filter((t) => t.id !== id);

  // Re-number IDs
  tasks = tasks.map((t, i) => ({ ...t, id: i + 1 }));

  await saveTasks(tasks);
  console.log(`🗑 Tugas ID ${id} telah dihapus.`);
}