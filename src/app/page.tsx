import BudgetPlanner from "~/components/BudgetPlanner";
import CountdownTimer from "~/components/CountdownTimer";
import DecorateTree from "~/components/DecorateTree";
import GiftRecommendations from "~/components/GiftRecommendations";
import RecipeGenerator from "~/components/RecipeGenerator";
import StoryGenerator from "~/components/StoryGenerator";
import WishlistBuilder from "~/components/WishlistBuilder";

export default function Home() {
  return (
    <div className="space-y-8">
      <CountdownTimer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GiftRecommendations />
        <WishlistBuilder />
        <BudgetPlanner />
        <StoryGenerator />
        <RecipeGenerator />
        <DecorateTree />
      </div>
    </div>
  )
}

