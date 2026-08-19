import WundunGate from "@/components/WundunGate";
import { isWundunUnlocked } from "@/lib/wundun-auth";

export const dynamic = "force-dynamic";

export default async function WundunPage() {
  if (!(await isWundunUnlocked())) {
    return <WundunGate />;
  }

  return <p className="wundun__content">wundun</p>;
}
