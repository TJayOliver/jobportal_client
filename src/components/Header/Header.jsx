const Header = () => {
  return (
    <section className="sticky top-0 z-20">
      <aside className="bg-yellow-300  text-black h-8 items-center justify-center flex p-1 w-full">
        <div className="rounded-lg px-1 border border-slate-100 bg-yellow-200 flex items-center mr-1 ">
          <small>New</small>
        </div>
        <small className=" whitespace-nowrap">
          ✨ Get Noticed by Thousands! Promote your brand on Opportunity
          Archives—where opportunities thrive: market@opportunityarchives.com
        </small>
      </aside>

      <header className="bg-[#0F141E] h-14 text-white p-4 gap-4 flex justify-between items-center ">
        <h1>Opportunity Archives</h1>
        <nav className="hidden md:flex space-x-12">
          <a
            className="hover:text-white/50 transition-all duration-100 ease-out"
            href="#"
          >
            Jobs
          </a>
          <a
            className="hover:text-white/50 transition-all duration-100 ease-out"
            href="#"
          >
            Scholarships
          </a>
        </nav>
        <button className="bg-slate-100 p-2 rounded-3xl text-[12px] text-black font-bold">
          SUBSCRIBE
        </button>
      </header>
    </section>
  );
};

export default Header;
