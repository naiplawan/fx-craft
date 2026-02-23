import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBF4F6] via-white to-white dark:from-[#09637E]/10 dark:via-gray-950 dark:to-gray-950" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#088395]/10 dark:bg-[#7AB2B2]/10 text-[#088395] dark:text-[#7AB2B2] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Advanced Frontend Engineering
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Master the craft of
            <span className="text-[#088395] dark:text-[#7AB2B2]"> frontend engineering</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            A curated knowledge base of 80+ deep technical concepts every senior developer should know. 
            From hydration to fiber architecture, from CORS to CRDTs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 font-medium hover:bg-[#09637E] dark:hover:bg-[#88c4c4] transition-colors"
            >
              Explore Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/principles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Our Principles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
