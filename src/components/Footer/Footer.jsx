const Footer = ({ onClick }) => {
  const date = new Date();
  const Year = date.getFullYear();

  return (
    <aside className=" h-full p-4 flex flex-col justify-center text-md bg-black/90 text-white/80">
      <div className="flex flex-col justify-center m-auto max-w-7xl w-full gap-10">
        <div className="flex justify-between items-center ">
          <p className=" font-AliandoRocky text-4xl text-white">Future Forte</p>
          <div className="flex items-center gap-1">
            <div
              onClick={onClick}
              role="button"
              className="p-2 bg-teal-500 rounded-md"
            >
              Subscribe
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="flex gap-8 items-center justify-between md:gap-20">
          {/* about and address */}
          <div className="flex flex-col gap-4 md:w-2/4">
            {/* about */}
            <div>
              <p className="font-bold">About</p>
              <small className="text-justify ">
                Future Forte is a Job Portal Website, a platform dedicated to
                connecting, graduates, students and job seekers with
                opportunities for graduate jobs, internships, scholarships and
                informative articles.
              </small>
            </div>

            {/* address */}
            <div>
              <p className="font-bold">Address</p>
              <small>futureforte@gmail.com</small>
            </div>

            <small className="flex">&copy;FutureForte {Year}</small>
          </div>

          {/* Tags */}
          <div className="hidden md:block">
            <p className="font-bold">Tags</p>
            <div className="md:flex md:flex-col flex flex-row text-center justify-center flex-wrap gap-3 mt-1">
              <small className="p-1 bg-white/50 rounded-md">Job Search</small>
              <small className="p-1 bg-white/50 rounded-md">Scholarships</small>
              <small className="p-1 bg-white/50 rounded-md">Internships</small>
              <small className="p-1 bg-white/50 rounded-md">
                Career Guidance
              </small>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Footer;
