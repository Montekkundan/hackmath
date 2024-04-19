import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserData } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getTopTenUsers, getUserData, getUserSubscription } from "@/db/queries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { Ranking } from "@/components/ranking";

const LearderboardPage = async () => {
  const userProgressData = getUserData();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [
    userData,
    userSubscription,
    leaderboard,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
  ]);

  if (!userData || !userData.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserData
          activeCourse={userData.activeCourse}
          hearts={userData.hearts}
          points={userData.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )}
        {/* <Quests points={userData.points} /> */}
        <Ranking />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Daily Challenges
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />

        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LearderboardPage;