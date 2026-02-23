import Link from "next/link";
import { FileX, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#EBF4F6] dark:bg-[#09637E]/20 mb-6">
          <FileX className="w-10 h-10 text-[#088395] dark:text-[#7AB2B2]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page not found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#088395] dark:bg-[#7AB2B2] text-white dark:text-gray-950 font-medium hover:bg-[#09637E] dark:hover:bg-[#88c4c4] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
