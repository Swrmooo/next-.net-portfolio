"use client";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { useTranslation } from "@/lib/use-translation";

export function ExperienceSection() {
  const { messages, t } = useTranslation();

  return (
    <section
      id="experience"
      className="border-y border-amber-200/10 bg-black/15 py-20 sm:py-24"
    >
      <Container>
        <SectionTitle
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          description={t("experience.description")}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {messages.experience.items.map((experience, index) => (
            <Card key={experience.company}>
              <p className="text-sm text-amber-200">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {experience.company}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{experience.role}</p>
              {experience.note ? (
                <p className="mt-4 border-t border-amber-200/10 pt-4 text-sm leading-6 text-slate-400">
                  {experience.note}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
