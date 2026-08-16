import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  LEAD_TEMPERATURES,
  LEAD_TYPES,
} from "@/lib/lead-options";

type ContactDefaults = {
  id?: string;
  name?: string | null;
  company?: string | null;
  role?: string | null;
  phone?: string | null;
  email?: string | null;
  taxId?: string | null;
  address?: string | null;
  city?: string | null;
  billingAddress?: string | null;
  billingCity?: string | null;
  source?: string | null;
  temperature?: string | null;
  leadType?: string | null;
  status?: string | null;
  inquiredAt?: Date | null;
  handedOverAt?: Date | null;
  ownerId?: string | null;
};

export function ContactForm({
  action,
  users,
  contact,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  users: { id: string; name: string }[];
  contact?: ContactDefaults;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      {contact?.id && <input type="hidden" name="contactId" value={contact.id} />}

      <Fieldset legend="פרטי הליד">
        <Field label="שם *" className="sm:col-span-2">
          <input name="name" required defaultValue={contact?.name ?? ""} className="field" />
        </Field>
        <Field label="חברה">
          <input name="company" defaultValue={contact?.company ?? ""} className="field" />
        </Field>
        <Field label="תפקיד">
          <input name="role" defaultValue={contact?.role ?? ""} className="field" />
        </Field>
        <Field label="טלפון">
          <input name="phone" type="tel" defaultValue={contact?.phone ?? ""} className="field" />
        </Field>
        <Field label="אימייל">
          <input name="email" type="email" defaultValue={contact?.email ?? ""} className="field" />
        </Field>
      </Fieldset>

      <Fieldset legend="פרטים לחשבונית">
        <Field label="ח.פ. / ע.מ.">
          <input name="taxId" defaultValue={contact?.taxId ?? ""} className="field" />
        </Field>
        <Field label="עיר">
          <input name="city" defaultValue={contact?.city ?? ""} className="field" />
        </Field>
        <Field label="כתובת" className="sm:col-span-2">
          <input name="address" defaultValue={contact?.address ?? ""} className="field" />
        </Field>
        <Field label="עיר לחשבונית" hint="אם שונה מהעיר למעלה">
          <input name="billingCity" defaultValue={contact?.billingCity ?? ""} className="field" />
        </Field>
        <Field label="כתובת לחשבונית" hint="אם שונה מהכתובת למעלה" className="sm:col-span-3">
          <input
            name="billingAddress"
            defaultValue={contact?.billingAddress ?? ""}
            className="field"
          />
        </Field>
      </Fieldset>

      <Fieldset legend="ניהול הליד">
        <Field label="סטטוס נוכחי">
          <select name="status" defaultValue={contact?.status ?? "חדש"} className="field">
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="טמפרטורה">
          <select name="temperature" defaultValue={contact?.temperature ?? ""} className="field">
            <option value="">לא נקבע</option>
            {LEAD_TEMPERATURES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="סוג הליד">
          <select name="leadType" defaultValue={contact?.leadType ?? ""} className="field">
            <option value="">לא נקבע</option>
            {LEAD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="מקור הליד">
          <select name="source" defaultValue={contact?.source ?? "ידני"} className="field">
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="אחראי">
          <select name="ownerId" defaultValue={contact?.ownerId ?? ""} className="field">
            <option value="">לא הועבר</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="תאריך פניה">
          <input
            name="inquiredAt"
            type="date"
            defaultValue={toDateInput(contact?.inquiredAt)}
            className="field"
          />
        </Field>
        <Field label="תאריך העברה" hint="נרשם אוטומטית עם שיוך אחראי">
          <input
            name="handedOverAt"
            type="date"
            defaultValue={toDateInput(contact?.handedOverAt)}
            className="field"
          />
        </Field>
      </Fieldset>

      <div className="flex gap-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-[12px] font-bold text-[var(--text-faint)] uppercase tracking-wide mb-2.5 p-0">
        {legend}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[12px] font-semibold text-[var(--text-muted)]">
        {label}
        {hint && <span className="font-normal text-[var(--text-faint)]"> · {hint}</span>}
      </span>
      {children}
    </label>
  );
}

/** <input type="date"> needs a YYYY-MM-DD value. */
function toDateInput(date?: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}
