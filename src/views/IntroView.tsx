import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Core";
import { Card } from "../components/ui/Layout";

const IntroView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>

      <div className="absolute inset-0 z-0 pointer-events-none ">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-32 h-64 md:w-96 md:h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-64 md:w-96 md:h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-64 md:w-96 md:h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse delay-2000"></div>
          <div className="absolute top-3/4 right-1/3 w-32 h-60 md:w-80 md:h-80 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-pulse delay-1500"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 dark:opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 dark:bg-purple-500 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            ></div>
          ))}
        </div>

        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-50/60 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-purple-50/60 to-transparent dark:from-purple-900/20 dark:to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4   ">
        <div className="space-y-2 max-w-3xl mx-auto">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block relative">
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient pb-2">
                Violet UI Kit
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70"></div>
            </div>

            <p className="text-md md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              A professionally crafted, accessible, and customizable component library built with React, Tailwind CSS, and TypeScript.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 ">
            <Button
              size="md"
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 px-8"
            >
              <span className="relative z-10 text-white">What is New / Develop</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300"></div>
            </Button>

            <Button
              variant="outline"
              size="md"
              className="relative overflow-hidden group border-2 transition-all duration-300 hover:scale-105 dark:border-slate-600 px-8"
            >
              <span className="relative z-10">View on GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </div>

          <Separator className="my-12 opacity-30" />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Type Safe", desc: "Built with TypeScript for a robust development experience.", color: "blue" },
              { title: "Accessible", desc: "Follows WAI-ARIA patterns for maximum inclusivity.", color: "green" },
              { title: "Dark Mode", desc: "Automatic dark mode support via Tailwind 'class' strategy.", color: "purple" },
              { title: "Zero Config", desc: "Copy and paste components. No complex build steps.", color: "orange" }
            ].map((feature, idx) => (
              <Card
                key={idx}
                title={feature.title}
                description={feature.desc}
                className={`relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-${feature.color}-100/50 dark:border-${feature.color}-900/30 hover:shadow-lg hover:shadow-${feature.color}-500/10`}
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${feature.color}-200/20 dark:bg-${feature.color}-900/20 rounded-full group-hover:scale-125 transition-transform duration-500`}></div>
                <div className={`absolute -left-6 -bottom-6 w-24 h-24 bg-${feature.color}-200/20 dark:bg-${feature.color}-900/20 rounded-full group-hover:scale-125 transition-transform duration-500`}></div>

              </Card>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all scale-100">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center border-b dark:border-slate-800 pb-4">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  Updates & Roadmap
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-6 py-2">
                <section>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-3">Recently Added</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Advanced Data Tables with with filters, column drag-and-drop, and data export capabilities
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      A photo gallery with various layouts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      An AI chatbot supporting both Arabic and English languages
                    </li>

                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      A dashboard template
                    </li>

                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      A timeline component

                    </li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-500 mb-3">Under Development</h4>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Making newly added elements responsive for small screens,
                      Adding RTL (right-to-left) support for Arabic language elements,
                      Stat Card Component
                    </p>
                  </div>
                </section>
              </div>

              <Button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2"
              >
                Great, thanks!
              </Button>
            </div>
          </div>
        </div>
      )}
    </>

  )

}

export default IntroView;