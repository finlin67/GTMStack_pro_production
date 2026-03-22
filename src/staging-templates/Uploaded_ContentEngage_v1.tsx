import Link from 'next/link';
import { 
  Compass, PenTool, AtSign, Users, Video, Infinity as InfinityIcon, 
  Mail, PlayCircle, FileText, Calendar, Share2, Activity, Zap 
} from 'lucide-react';

export interface Discipline {
  title: string;
  description: string;
  icon: 'PenTool' | 'AtSign' | 'Users' | 'Video' | 'InfinityIcon';
}

export interface FrameworkStep {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TimelineItem {
  label: string;
  icon: 'Mail' | 'Users' | 'PlayCircle' | 'FileText' | 'Calendar';
}

export interface TemplateContent {
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  heroCta1: string;
  heroCta2: string;
  heroGraphicCenter: string;
  heroGraphicTopLeft: string;
  heroGraphicTopRight: string;
  heroGraphicBottomLeft: string;
  heroGraphicBottomRight: string;
  disciplinesTitle: string;
  disciplinesItems: Discipline[];
  frameworkTitle: string;
  frameworkSteps: FrameworkStep[];
  journeyTitle: string;
  journeySubtitle: string;
  journeyTimeline: TimelineItem[];
  journeyGraphicNode1: string;
  journeyGraphicNode2: string;
  journeyGraphicCenter: string;
  journeyGraphicNode3: string;
  journeyGraphicNode4: string;
  journeyStats: Stat[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton1: string;
  ctaButton2: string;
  footerLogo: string;
  footerCopyright: string;
  footerLinks: string[];
}

const DEFAULT_CONTENT: TemplateContent = {
  heroTitle1: "Where Content Becomes",
  heroTitle2: "Engineered Authority",
  heroDescription: "We don't create content — we architect buyer conviction. Omnichannel journeys that move audiences from awareness to action.",
  heroCta1: "Get Started",
  heroCta2: "View Framework",
  heroGraphicCenter: "Core_Engine",
  heroGraphicTopLeft: "Input_01",
  heroGraphicTopRight: "Dist_Net",
  heroGraphicBottomLeft: "Val_Opt",
  heroGraphicBottomRight: "Conv_Out",
  disciplinesTitle: "What We Do: Five Disciplines. One Unified Voice.",
  disciplinesItems: [
    {
      title: "Content Marketing",
      description: "Architecting authority through long-form depth and strategic narratives.",
      icon: "PenTool"
    },
    {
      title: "Email Marketing",
      description: "Nurturing leads into loyal advocates with automated precision.",
      icon: "AtSign"
    },
    {
      title: "Social Media",
      description: "Building community and amplified brand voice across platforms.",
      icon: "Users"
    },
    {
      title: "Video Marketing",
      description: "Visual storytelling designed for high-impact engagement.",
      icon: "Video"
    },
    {
      title: "Omnichannel",
      description: "Unified experiences seamlessly delivered across every touchpoint.",
      icon: "InfinityIcon"
    }
  ],
  frameworkTitle: "The Content Engine Framework",
  frameworkSteps: [
    {
      number: "01",
      title: "Orchestrate",
      description: "Deep strategic planning, persona mapping, and architectural content creation."
    },
    {
      number: "02",
      title: "Distribute",
      description: "Algorithmic delivery through the right channels at the peak moment of impact."
    },
    {
      number: "03",
      title: "Convert",
      description: "Translating attention into pipeline value with conversion-optimized pathways."
    }
  ],
  journeyTitle: "Omnichannel Journeys: Engineered for Conviction",
  journeySubtitle: "See how we bridge the gap between initial contact and final decision with a data-backed journey.",
  journeyTimeline: [
    { label: "Email", icon: "Mail" },
    { label: "Social", icon: "Users" },
    { label: "Video", icon: "PlayCircle" },
    { label: "Blog", icon: "FileText" },
    { label: "Events", icon: "Calendar" }
  ],
  journeyGraphicNode1: "EMAIL",
  journeyGraphicNode2: "SOCIAL",
  journeyGraphicCenter: "CONVICTION NODE",
  journeyGraphicNode3: "VIDEO",
  journeyGraphicNode4: "EVENTS",
  journeyStats: [
    { value: "4.2x", label: "ENGAGEMENT ROI" },
    { value: "68%", label: "FASTER CLOSE RATE" },
    { value: "3.1x", label: "PIPELINE VELOCITY" },
    { value: "91%", label: "BRAND RECALL" }
  ],
  ctaTitle: "Ready to Build Engineered Authority?",
  ctaDescription: "Join high-growth teams using GTMStack to architect journeys that convert. Your content is more than just assets—it's your ultimate sales machine.",
  ctaButton1: "Start Your Journey",
  ctaButton2: "View examples",
  footerLogo: "GTMStack.pro",
  footerCopyright: "© 2024 GTMStack. All rights reserved.",
  footerLinks: ["Privacy Policy", "Terms of Service", "LinkedIn"]
};

export default function Template({ content, pageTitle }: { content?: unknown; pageTitle?: string }) {
  const data = (content as TemplateContent) || DEFAULT_CONTENT;

  const getIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'PenTool': return <PenTool className={className} />;
      case 'AtSign': return <AtSign className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Video': return <Video className={className} />;
      case 'InfinityIcon': return <InfinityIcon className={className} />;
      case 'Mail': return <Mail className={className} />;
      case 'PlayCircle': return <PlayCircle className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      default: return <PenTool className={className} />;
    }
  };

