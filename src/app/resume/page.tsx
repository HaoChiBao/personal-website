import { redirect } from "next/navigation";

/** /resume opens the resume PDF directly. */
export default function ResumePage() {
  redirect("/resume.pdf");
}
