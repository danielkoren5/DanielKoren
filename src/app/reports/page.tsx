import { ComingSoon } from "@/components/ComingSoon";
import { IconChart } from "@/components/icons";

export default function ReportsPage() {
  return (
    <ComingSoon
      title="דוחות"
      description="לוח בקרה עם ביצועי צנרת, שיעורי המרה וזמני תגובה לאורך זמן."
      phase="בהמשך מפת הדרכים"
      icon={<IconChart className="w-6 h-6" />}
      points={[
        "ביצועי צנרת לפי שלב ולפי בעלים",
        "שיעורי המרה ומשך זמן ממוצע בכל שלב",
        "כשיצטבר מספיק היסטוריה, גם מגמות לאורך זמן",
      ]}
    />
  );
}
