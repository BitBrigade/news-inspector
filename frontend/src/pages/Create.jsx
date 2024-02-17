import articles from "../../data";
import SideBar from "../components/SideBar";

export default function Create() {
  return (
    <section className="flex">
      <SideBar />
      <main className="bg-[#0f0f0f] text-gray-50 w-full">
        <form className="p-8 flex gap-2 items-center justify-center">
          <input
            className="border rounded-full w-full border-gray-400 bg-transparent focus:outline-none p-2"
            type="text"
            placeholder="enter a valid url..."
          />
          <button className="bg-green-600 p-2 rounded w-24">Check</button>
        </form>
        <hr />
        <div className="result flex flex-col items-center justify-center mt-4">
          <div className="flex flex-col gap-2 w-2/3 items-center justify-center">
            <h1 className="self-start">Summarised content from the site: </h1>
            <p className="bg-[#333333] rounded px-2 p-1">
              {articles[0].summary}
            </p>
          </div>
          <div className="progress p-6 w-1/2 grid grid-rows-2 grid-flow-col gap-16">
            <div>
              <p>Sentiment: {articles[0].sentiment * 100 + "%"}</p>
              <progress
                className="rounded h-6 w-full"
                value={articles[0].sentiment}>
                {articles[0].sentiment}
              </progress>
            </div>

            <div>
              <p>Credebility: {articles[0].credebility * 100 + "%"}</p>
              <progress
                className="rounded h-6 w-full"
                value={articles[0].credebility}>
                {articles[0].credebility}
              </progress>
            </div>

            <div>
              <p>NSFW content: {articles[0].NSFW * 100 + "%"}</p>
              <progress className="rounded h-6 w-full" value={articles[0].NSFW}>
                {articles[0].NSFW}
              </progress>
            </div>

            <div>
              <p>Ai Generated: {articles[0].aiGenerated * 100 + "%"}</p>
              <progress
                className="rounded h-6 w-full"
                value={articles[0].aiGenerated}>
                {articles[0].aiGenerated}
              </progress>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
