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
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">Total Solved</div>
                  <p className="text-xs text-muted-foreground">1503</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">Total Solved</div>
                  <p className="text-xs text-muted-foreground">1503</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">Total Solved</div>
                  <p className="text-xs text-muted-foreground">1503</p>
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
            <CardContent>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="text-2xl font-bold">Functions</div>
                  <p className="text-xs text-muted-foreground">Beginner</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-2xl font-bold">Functions</div>
                  <p className="text-xs text-muted-foreground">Beginner</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-2xl font-bold">Functions</div>
                  <p className="text-xs text-muted-foreground">Beginner</p>
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

