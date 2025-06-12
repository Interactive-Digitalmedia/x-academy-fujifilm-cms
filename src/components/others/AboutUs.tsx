import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import BasicEditor from "../ui/basiceditor";

const AboutUs = () => {
  return (
    <div className="mx-auto -mt-2 w-[100%] max-w-5xl px-2">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="about">
          <AccordionTrigger>About X Academy</AccordionTrigger>
          <div className="w-full">
            <AccordionContent className="!border-none !p-0 !shadow-none !rounded-none">
              <div className="rounded-lg border border-gray-300">
                <BasicEditor />
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="contact">
          <AccordionTrigger>Contact and Support Info</AccordionTrigger>
          <AccordionContent>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="johndoe@email.com"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    defaultValue="8471901293"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Contact Address
                </label>
                <input
                  type="text"
                  defaultValue="Bengaluru, Karnataka"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    defaultValue="xyz"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="text"
                    defaultValue="xyz"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms">
          <AccordionTrigger>Terms and Conditions</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              These are the terms and conditions of using X Academy. Please read
              them carefully. By accessing or using our services, you agree to
              abide by these terms.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger>Privacy Policy</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              We are committed to protecting your privacy. This policy outlines
              how we collect, use, and safeguard your personal information.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cookie">
          <AccordionTrigger>Cookie Policy</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              Our website uses cookies to enhance your browsing experience.
              Cookies help us understand user behavior and improve our platform.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="refund">
          <AccordionTrigger>Refund Policy</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              All refund requests are subject to our review. Please contact our
              support team with valid reasons within 7 days of the transaction.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="guidelines">
          <AccordionTrigger>Community Guidelines</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 text-sm text-gray-700 leading-relaxed">
              Our community is built on respect and collaboration. Please follow
              these guidelines to maintain a safe and inclusive environment.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutUs;
