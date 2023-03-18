import { useState } from "react";
const Theme = () => {
  const[tours, setTours] = useState([]);
  const[searchFilter, setSearchFilter] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("submit");
    const filter = searchFilter;
    const tours =  await fetch("/api/getTours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "filter": filter,
      }),
    });
    const tour = await tours.json();
    setTours(tour);
    console.log(tour);
  };

  return (
    <div className="mx-10 my-4 bg-white rounded-md">
      <form className="px-4 py-2" onSubmit={handleSubmit} method= "POST">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-blue-900 sr-only light:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-blue-500 light:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            id="default-search"
            className="w-full block  p-4 pl-10 text-sm text-blue-900 border border-blue-300 rounded-lg bg-blue-50 focus:ring-blue-500 focus:border-blue-500 light:bg-blue-700 light:border-blue-600 light:placeholder-blue-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            placeholder="Search Tags, Destinations..."
            required
          />
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <section className="text-blue-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
          {tours.map((tours) => (
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-blue-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src= {tours.imageLink}
                  alt="blog"
                />
                <div className="p-6">
                  <span className="tracking-widest text-xs title-font font-medium text-blue-400 mb-1">
                    {tours.themes}
                    
                  </span>

                  <h1 className="title-font text-lg font-medium text-blue-900">
                    {tours.titleText}
                  </h1>
                  
                  <p className="leading-relaxed mb-3">
                    {tours.destinations}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-blue-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-blue-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span className="mx-auto text-blue-900 text-lg  font-medium">
                    Price: {tours.price}
                  </span>
                    </span>
                    <span className="text-blue-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {tours.days}D/{tours.nights}N
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
            
          </div>
        </div>
      </section>
    </div>
  );
};
export default Theme;
