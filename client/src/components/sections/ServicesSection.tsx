import { services } from "@/data/servicesData";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Our Services</h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            We deliver comprehensive design solutions tailored to your brand's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-white dark:bg-gray-800 border-none shadow-md transition-transform hover:-translate-y-2 duration-300"
            >
              <CardContent className="p-8">
                <div className="text-[#FF3366] mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-[#FF3366] mr-2 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
