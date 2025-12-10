import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Globe } from "lucide-react";

type Social = { platform: "linkedin" | "twitter" | "website"; href: string };
type TeamMember = {
  id?: string;
  name: string;
  role?: string;
  department?: string;
  description?: string;
  credentialsSummary?: string;
  avatar?: string;
  social?: Social[];
  languages?: string[];
};

const Team6 = ({
  title = "Our Board",
  members,
  onReadBio,
}: {
  title?: string;
  members: TeamMember[];
  onReadBio?: (m: TeamMember) => void;
}) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {members.map((member, idx) => (
            <div
              key={member.id ?? `${member.name}-${idx}`}
              className="group relative p-8 md:p-10 border border-border bg-card dark:bg-[#1A1A1A] dark:border-[#2D2D2D] rounded-2xl shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300"
            >
              <div className="md:flex md:items-start md:gap-8">
                <div className="mb-6 md:mb-0 md:w-32 md:flex-shrink-0">
                  <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-white dark:border-slate-700 shadow-lg">
                    {member.avatar && <AvatarImage src={member.avatar} alt={member.name} loading="lazy" decoding="async" />}
                    <AvatarFallback className="text-foreground text-2xl font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-left md:flex-1">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">{member.name}</h3>
                  {member.role && (
                    <span className="inline-flex items-center rounded-full bg-ocean/10 text-ocean border border-ocean/20 dark:bg-sky/10 dark:text-sky dark:border-sky/20 px-3 py-1 text-xs font-semibold mb-2">
                      {member.role}
                    </span>
                  )}
                  {member.department && (
                    <Badge variant="outline" className="text-xs mb-2">{member.department}</Badge>
                  )}
                
                  {Array.isArray(member.languages) && member.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3" aria-label={`Languages for ${member.name}`}>
                      {member.languages.map((lang) => (
                        <span key={`${member.name}-${lang}`} className="inline-flex items-center rounded-full bg-muted text-muted-foreground border border-border px-2.5 py-0.5 text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                  {member.credentialsSummary && (
                    <p className="text-foreground text-sm md:text-base leading-relaxed mb-2" style={{ textAlign: 'justify' }}>{member.credentialsSummary}</p>
                  )}
                  {member.description && (
                    <p className="text-foreground text-base md:text-[17px] leading-7 tracking-normal whitespace-pre-line" style={{ textAlign: 'justify' }}>
                      {member.description}
                    </p>
                  )}
                  {Array.isArray(member.social) && member.social.length > 0 && (
                    <div className="flex items-center md:justify-start justify-center gap-2 mt-4" aria-label={`Social links for ${member.name}`}
                    >
                      {member.social.map((s) => {
                        const Icon = s.platform === "linkedin" ? Linkedin : s.platform === "twitter" ? Twitter : Globe;
                        const label = s.platform === "linkedin" ? "LinkedIn" : s.platform === "twitter" ? "X" : "Website";
                        return (
                          <a
                            key={`${member.name}-${s.platform}`}
                            href={s.href}
                            target={s.href?.startsWith("http") ? "_blank" : undefined}
                            rel={s.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                            aria-label={`${member.name} on ${label}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground shadow hover:bg-ocean/10 dark:hover:bg-sky/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors"
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {onReadBio && (
                    <div className="mt-6">
                    <Button variant="outline" onClick={() => onReadBio(member)} className="px-3 py-1.5 text-xs transition-all duration-300 ease-out hover:translate-y-[1px]">
                      Read Bio
                    </Button>
                  </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team6 };
