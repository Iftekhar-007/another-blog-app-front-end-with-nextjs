export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const session = await userService.getSession();

  console.log(session);

  return (
    <div>
      {" "}
      <Button>Click Me</Button>
    </div>
  );
}
