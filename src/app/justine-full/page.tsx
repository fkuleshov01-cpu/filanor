import InstagramApp from "@/components/instagram-mockup/InstagramApp";
import { justineFullDates } from "@/data/justine-full-dates";

export default function JustineFullPage() {
  return (
    <InstagramApp dates={justineFullDates} hasActiveStories={true} />
  );
}
