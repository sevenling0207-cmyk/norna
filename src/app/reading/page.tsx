import { redirect } from "next/navigation";

// Redirect /reading to the main three-card experience
export default function ReadingPage() {
  redirect("/reading/three-card");
}
