import HomeView from "./home-view";
import { getFirstUser } from "@/lib/demo-user";

export const dynamic = "force-dynamic";

export default async function Home() {
  const firstUser = await getFirstUser();

  return <HomeView email={firstUser?.email ?? null} />;
}
