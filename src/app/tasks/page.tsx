import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import { getCurrentTenant } from "@/lib/tenant";
import { nowMs } from "@/lib/format";
import { createTask } from "./actions";
import { TaskToggle } from "./TaskToggle";

type TaskWithRelations = Prisma.TaskGetPayload<{
  include: { assignee: true; contact: true; deal: true };
}>;

export default async function TasksPage() {
  const tenant = await getCurrentTenant();

  const [tasks, contacts, users] = await Promise.all([
    prisma.task.findMany({
      where: { tenantId: tenant.id },
      orderBy: [{ done: "asc" }, { dueAt: "asc" }],
      include: { assignee: true, contact: true, deal: true },
    }),
    prisma.contact.findMany({ where: { tenantId: tenant.id }, orderBy: { name: "asc" } }),
    prisma.user.findMany({ where: { tenantId: tenant.id }, orderBy: { name: "asc" } }),
  ]);

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);
  const now = nowMs();

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[19px]">משימות</h2>
        <span className="text-[12.5px] text-[var(--text-faint)]">{open.length} פתוחות · {done.length} הושלמו</span>
      </div>

      <section className="card p-5">
        <h3 className="text-[14px] mb-3">משימה חדשה</h3>
        <form action={createTask} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input name="title" required placeholder="כותרת המשימה *" className="field lg:col-span-2" />
          <input name="dueAt" type="date" className="field" />
          <select name="assigneeId" className="field" defaultValue="">
            <option value="">אחראי</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <select name="contactId" className="field flex-1" defaultValue="">
              <option value="">קשור ללקוח</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary">
              הוספה
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <div className="px-5 py-3.5 border-b border-[var(--border)]">
          <h3 className="text-[15.5px]">פתוחות</h3>
        </div>
        <div className="flex flex-col">
          {open.length === 0 && <p className="text-[13px] text-[var(--text-faint)] px-5 py-4">אין משימות פתוחות 🎉</p>}
          {open.map((t) => (
            <TaskRow key={t.id} task={t} now={now} />
          ))}
        </div>
      </section>

      {done.length > 0 && (
        <section className="card">
          <div className="px-5 py-3.5 border-b border-[var(--border)]">
            <h3 className="text-[15.5px]">הושלמו</h3>
          </div>
          <div className="flex flex-col">
            {done.map((t) => (
              <TaskRow key={t.id} task={t} now={now} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function TaskRow({ task, now }: { task: TaskWithRelations; now: number }) {
  const overdue = !task.done && task.dueAt && task.dueAt.getTime() < now;
  return (
    <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]">
      <TaskToggle taskId={task.id} done={task.done} />
      <p className={`text-[13.5px] flex-1 min-w-0 truncate ${task.done ? "line-through text-[var(--text-faint)]" : ""}`}>
        {task.title}
      </p>
      {(task.contact || task.deal) && (
        <span className="text-[11.5px] text-[var(--text-faint)] shrink-0 hidden sm:inline">
          {task.contact?.name ?? task.deal?.title}
        </span>
      )}
      {task.assignee && <span className="mini-avatar">{task.assignee.initials}</span>}
      {task.dueAt && (
        <span className={`text-[11px] shrink-0 ${overdue ? "text-[var(--danger)]" : "text-[var(--text-faint)]"}`}>
          {overdue ? "באיחור" : ""} {task.dueAt.toLocaleDateString("he-IL")}
        </span>
      )}
    </div>
  );
}
