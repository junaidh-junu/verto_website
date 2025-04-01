import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Linkedin, Instagram, FileText, ArrowUpRight, Dribbble } from "lucide-react";

type ContactFormValues = z.infer<typeof contactFormSchema>;

const services = [
  { id: "branding", label: "Branding & Identity" },
  { id: "print", label: "Print Design" },
  { id: "digital", label: "Digital Design" },
  { id: "photography", label: "Photography" },
];

export default function ContactSection() {
  const { toast } = useToast();
  const [servicesSelected, setServicesSelected] = useState<string[]>([]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      services: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ContactFormValues) => 
      apiRequest("POST", "/api/contact", values),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setServicesSelected([]);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Get In Touch</h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Ready to start your project? Contact us to discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Name" 
                                {...field} 
                                className="bg-gray-50 dark:bg-gray-700"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your@email.com" 
                                type="email" 
                                {...field} 
                                className="bg-gray-50 dark:bg-gray-700"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Project Inquiry" 
                              {...field} 
                              className="bg-gray-50 dark:bg-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project..." 
                              rows={5} 
                              {...field} 
                              className="bg-gray-50 dark:bg-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel className="block mb-2">Services You're Interested In</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <FormField
                            key={service.id}
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedServices = checked
                                        ? [...field.value, service.id]
                                        : field.value?.filter((s) => s !== service.id);
                                      field.onChange(updatedServices);
                                      setServicesSelected(updatedServices || []);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {service.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF3366] hover:bg-opacity-90 text-white py-3 h-auto" 
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/3">
            <div className="bg-primary text-white rounded-lg shadow-md p-8 h-full">
              <h3 className="text-2xl font-poppins font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-[#FF3366] mr-4 mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Office Location</h4>
                    <p>123 Creative Avenue, Design District</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF3366] mr-4 mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone Number</h4>
                    <p>(212) 555-1234</p>
                    <p>Mon-Fri, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF3366] mr-4 mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Address</h4>
                    <p>info@vertopixels.com</p>
                    <p>projects@vertopixels.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-white bg-opacity-20 hover:bg-[#FF3366] p-3 rounded-full transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white bg-opacity-20 hover:bg-[#FF3366] p-3 rounded-full transition-colors"
                    aria-label="Dribbble"
                  >
                    <Dribbble className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white bg-opacity-20 hover:bg-[#FF3366] p-3 rounded-full transition-colors"
                    aria-label="Behance"
                  >
                    <FileText className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white bg-opacity-20 hover:bg-[#FF3366] p-3 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
