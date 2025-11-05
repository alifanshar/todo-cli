import {
  addTask,
  listTasks,
  markDone,
  deleteTask
} from "./tasks.js";

const command = process.argv[2];
const param = process.argv[3];

switch (command) {
  case "add":
    if (!param) {
      console.log("❌ Masukkan deskripsi tugas!");
      break;
    }
    addTask(param);
    break;

  case "list":
    listTasks();
    break;

  case "done":
    if (!param) {
      console.log("❌ Masukkan ID tugas!");
      break;
    }
    markDone(Number(param));
    break;

  case "delete":
    if (!param) {
      console.log("❌ Masukkan ID tugas!");
      break;
    }
    deleteTask(Number(param));
    break;

  default:
    console.log(`
Perintah tidak dikenali.

Gunakan:
  node index.js add "tugas baru"
  node index.js list
  node index.js done <id>
  node index.js delete <id>
    `);
}