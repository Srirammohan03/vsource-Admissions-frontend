import React from "react";
import HeroBanner from "./HeroBanner";
import QuickLinks from "./QuickLinks";
import Section from "@/components/ui/Section";
import Stats, { Stat } from "./Stats";
import Callout, { CalloutContent } from "./Callout";
import FeesTable, { FeeRow, FeesExtras } from "./FeesTable";
import Accordion, { QA } from "./Accordion";
import Gallery, { GalleryData } from "./Gallery";

export type UniversityData = {
  country: string;
  title: string;
  summary?: string;
  heroUrl: string;
  mobileObjectPosition?: string;
  desktopObjectPosition?: string;
  highlights?: string[];
  quickLinks: { label: string; target: string }[];
  stats?: Stat[];
  callouts?: (
    | { title: string; body: React.ReactNode }
    | { content: CalloutContent }
  )[];
  aboutHtml?: string;
  whyHtml?: string;
  partners?: string[];
  gallery?: GalleryData;
  fees: { rows: FeeRow[]; note?: string; extras?: FeesExtras };
  faqs?: QA[];
};

export default function University(props: UniversityData) {
  const {
    title,
    summary,
    heroUrl,
    mobileObjectPosition,
    desktopObjectPosition,
    highlights = [],
    quickLinks,
    stats,
    callouts,
    gallery,
    fees,
    faqs,
  } = props;

  const isStructuredCallout = (c: any): c is { content: CalloutContent } =>
    c && typeof c === "object" && "content" in c && !!c.content;

  return (
    <div className="bg-[--surface] [--surface:#FFFCFB] [--text:#3A3A3A]">
      <HeroBanner
        title={title}
        summary={summary}
        bgImage={heroUrl}
        highlights={highlights}
        mobileObjectPosition={mobileObjectPosition}
        desktopObjectPosition={desktopObjectPosition}
      />

      <QuickLinks items={quickLinks} />

      {stats?.length ? (
        <Section
          id="overview"
          title="Highlights"
          className="container mx-auto max-w-[80rem] px-4 sm:px-6"
        >
          <Stats items={stats} />
        </Section>
      ) : null}

      {callouts?.map((c, i) => (
        <Section key={i} id={`callout-${i}`}>
          {isStructuredCallout(c) ? (
            <Callout content={c.content} />
          ) : (
            <Callout title={(c as any).title} body={(c as any).body} />
          )}
        </Section>
      ))}

      {gallery && (
        <Section
          id="gallery"
          title="Gallery"
          className="container mx-auto max-w-[80rem] px-4 sm:px-6"
        >
          <Gallery data={gallery} />
        </Section>
      )}

      <Section id="fees">
        <FeesTable rows={fees.rows} note={fees.note} extras={fees.extras} />
      </Section>

      {faqs?.length ? (
        <Section id="faqs">
          <Accordion items={faqs} />
        </Section>
      ) : null}
    </div>
  );
}
