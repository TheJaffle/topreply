export default function AppBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(96,165,250,0.3),transparent_22%),radial-gradient(circle_at_84%_14%,rgba(37,99,235,0.26),transparent_20%),radial-gradient(circle_at_74%_76%,rgba(125,211,252,0.16),transparent_18%),linear-gradient(180deg,#06101d_0%,#0b1830_34%,#102347_66%,#091426_100%)]" />
      <div className="absolute left-[-8%] top-[-4%] h-72 w-72 rounded-full bg-blue-400/16 blur-3xl sm:h-[30rem] sm:w-[30rem]" />
      <div className="absolute right-[-10%] top-[10%] h-72 w-72 rounded-full bg-sky-300/12 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="absolute bottom-[-14%] left-[18%] h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_100%)]" />
      <div className="absolute right-[10%] top-[20%] hidden h-40 w-40 rounded-full border border-white/8 bg-white/4 sm:block" />
      <div className="absolute left-[8%] top-[56%] hidden h-24 w-24 rotate-12 rounded-[6px] border border-white/8 bg-white/4 sm:block" />
      <div className="absolute bottom-[16%] right-[18%] hidden h-16 w-16 rounded-full border border-blue-200/8 bg-blue-200/4 sm:block" />
    </div>
  );
}