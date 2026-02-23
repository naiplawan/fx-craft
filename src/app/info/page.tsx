import { Code2, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EBF4F6] dark:bg-[#09637E]/20 mb-6">
          <Code2 className="w-8 h-8 text-[#088395] dark:text-[#7AB2B2]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          About SalakCode
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A curated knowledge base for advanced frontend engineering concepts.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          SalakCode is a comprehensive resource for frontend engineers who want to go beyond the basics. 
          We cover the deep technical concepts that power modern web applications—from React internals 
          and browser APIs to security, performance, and architecture patterns.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">
          Why SalakCode?
        </h2>

        <p>
          The frontend ecosystem moves fast. New frameworks, tools, and patterns emerge constantly. 
          But underneath the changing surface, there are fundamental concepts that remain constant. 
          Understanding these core principles makes you adaptable to any technology.
        </p>

        <p>
          We created SalakCode to:
        </p>

        <ul className="space-y-2">
          <li>Provide deep, accurate technical content without the fluff</li>
          <li>Explain complex concepts with clear examples and diagrams</li>
          <li>Cover the &quot;why&quot; behind technologies, not just the &quot;how&quot;</li>
          <li>Build a lasting reference for senior developers and those becoming one</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">
          What We Cover
        </h2>

        <p>
          Our 80+ articles span ten categories:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 not-prose">
          {[
            ["Rendering", "Hydration, SSR, Islands, Streaming"],
            ["React Internals", "Fiber, Reconciliation, Suspense"],
            ["Performance", "Web Vitals, CRP, Optimization"],
            ["JavaScript Core", "Closures, Event Loop, Async"],
            ["Browser APIs", "Workers, WebAssembly, Observers"],
            ["Networking", "HTTP/2, Caching, APIs"],
            ["Security", "CORS, CSP, XSS Prevention"],
            ["Architecture", "Micro-frontends, CRDTs, Patterns"],
            ["Bundling", "Tree Shaking, Code Splitting"],
            ["Accessibility", "ARIA, Focus, Screen Readers"],
          ].map(([category, topics]) => (
            <div key={category} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{category}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{topics}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4">
          Technology
        </h2>

        <p>
          SalakCode is built with modern web technologies:
        </p>

        <ul className="space-y-2">
          <li><strong>Next.js 15</strong> - React framework with static generation</li>
          <li><strong>React 19</strong> - UI library</li>
          <li><strong>TypeScript</strong> - Type safety</li>
          <li><strong>Tailwind CSS 4</strong> - Utility-first styling</li>
          <li><strong>MDX</strong> - Markdown with JSX components</li>
        </ul>

        <p>
          The site is statically generated, meaning it loads fast and works offline. 
          No database, no backend—just carefully crafted content served as static files.
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Connect With Us
        </h3>
        
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://github.com/salakcode"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            GitHub
          </Link>
          
          <Link
            href="https://twitter.com/salakcode"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </Link>
          
          <Link
            href="mailto:hello@salakcode.dev"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email
          </Link>
        </div>
      </div>
    </div>
  );
}
