"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ParticlesBackground from "../_components/ParticlesBackground";

const plans = [
  {
    name: "Basic",
    price: "Free",
    interviews: "5 Interviews / month",
    features: ["Access to mock interview generator", "Basic support"],
    highlight: false,
    current: true,
  },
  {
    name: "Pro",
    price: "₹399/mo",
    interviews: "20 Interviews / month",
    features: [
      "All Basic and Standard features",
      "Priority support",
      "Access to feedback module",
    ],
    highlight: true,
    current: false,
  },
  {
    name: "Standard",
    price: "₹199/mo",
    interviews: "10 Interviews / month",
    features: ["Extended mock limits", "Email support"],
    highlight: false,
    current: false,
  },
];

export default function UpgradePage() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="min-h-screen py-12 px-4 md:px-10 lg:px-32 bg-transparent text-white">
        {/* <ParticlesBackground/> */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Upgrade Your Plan</h1>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Choose the plan that fits your goals and unlock premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border border-gray-700 p-6 flex flex-col justify-between text-white transform transition-transform duration-300 hover:scale-105 ${
                plan.highlight
                  ? "md:scale-110 md:-translate-y-4 border-[#45ABBF] shadow-2xl"
                  : ""
              }`}
            >
              <div>
                <h2 className="text-xl font-bold mb-2 text-center">
                  {plan.name}
                </h2>
                <p className="text-3xl font-extrabold text-center mb-2">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-400 text-center mb-6">
                  {plan.interviews}
                </p>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm leading-5"
                    >
                      <CheckCircle2 className="text-green-400 w-4 h-4 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center">
                <Button
                  disabled={plan.current}
                  onClick={() => {
                    if (!plan.current) setOpenDialog(true);
                  }}
                  variant={plan.highlight ? "default" : "outline"}
                  className={`
                    w-full cursor-pointer transition-all duration-300 
                    ${plan.current
                      ? "bg-gray-500 text-white opacity-70 cursor-not-allowed"
                      : plan.highlight
                      ? "bg-[#45ABBF] text-black hover:bg-[#39a2af]"
                      : "hover:bg-white hover:text-black"}
                  `}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for non-functional payment */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[rgb(25,25,40)] border-none text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">Coming Soon</DialogTitle>
            <DialogDescription className="text-sm text-gray-400 mt-2">
              Payment gateway is not yet integrated. This feature will be
              available in a future update.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
