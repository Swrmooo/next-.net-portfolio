"use client";

import { CheckCircle2 } from "lucide-react";
import { skills } from "@/constants/site";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { useTranslation } from "@/lib/use-translation";

export function AboutSection() {
  const { messages, t } = useTranslation();

  return (
    <section id="about" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            description={t("about.description")}
          />

          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {messages.about.highlights.map((item) => (
                <Card className="p-5" key={item.label}>
                  <p className="text-2xl font-semibold text-amber-100">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </Card>
              ))}
            </div>

            <Card>
              <div className="grid gap-4 sm:grid-cols-2">
                {messages.about.coreValues.map((item) => (
                  <div className="flex items-center gap-3" key={item}>
                    <CheckCircle2
                      className="text-amber-200"
                      size={18}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div
                    className="rounded-lg border border-amber-200/10 bg-white/[0.03] p-4 text-center transition hover:border-amber-200/30"
                    key={skill.name}
                  >
                    <Icon
                      className="mx-auto text-amber-100"
                      size={22}
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-sm text-slate-300">{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
