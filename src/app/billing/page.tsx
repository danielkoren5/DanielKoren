import { ComingSoon } from "@/components/ComingSoon";
import { IconReceipt } from "@/components/icons";

export default function BillingPage() {
  return (
    <ComingSoon
      title="חיוב וחשבונות"
      description="שכבת אינטגרציה גנרית לחיבור למערכות גבייה והנהלת חשבונות עם סגירת עסקה."
      phase="שלב 4 במפת הדרכים"
      icon={<IconReceipt className="w-6 h-6" />}
      points={[
        "Green Invoice — הפקת חשבונית אוטומטית עם סגירת עסקה (בתכנון)",
        "iCount — סנכרון תשלומים וגבייה חוזרת (בתכנון)",
        "Rivhit / Priority — הנהלת חשבונות ודוחות מע״מ (נבדק)",
      ]}
    />
  );
}
