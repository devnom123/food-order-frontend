import { CircleUserRound, CircleUserRoundIcon, Menu } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLink from "./MobileNavLink"

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          {isAuthenticated ?
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span> :
            <span>Welcome to MernEats.com!</span>}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? <MobileNavLink /> :
            <Button className="flex-1 font-bold bg-orange-500"
              onClick={async () => await loginWithRedirect()}
            >Log In</Button>
          }
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav