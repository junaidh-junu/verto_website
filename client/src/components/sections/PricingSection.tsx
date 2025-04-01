import { useState } from "react";
import { pricingPlans, pricingFAQs } from "@/data/pricingData";
import { Button } from "@/components/ui/button";
import { Check, X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  
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
  
  const calculatePrice = (price: number | 'Custom') => {
    if (price === 'Custom') return 'Custom';
    return billingPeriod === 'annual' ? Math.round(price * 0.9) : price;
  };

  return (
    <section id="pricing" className="py-16 md:py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div 
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span className="inline-block text-[#FF3366] font-medium mb-2 px-3 py-1 bg-[#FF3366]/10 rounded-full text-sm">
            Pricing Plans
          </motion.span>
          <motion.h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
            Find Your Perfect Package
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Transparent pricing designed to scale with your business needs. Choose the package that best aligns with your branding goals.
          </motion.p>
        </motion.div>
        
        {/* Billing Period Toggle */}
        <motion.div className="flex justify-center mb-12" variants={itemVariants}>
          <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly' 
                  ? 'bg-[#FF3366] text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'annual' 
                  ? 'bg-[#FF3366] text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual
              {billingPeriod === 'annual' ? (
                <span className="ml-1"></span>
              ) : (
                <span className="ml-1 text-xs text-[#FF3366]">Save 10%</span>
              )}
            </button>
          </div>
        </motion.div>
        
        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          {pricingPlans.map((plan) => (
            <motion.div key={plan.id} variants={itemVariants}>
              <Card className={`h-full flex flex-col border-2 ${
                plan.isMostPopular 
                  ? 'border-[#FF3366] shadow-lg shadow-[#FF3366]/10' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}>
                <CardHeader className="pb-0">
                  {plan.isMostPopular && (
                    <Badge className="self-start mb-2 bg-[#FF3366]">Most Popular</Badge>
                  )}
                  <h3 className="text-2xl font-poppins font-bold">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4">{plan.description}</p>
                  <div className="mt-4 mb-6">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-4xl font-bold">${calculatePrice(plan.price)}</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1">
                          {billingPeriod === 'monthly' ? '/project' : '/project'}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">{plan.price}</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.included.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#FF3366] mr-2 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                    
                    {plan.features.excluded && plan.features.excluded.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-500 dark:text-gray-500">
                        <X className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    className={`w-full ${
                      plan.isMostPopular 
                        ? 'bg-[#FF3366] hover:bg-opacity-90 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
          <h3 className="text-2xl font-poppins font-bold text-center mb-8">Frequently Asked Questions</h3>
          
          <Accordion type="single" collapsible className="space-y-4">
            {pricingFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <p className="text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h4 className="text-xl font-poppins font-semibold mb-3">
              Need a custom solution?
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our team can create a tailored package to meet your specific branding requirements.
            </p>
            <Button className="bg-[#FF3366] hover:bg-opacity-90 text-white">
              Contact Us for Custom Quote
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}