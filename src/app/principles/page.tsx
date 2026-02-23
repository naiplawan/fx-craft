import { BookOpen, Lightbulb, Heart, Users } from "lucide-react";

export default function PrinciplesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Our Principles
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The philosophy behind SalakCode and how we approach frontend engineering education.
        </p>
      </div>

      <div className="space-y-12">
        <section className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-[#EBF4F6] dark:bg-[#09637E]/20">
              <BookOpen className="w-6 h-6 text-[#088395] dark:text-[#7AB2B2]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Depth Over Breadth
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe in going deep rather than wide. Each article explores a single concept thoroughly, 
              providing you with the mental models and implementation details needed to truly understand 
              the topic. Surface-level explanations don&apos;t stick—deep understanding does.
            </p>
          </div>
        </section>

        <section className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-[#EBF4F6] dark:bg-[#09637E]/20">
              <Lightbulb className="w-6 h-6 text-[#088395] dark:text-[#7AB2B2]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Practical &amp; Theoretical
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Great engineering requires both theory and practice. We explain the &quot;why&quot; behind concepts 
              while providing concrete code examples and real-world use cases. Understanding the underlying 
              principles helps you adapt to any technology, not just the current popular one.
            </p>
          </div>
        </section>

        <section className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-[#EBF4F6] dark:bg-[#09637E]/20">
              <Heart className="w-6 h-6 text-[#088395] dark:text-[#7AB2B2]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Quality First
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We&apos;d rather have 80 well-written articles than 500 mediocre ones. Each piece is researched, 
              reviewed, and refined before publication. We aim for accuracy and clarity over speed.
            </p>
          </div>
        </section>

        <section className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-[#EBF4F6] dark:bg-[#09637E]/20">
              <Users className="w-6 h-6 text-[#088395] dark:text-[#7AB2B2]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Community Driven
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Frontend engineering is a collective effort. We welcome contributions, corrections, and 
              suggestions from the community. The best technical resources are built together.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-16 p-6 rounded-xl bg-[#EBF4F6] dark:bg-[#09637E]/10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Want to contribute?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We&apos;re always looking for contributors who want to share their knowledge. If you&apos;d like to 
          write an article or suggest improvements, please reach out.
        </p>
        <a
          href="mailto:hello@salakcode.dev"
          className="inline-flex items-center gap-2 text-[#088395] dark:text-[#7AB2B2] font-medium hover:underline"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
