import { SiteNav } from "@/components/public/site-nav";
import { SiteFooter } from "@/components/public/site-footer";
import { getGlobalSettings } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getGlobalSettings();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <SiteNav brand={settings?.companyName ?? "Blackridge Federal"} />
      {children}
      <SiteFooter />
    </div>
  );
}
