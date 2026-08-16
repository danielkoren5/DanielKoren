import { PrismaClient } from "../src/generated/prisma";
import { DEFAULT_STAGES } from "../src/lib/default-stages";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const tenant = await prisma.tenant.create({
    data: { name: "הסטודיו של דניאל" },
  });

  const stages = await Promise.all(
    DEFAULT_STAGES.map((s) =>
      prisma.stage.create({
        data: { ...s, tenantId: tenant.id },
      }),
    ),
  );
  const stageByName = Object.fromEntries(stages.map((s) => [s.name, s]));

  const [daniel, michal, roni] = await Promise.all([
    prisma.user.create({
      data: { tenantId: tenant.id, name: "דניאל קורן", email: "daniel@example.com", initials: "ד" },
    }),
    prisma.user.create({
      data: { tenantId: tenant.id, name: "מיכל שגיא", email: "michal@example.com", initials: "מ" },
    }),
    prisma.user.create({
      data: { tenantId: tenant.id, name: "רוני אלמוג", email: "roni@example.com", initials: "ר" },
    }),
  ]);

  const [vip, retainer, oneTime] = await Promise.all([
    prisma.tag.create({ data: { tenantId: tenant.id, name: "VIP", color: "gold" } }),
    prisma.tag.create({ data: { tenantId: tenant.id, name: "ריטיינר", color: "violet" } }),
    prisma.tag.create({ data: { tenantId: tenant.id, name: "חד-פעמי", color: "teal" } }),
  ]);

  const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);

  const contactsData = [
    { name: "שירה אלמוג", company: "סטודיו נוי", role: "מנכ״לית", phone: "050-1234567", email: "shira@studio-noy.co.il", tags: [vip, retainer],
      taxId: "514872301", city: "תל אביב", address: "הארבעה 12", status: "בטיפול", temperature: "חם", leadType: "ליווי שוטף", source: "המלצה", owner: michal, inquiredAt: daysAgo(14), handedOverAt: daysAgo(13) },
    { name: "יואב שגיא", company: "דלתא בע״מ", role: "סמנכ״ל תפעול", phone: "052-2345678", email: "yoav@delta.co.il", tags: [oneTime],
      taxId: "512994417", city: "פתח תקווה", address: "היצירה 5", status: "חדש", temperature: "פושר", leadType: "פרויקט חד-פעמי", source: "אתר", owner: roni, inquiredAt: daysAgo(3), handedOverAt: daysAgo(2) },
    { name: "אורית לנדאו", company: "קליניקת שיא", role: "בעלים", phone: "054-3456789", email: "orit@shia-clinic.co.il", tags: [retainer],
      taxId: "038112945", city: "רמת גן", address: "ביאליק 40", billingCity: "תל אביב", billingAddress: "רוטשילד 3", status: "בטיפול", temperature: "חם", leadType: "ליווי שוטף", source: "גוגל", owner: daniel, inquiredAt: daysAgo(21), handedOverAt: daysAgo(20) },
    { name: "נעם ברקאי", company: "בר יוגב עיצוב", role: "מייסד", phone: "053-4567890", email: "noam@bar-yogev.co.il", tags: [oneTime],
      taxId: "201338756", city: "חיפה", address: "הנמל 18", status: "ממתין ללקוח", temperature: "פושר", leadType: "ייעוץ נקודתי", source: "פייסבוק", owner: michal, inquiredAt: daysAgo(9), handedOverAt: daysAgo(8) },
    { name: "דנה אלמוג ושות׳", company: "אלמוג ושות׳", role: "שותפה מנהלת", phone: "050-5678901", email: "dana@almog-law.co.il", tags: [vip, retainer],
      taxId: "513667201", city: "הרצליה", address: "מדינת היהודים 60", status: "בטיפול", temperature: "חם", leadType: "ליווי שוטף", source: "המלצה", owner: roni, inquiredAt: daysAgo(30), handedOverAt: daysAgo(29) },
    { name: "גיל גפן", company: "חברת גפן", role: "מנהל משאבי אנוש", phone: "052-6789012", email: "gil@gefen.co.il", tags: [retainer],
      taxId: "515004429", city: "באר שבע", address: "רגר 90", status: "הומר ללקוח", temperature: "חם", leadType: "הדרכה", source: "כנס", owner: daniel, inquiredAt: daysAgo(60), handedOverAt: daysAgo(58) },
    { name: "לירון כהן", company: "לירון כהן — פרילנס", role: "עצמאית", phone: "054-7890123", email: "liron@lirokohen.co.il", tags: [oneTime],
      taxId: "039887210", city: "ירושלים", address: "עמק רפאים 22", status: "הומר ללקוח", temperature: "קר", leadType: "פרויקט חד-פעמי", source: "אתר", owner: michal, inquiredAt: daysAgo(75), handedOverAt: daysAgo(74) },
  ];

  const contacts = await Promise.all(
    contactsData.map((c) =>
      prisma.contact.create({
        data: {
          tenantId: tenant.id,
          name: c.name,
          company: c.company,
          role: c.role,
          phone: c.phone,
          email: c.email,
          taxId: c.taxId,
          city: c.city,
          address: c.address,
          billingCity: c.billingCity,
          billingAddress: c.billingAddress,
          status: c.status,
          temperature: c.temperature,
          leadType: c.leadType,
          source: c.source,
          ownerId: c.owner.id,
          inquiredAt: c.inquiredAt,
          handedOverAt: c.handedOverAt,
          tags: { connect: c.tags.map((t) => ({ id: t.id })) },
        },
      }),
    ),
  );
  const contactByCompany = Object.fromEntries(contacts.map((c) => [c.company, c]));

  const dealsData = [
    { title: "סטודיו נוי · שיפוץ משרדים", value: 42000, company: "סטודיו נוי", stage: "ליד חדש", owner: michal, engagementType: "חד-פעמי" },
    { title: "דלתא בע״מ · הרחבת מחסן", value: 18500, company: "דלתא בע״מ", stage: "ליד חדש", owner: roni, engagementType: "חד-פעמי" },
    { title: "קליניקת שיא · מיתוג מחדש", value: 31000, company: "קליניקת שיא", stage: "שיחת אבחון", owner: daniel, engagementType: "ריטיינר חודשי" },
    { title: "בר יוגב · אתר מסחר", value: 24900, company: "בר יוגב עיצוב", stage: "שיחת אבחון", owner: michal, engagementType: "חד-פעמי" },
    { title: "אלמוג ושות׳ · ייעוץ שנתי", value: 64000, company: "אלמוג ושות׳", stage: "הצעת שירות", owner: roni, engagementType: "ריטיינר חודשי" },
    { title: "חברת גפן · הדרכת צוות", value: 22400, company: "חברת גפן", stage: "ליווי פעיל", owner: daniel, engagementType: "ריטיינר חודשי" },
    { title: "לירון כהן · אתר תדמית", value: 19500, company: "לירון כהן — פרילנס", stage: "הסתיים / חידוש", owner: michal, engagementType: "חד-פעמי" },
  ];

  const deals = await Promise.all(
    dealsData.map((d) =>
      prisma.deal.create({
        data: {
          tenantId: tenant.id,
          title: d.title,
          value: d.value,
          contactId: contactByCompany[d.company].id,
          stageId: stageByName[d.stage].id,
          ownerId: d.owner.id,
          engagementType: d.engagementType,
        },
      }),
    ),
  );

  await prisma.activity.createMany({
    data: [
      { tenantId: tenant.id, contactId: contacts[0].id, dealId: deals[0].id, type: "whatsapp", summary: "הצעת מחיר נשלחה בוואטסאפ" },
      { tenantId: tenant.id, contactId: contacts[0].id, dealId: deals[0].id, type: "call", summary: "שיחת טלפון · 8 דקות" },
      { tenantId: tenant.id, contactId: contacts[0].id, dealId: deals[0].id, type: "meeting", summary: "נקבעה פגישת סיור באתר" },
      { tenantId: tenant.id, contactId: contacts[2].id, type: "whatsapp", summary: "מתי אפשר לקבוע פגישת ייעוץ?" },
    ],
  });

  await prisma.task.createMany({
    data: [
      { tenantId: tenant.id, title: "לשלוח תזכורת לפני פגישת אבחון", assigneeId: michal.id, contactId: contacts[0].id, dealId: deals[0].id, dueAt: new Date(Date.now() + 86400000) },
      { tenantId: tenant.id, title: "להכין הצעת שירות מותאמת", assigneeId: daniel.id, dealId: deals[2].id, dueAt: new Date(Date.now() + 2 * 86400000) },
      { tenantId: tenant.id, title: "לעקוב אחר חתימת חוזה", assigneeId: roni.id, dealId: deals[4].id, dueAt: new Date(Date.now() + 3 * 86400000) },
      { tenantId: tenant.id, title: "לתאם פגישת סיכום רבעונית", assigneeId: daniel.id, dealId: deals[5].id, dueAt: new Date(Date.now() - 86400000) },
    ],
  });

  console.log(`Seeded tenant ${tenant.name} with ${contacts.length} contacts and ${deals.length} deals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
