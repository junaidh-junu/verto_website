import { teamMembers } from "@/data/teamData";
import { Card, CardContent } from "@/components/ui/card";
import {
  Linkedin,
  Dribbble,
  Instagram,
  Twitter,
  FileText,
  ArrowUpRight,
} from "lucide-react";

// Map social media keys to icons
const socialIcons: Record<string, any> = {
  linkedin: Linkedin,
  dribbble: Dribbble,
  behance: FileText, // Using FileText as a placeholder for Behance
  instagram: Instagram,
  twitter: Twitter,
  medium: FileText, // Using FileText as a placeholder for Medium
  pinterest: ArrowUpRight, // Using ArrowUpRight as a placeholder for Pinterest
};

export default function TeamSection() {
  return (
    <section
      id="team"
      className="py-16 md:py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Our talented team of designers, strategists, and creatives bring
            your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-secondary dark:bg-gray-800 border-none overflow-hidden shadow-md transition-transform hover:-translate-y-2 duration-300"
            >
              <img
                src={member.image}
                alt={`${member.name} - ${member.position}`}
                className="w-full h-64 object-cover object-center"
                loading="lazy"
              />
              <CardContent className="p-6">
                <h3 className="font-poppins font-semibold text-xl mb-1">
                  {member.name}
                </h3>
                <p className="text-[#FF3366] mb-3">{member.position}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  {Object.entries(member.social).map(([platform, url]) => {
                    const IconComponent = socialIcons[platform];
                    return (
                      IconComponent && (
                        <a
                          key={platform}
                          href={url}
                          className="text-gray-600 dark:text-gray-400 hover:text-[#FF3366] transition-colors"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </a>
                      )
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
