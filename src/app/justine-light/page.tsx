import InstagramApp from "@/components/instagram-mockup/InstagramApp";
import { justineLightDates } from "@/data/justine-light-dates";

export default function JustineLightPage() {
  return (
    <InstagramApp dates={justineLightDates} hasActiveStories={false} />
  );
}
