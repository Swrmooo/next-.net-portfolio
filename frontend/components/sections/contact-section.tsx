"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { useTranslation } from "@/lib/use-translation";
import {
  sendContactMessage,
  type ContactMessagePayload,
} from "@/services/contact-service";

const initialFormData: ContactMessagePayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type SubmitStatus = "idle" | "success" | "error";

export function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] =
    useState<ContactMessagePayload>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await sendContactMessage(formData);
      setFormData(initialFormData);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-amber-200/10 bg-black/15 py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow={t("contact.eyebrow")}
              title={t("contact.title")}
              description={t("contact.description")}
            />
            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <p className="flex items-center gap-3">
                <Mail size={18} className="text-amber-200" aria-hidden="true" />
                {siteConfig.email}
              </p>
              <p className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-amber-200"
                  aria-hidden="true"
                />
                {siteConfig.location}
              </p>
            </div>
          </div>

          <Card>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                  disabled={isSubmitting}
                  name="name"
                  onChange={handleChange}
                  placeholder={t("contact.fields.name")}
                  required
                  type="text"
                  value={formData.name}
                />
                <input
                  className="rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                  disabled={isSubmitting}
                  name="email"
                  onChange={handleChange}
                  placeholder={t("contact.fields.email")}
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
              <input
                className="rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                disabled={isSubmitting}
                name="subject"
                onChange={handleChange}
                placeholder={t("contact.fields.subject")}
                required
                type="text"
                value={formData.subject}
              />
              <textarea
                className="min-h-36 rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                disabled={isSubmitting}
                name="message"
                onChange={handleChange}
                placeholder={t("contact.fields.message")}
                required
                value={formData.message}
              />
              {submitStatus !== "idle" && (
                <p
                  aria-live="polite"
                  className={
                    submitStatus === "success"
                      ? "text-sm text-amber-100"
                      : "text-sm text-red-300"
                  }
                >
                  {submitStatus === "success"
                    ? t("contact.success")
                    : t("contact.error")}
                </p>
              )}
              <Button
                className="w-full sm:w-fit"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? t("contact.sending") : t("contact.submit")}
                <Send size={16} aria-hidden="true" />
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
