import { ComingSoon } from "@/components/ComingSoon";
import { IconChat } from "@/components/icons";

export default function BotPage() {
  return (
    <ComingSoon
      title="בוט ושיחות"
      description="חיבור ל-WhatsApp Business Cloud API לניהול שיחות, מענה אוטומטי ומסירה חכמה לנציג."
      phase="שלב 3 במפת הדרכים"
      icon={<IconChat className="w-6 h-6" />}
      points={[
        "קליטת שיחות נכנסות ושיוך אוטומטי ללקוח קיים או יצירת ליד חדש",
        "מענה ראשוני על שאלות נפוצות, עם מסירה לנציג כשצריך",
        "כל שיחה נרשמת בציר הזמן של הלקוח בכרטיס 360",
      ]}
    />
  );
}
