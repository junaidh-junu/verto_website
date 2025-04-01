import { useState } from "react";
import { services } from "@/data/servicesData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ChevronRight, 
  ExternalLink, 
  Phone,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ServiceDetailProps {
  service: typeof services[0];
  isOpen: boolean;
  onClose: () => void;
}

function ServiceDetail({ service, isOpen, onClose }: ServiceDetailProps) {
  if (!service) return null;
  
  const processSteps = [
    { 
      title: "Consultation & Discovery", 
      description: "We'll begin with a thorough consultation to understand your brand values, target audience, and project objectives." 
    },
    { 
      title: "Research & Strategy", 
      description: "Our team conducts comprehensive market research to inform a tailored strategy for your specific needs." 
    },
    {
      title: "Creative Development",
      description: "We craft initial designs and concepts based on the approved strategy, ensuring alignment with your brand vision."
    },
    {
      title: "Refinement & Approval",
      description: "Through collaborative feedback sessions, we refine the work until it perfectly meets your expectations."
    },
    {
      title: "Implementation & Support",
      description: "We deliver final assets and provide ongoing support to ensure successful implementation across all channels."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] bg-white dark:bg-gray-900 overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#FF3366]/10 p-3 rounded-lg">
              <service.icon className="h-8 w-8 text-[#FF3366]" />
            </div>
            <DialogTitle className="text-2xl font-poppins">{service.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">What We Offer</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-[#FF3366]/10 p-1 rounded-full mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-[#FF3366]" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Why Choose Us</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our {service.title.toLowerCase()} services stand out because of our experienced team,
                attention to detail, and commitment to delivering results that exceed expectations.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <Button className="bg-[#FF3366] hover:bg-opacity-90 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Request a Quote
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Our Process</h3>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative pl-8">
                    {index < processSteps.length - 1 && (
                      <div className="absolute left-3 top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="absolute left-0 top-1 bg-[#FF3366] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-medium mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const openServiceDetail = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };
  
  const closeServiceDetail = () => {
    setIsDialogOpen(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    },
  };

  return (
    <section id="services" className="py-16 md:py-24 px-6">
      <motion.div 
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span className="inline-block text-[#FF3366] font-medium mb-2 px-3 py-1 bg-[#FF3366]/10 rounded-full text-sm">
            What We Do
          </motion.span>
          <motion.h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
            Our Creative Services
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            We deliver comprehensive design solutions tailored to your brand's unique needs,
            ensuring each project exceeds expectations.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="bg-white dark:bg-gray-800 border-none shadow-xl h-full flex flex-col overflow-hidden group">
                <CardContent className="p-8 flex-grow">
                  <div className="text-[#FF3366] mb-4 bg-[#FF3366]/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-[#FF3366] transition-colors duration-300">
                    <service.icon className="h-8 w-8 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-[#FF3366] mr-2 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 2 && (
                      <li className="text-[#FF3366] text-sm">+ {service.features.length - 2} more features</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter className="px-8 pb-8 pt-0">
                  <Button 
                    onClick={() => openServiceDetail(service)}
                    variant="outline" 
                    className="w-full justify-between group-hover:text-[#FF3366] group-hover:border-[#FF3366] transition-colors"
                  >
                    Learn More
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Add a CTA banner */}
        <motion.div 
          className="mt-16 bg-[#FF3366] rounded-2xl p-8 md:p-12 relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366] to-[#FF8080] opacity-90" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-white md:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-3">Ready to elevate your brand?</h3>
              <p className="text-white/90">
                Let's discuss how our design expertise can help you achieve your business goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-[#FF3366] hover:bg-opacity-90 font-medium px-6 py-3 h-auto">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-medium px-6 py-3 h-auto flex items-center gap-2">
                View Pricing
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Service Detail Dialog */}
      {selectedService && (
        <ServiceDetail 
          service={selectedService}
          isOpen={isDialogOpen}
          onClose={closeServiceDetail}
        />
      )}
    </section>
  );
}
