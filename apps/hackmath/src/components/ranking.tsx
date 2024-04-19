import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getTopTenUsers, getUserData, getUserSubscription } from "@/db/queries";


export const Ranking = async () => {
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
   
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">
          Ranking
        </h3>
        <Link href="/leaderboard">
          <Button
            size="sm"
            variant="super"
          >
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
      {leaderboard.map((userData, index) => (
            <div 
              key={userData.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-red-700 mr-4">{index + 1}</p>
              <Avatar
                className="border bg-red-500 h-12 w-12 ml-3 mr-6"
              >
                <AvatarImage
                  className="object-cover"
                  src={userData.userImageSrc}
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userData.userName}
              </p>
              <p className="text-muted-foreground">
                {userData.points} XP
              </p>
            </div>
          ))}
      </ul>
    </div>
  );
};