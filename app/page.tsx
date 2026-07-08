 import HowItWorks from "@/components/landing/HowItWorks";
import WhyGuardian from "@/components/landing/WhyGuardian";
import FAQ from "@/components/landing/FAQ";
 import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
   const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (
    <>
      <Navbar />
      <Hero />
      <WhyGuardian />
     <HowItWorks />
      <FAQ />
    
      <Footer /> 
    </>
  );
}