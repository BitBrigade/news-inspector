import { useSelector } from "react-redux";
import { useState } from "react";
import { newsAnalysis } from "../../data";
import SideBar from "../components/SideBar";
import axios from "axios";

export default function Create() {
  const { currentUser } = useSelector((state) => state.user);
  const [url, setUrl] = useState("");
  const [prediction, setPrediction] = useState(0);
  const [summary, setSummary] = useState("");
  const [nsfw, setNsfw] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  async function generateNewsArticles(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://7e58-65-1-225-4.ngrok-free.app/analyze",
        { url: url }
      );
      // console.log(res.data);
      setSummary(res.data.summary);
      setPrediction(res.data.prediction.prediction);
      setNsfw(res.data.nsfw_classification[0].score);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const result = {
    nsfw,
    prediction,
  };

  async function createArticle() {
    try {
      const res = await axios.post(
        "/api/newsArticle",
        {
          url,
          content: summary,
          result,
          creator: currentUser._id,
        },
        { withCredentials: true }
      );
      const id = res.data._id;
      const res2 = await axios.post(`/api/user/${currentUser._id}`, {
        newsArticle: currentUser.newsArticle
          ? { ...currentUser.newsArticle, id }
          : [id],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="flex">
      <SideBar />
      <main className="bg-[#0f0f0f] text-gray-50 w-full">
        <form className="p-8 flex gap-2 items-center justify-center">
          <input
            value={url}
            onChange={handleUrl}
            className="border rounded-full w-full border-gray-400 bg-transparent focus:outline-none p-2"
            type="text"
            placeholder="enter a valid url..."
          />
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <img
                alt="loader"
                src="/loader-light.png"
                className="animate-spin w-6 h-6"
              />
              <span>wait...</span>
            </div>
          ) : (
            <button
              onClick={generateNewsArticles}
              className="bg-green-600 p-2 rounded w-24">
              Check
            </button>
          )}
        </form>
        <hr />
        <div className="result flex flex-col items-center justify-center mt-4">
          {summary.length > 0 ? (
            <div className="flex flex-col gap-2 w-2/3 items-center justify-center">
              <h1 className="self-start">Summarised content from the url: </h1>
              <p className="bg-[#333333] rounded px-2 p-1">{summary}</p>
            </div>
          ) : (
            ""
          )}
          <div className="progress text-sm p-6 w-2/3 grid grid-cols-2 grid-flow-col gap-16">
            <div>
              <p>Credibility: {prediction}</p>
              <progress className="rounded h-6 w-full" value={prediction}>
                {prediction}
              </progress>
            </div>
            <div>
              <p>NSFW content: {Math.trunc(100 * nsfw)}</p>
              <progress className="rounded h-6 w-full" value={nsfw}>
                {nsfw}
              </progress>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button onClick={createArticle} className="bg-green-500 p-1">
            Save
          </button>
          <button className="bg-red-500 p-1">Discard</button>
        </div>
      </main>
    </section>
  );
}
