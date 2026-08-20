import type { ReactNode } from "react";
import EyeButton from "@/components/EyeButton";
import ForestBackground from "@/components/ForestBackground";
import FooterSocials from "@/components/FooterSocials";
import LoadingScreen from "@/components/LoadingScreen";
import RetroTV from "@/components/RetroTV";
import StickyNotes from "@/components/StickyNotes";
import { SHOW_STICKY_NOTES } from "@/lib/sticky-notes";
import { DEFAULT_PAGE_TV_SCALE } from "@/lib/tv-desk-settings";

type Props = {
  children: ReactNode;
  forest?: boolean;
};

export default function SiteChrome({ children, forest = false }: Props) {
  return (
    <>
      <LoadingScreen />
      {forest ? <ForestBackground /> : null}
      {forest || !SHOW_STICKY_NOTES ? null : <StickyNotes />}
      <div className="site">{children}</div>
      {forest ? (
        <RetroTV scale={1} showDesk />
      ) : (
        <footer className="site-footer">
          <RetroTV
            scale={DEFAULT_PAGE_TV_SCALE}
            showDesk={false}
            docked
          />
          <p className="site-footer__motto">
            A focused idiot achieves more
            <br />
            than the distracted genius.
          </p>
          <FooterSocials />
        </footer>
      )}
      <EyeButton />
    </>
  );
}
