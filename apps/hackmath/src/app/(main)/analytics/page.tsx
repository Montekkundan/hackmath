import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { currentUser, currentUserData } from "@/lib/auth"
import { Button } from "@/components/ui/button"

import Charts from "./_components/charts"
import { Progress } from "@/components/ui/progress"
const Analytics = async () => {
  const user = await currentUser()
  const userData = await currentUserData()
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Hello {user?.name}!</h1>
        <div className="flex flex-row gap-2">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between items-center">
                <div className="text-2xl font-bold">20 days</div>
                <p className="text-xs text-muted-foreground">S</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="mt-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="text-xl font-medium">Total Solved</div>
                  <p className="text-xl font-bold">1503</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-medium">Total XP</div>
                  <p className="text-xl font-bold">23234 XP</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-medium">Time Spent</div>
                  <p className="text-xl font-bold">6 hr 23m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Performace {userData?.hearts}</h1>
        <div className="flex flex-row gap-2">
          <Charts />
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Ratings</CardTitle>
            </CardHeader>
            <CardContent className="h-3/4">
              <div className="flex flex-col mt-4 h-2/4 justify-between">
                <div className="flex flex-col justify-between">
                  <div className="flex flex-row justify-between pb-4 items-center">
                    <div className="text-2xl font-bold">
                      Functions {""}
                      <span >5000</span>
                      </div>
                    <p className="text-xs text-muted-foreground">Beginner</p>
                  </div>
                  <Progress value={80} className="w-[60%]"  color="bg-[#0284c7]" />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-row justify-between pb-4 pt-6 items-center">
                    <div className="text-2xl font-bold">
                      Linear Algebra {""}
                      <span>6000</span>
                      </div>
                    <p className="text-xs text-muted-foreground">Intermediate</p>
                  </div>
                  <Progress value={30} className="w-[60%]" color="bg-green-700" />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-row justify-between pb-4 pt-6 items-center">
                    <div className="text-2xl font-bold">
                      Geometry {""}
                      <span>8000</span>
                      </div>
                    <p className="text-xs text-muted-foreground">Advanced</p>
                  </div>
                  <Progress value={60} className="w-[60%]" color="bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Review </h1>
        <div className="flex flex-row gap-2">
          <Card>
            <CardContent className="flex flex-row gap-2 items-center mt-4">
              <div>
                <div className="text-xl font-bold">No more Weaknesses!</div>
                <div className="text-sm font-medium">Improve your multiplication</div>
              </div>
              <Button variant="primary">
                <Link href="/learn">Start Learning</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Analytics

