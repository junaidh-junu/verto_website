import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react"; // Changed from PaperPlaneIcon to Send which exists in lucide-react
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function Footer() {
  const { toast } = useToast();
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: NewsletterFormValues) {
    toast({
      title: "Subscribed to newsletter",
      description: `${data.email} has been added to our mailing list.`,
    });
    form.reset();
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-poppins font-bold">
                VERTO<span className="text-[#FF3366]">.</span>
              </span>
            </a>
            <p className="mb-4 text-gray-300">
              Crafting memorable visual experiences through strategic design and
              creative excellence.
            </p>
            <p className="text-gray-300">
              &copy; {currentYear} VERTO Crafting Pixels. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#services"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Branding & Identity
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Print Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Digital Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Photography
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Marketing Collateral
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#home"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#FF3366] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">
              Newsletter
            </h4>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter for design tips and company updates.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex space-x-0"
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-white bg-opacity-10 border border-gray-700 focus:border-[#FF3366] transition-colors w-full text-white placeholder:text-gray-400"
                  {...form.register("email")}
                />
                <Button
                  type="submit"
                  className="bg-[#FF3366] hover:bg-opacity-90 rounded-l-none"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </footer>
  );
}