  return (
    <div className="font-['Inter',_sans-serif] antialiased bg-[#0F172A] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                {data.heroTitle1} <br/>
                <span className="text-[#60A5FA]">{data.heroTitle2}</span>
              </h1>
              <p className="text-slate-300 text-lg lg:text-xl font-light leading-relaxed max-w-lg">
                {data.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#" className="px-8 py-4 bg-[#EAB308] text-[#0F172A] font-bold rounded hover:bg-[#FACC15] transition-colors">
                  {data.heroCta1}
                </Link>
                <Link href="#" className="px-8 py-4 bg-[#1E293B] text-white font-bold rounded hover:bg-[#334155] transition-colors border border-slate-700">
                  {data.heroCta2}
                </Link>
              </div>
            </div>
            
            {/* Node Graph Graphic */}
            <div className="hidden lg:block relative w-full aspect-square max-w-lg mx-auto bg-[#1E293B]/30 border border-slate-700/50 rounded-2xl overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30"></div>
              
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ strokeDasharray: '4 4' }}>
                <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#475569" strokeWidth="2" />
                <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="#475569" strokeWidth="2" />
                <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#475569" strokeWidth="2" />
                <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="#475569" strokeWidth="2" />
              </svg>

              {/* Center Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl border-2 border-[#EAB308] bg-[#0F172A] flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)] z-10">
                  <Compass className="w-8 h-8 text-[#EAB308]" />
                </div>
                <div className="mt-2 bg-[#EAB308] text-[#0F172A] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{data.heroGraphicCenter}</div>
              </div>

              {/* Top Left Node */}
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl border-2 border-blue-400 bg-[#0F172A] flex items-center justify-center z-10">
                  <Share2 className="w-5 h-5 text-blue-400" />
                </div>
                <div className="mt-2 text-blue-400 text-[10px] font-bold uppercase tracking-wider">{data.heroGraphicTopLeft}</div>
              </div>

              {/* Top Right Node */}
              <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl border-2 border-purple-400 bg-[#0F172A] flex items-center justify-center z-10">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div className="mt-2 text-purple-400 text-[10px] font-bold uppercase tracking-wider">{data.heroGraphicTopRight}</div>
              </div>

              {/* Bottom Left Node */}
              <div className="absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl border-2 border-emerald-400 bg-[#0F172A] flex items-center justify-center z-10">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="mt-2 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">{data.heroGraphicBottomLeft}</div>
              </div>

              {/* Bottom Right Node */}
              <div className="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl border-2 border-orange-400 bg-[#0F172A] flex items-center justify-center z-10">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div className="mt-2 text-orange-400 text-[10px] font-bold uppercase tracking-wider">{data.heroGraphicBottomRight}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplines Section */}
      <section className="py-24 bg-[#F8FAFC] text-slate-900">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              {data.disciplinesTitle}
            </h2>
            <div className="w-16 h-1 bg-[#EAB308] mt-6"></div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.disciplinesItems.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="mb-6 text-[#EAB308]">
                  {getIcon(item.icon, "w-8 h-8")}
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section className="py-24 bg-[#0F172A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              {data.frameworkTitle}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto gap-8 md:gap-0">
            {data.frameworkSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center flex-1 w-full">
                <div className="relative text-center flex flex-col items-center w-full md:w-auto">
                  <div className="w-16 h-16 rounded-full border-2 border-[#EAB308] bg-[#0F172A] flex items-center justify-center text-xl font-bold text-[#EAB308] mb-6 z-10">
                    {step.number}
                  </div>
                  <h3 className="text-xl text-white font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm max-w-[250px] mx-auto">{step.description}</p>
                </div>
                {index < data.frameworkSteps.length - 1 && (
                  <div className="hidden md:block flex-1 h-[2px] border-t-2 border-dashed border-slate-700 mx-4 -mt-24"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Map Section */}
      <section className="py-24 bg-[#F8FAFC] text-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">
              {data.journeyTitle}
            </h2>
            <p className="text-slate-500 text-lg">
              {data.journeySubtitle}
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto mb-24">
            <div className="absolute left-0 right-0 h-[2px] bg-slate-200 top-6 -z-0"></div>
            <div className="flex justify-between relative z-10">
              {data.journeyTimeline.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#EAB308] bg-white flex items-center justify-center text-[#EAB308] mb-4">
                    {getIcon(item.icon, "w-5 h-5")}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Graphic */}
          <div className="p-12 bg-[#F4F6F8] rounded-3xl relative min-h-[400px] flex items-center justify-center mb-24">
            <div className="relative w-full h-full flex flex-wrap justify-center gap-12 items-center">
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg border border-[#AED6F1]/30 flex flex-col items-center justify-center p-4">
                <span className="font-bold text-xs mb-1 text-[#00D1FF]">{data.journeyGraphicNode1}</span>
                <div className="w-2 h-2 rounded-full animate-pulse bg-[#00D1FF]"></div>
              </div>
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg border border-[#AED6F1]/30 flex flex-col items-center justify-center p-4">
                <span className="font-bold text-xs mb-1 text-[#00D1FF]">{data.journeyGraphicNode2}</span>
                <div className="w-2 h-2 rounded-full animate-pulse delay-150 bg-[#00D1FF]"></div>
              </div>
              <div className="w-32 h-32 bg-[#0A1628] rounded-full shadow-2xl flex items-center justify-center p-4 text-white font-bold text-sm text-center border border-white/10">
                {data.journeyGraphicCenter}
              </div>
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg border border-[#AED6F1]/30 flex flex-col items-center justify-center p-4">
                <span className="font-bold text-xs mb-1 text-[#00D1FF]">{data.journeyGraphicNode3}</span>
                <div className="w-2 h-2 rounded-full animate-pulse delay-300 bg-[#00D1FF]"></div>
              </div>
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg border border-[#AED6F1]/30 flex flex-col items-center justify-center p-4">
                <span className="text-[#EAB308] font-bold text-xs mb-1">{data.journeyGraphicNode4}</span>
                <div className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse delay-500"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {data.journeyStats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold text-[#EAB308] mb-2">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#1E293B] text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {data.ctaTitle}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              {data.ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link href="#" className="px-8 py-4 bg-[#EAB308] text-[#0F172A] font-bold rounded hover:bg-[#FACC15] transition-colors">
                {data.ctaButton1}
              </Link>
              <Link href="#" className="px-8 py-4 bg-[#0F172A] text-white font-bold rounded hover:bg-slate-800 transition-colors border border-slate-700">
                {data.ctaButton2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1120] py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs font-medium">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-5 h-5 bg-[#EAB308] rounded-sm flex items-center justify-center text-[#0F172A]">
              <Compass className="w-3 h-3" />
            </div>
            <span className="font-bold text-white text-sm">{data.footerLogo}</span>
          </div>
          <div className="flex gap-6 mb-4 md:mb-0">
            {data.footerLinks.map((link, i) => (
              <Link key={i} href="#" className="hover:text-white transition-colors">{link}</Link>
            ))}
          </div>
          <div>
            {data.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
