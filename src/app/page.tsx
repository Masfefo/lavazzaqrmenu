import { getMenuData } from "@/lib/menu-data";
import { MenuExperience } from "./MenuExperience";

export const dynamic = "force-dynamic";

export default async function Home() {
  const menu = await getMenuData();
  return <MenuExperience menu={menu} />;
}
