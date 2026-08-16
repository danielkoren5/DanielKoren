import { ComingSoon } from "@/components/ComingSoon";
import { IconWorkflow } from "@/components/icons";

export default function AutomationsPage() {
  return (
    <ComingSoon
      title="בונה אוטומציות"
      description="הגדרת טריגרים, תנאים ופעולות שרצים אוטומטית על לידים ועסקאות — בלי קוד."
      phase="שלב 2 במפת הדרכים"
      icon={<IconWorkflow className="w-6 h-6" />}
      points={[
        "טריגרים: ליד חדש נכנס, עסקה עברה שלב, לקוח לא הגיב X ימים, מועד חוזה מתקרב",
        "פעולות: שליחת הודעת WhatsApp, יצירת משימה, עדכון שדה, קריאת webhook",
        "לוג הרצות עם מעקב הצלחה/כשל לכל אוטומציה",
      ]}
    />
  );
}
