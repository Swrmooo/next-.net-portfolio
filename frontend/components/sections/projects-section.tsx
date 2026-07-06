"use client";

import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { useTranslation } from "@/lib/use-translation";

export function ProjectsSection() {
  const { messages, t } = useTranslation();

  return (
    <section id="projects" className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
            description={t("projects.description")}
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {messages.projects.items.map((project) => (
            <Card className="group" key={project.title}>
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <ArrowUpRight
                  className="mt-1 shrink-0 text-amber-200 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={20}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-slate-300"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
