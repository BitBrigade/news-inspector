import { useSelector } from "react-redux";
import { useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

export default function Create() {
  const { currentUser } = useSelector((state) => state.user);
  const [url, setUrl] = useState("");
  const [prediction, setPrediction] = useState(0);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [hate, setHate] = useState([]);

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  async function generateNewsArticles(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://c6b5-65-1-225-4.ngrok-free.app/analyze",
        { url: url }
      );
      // console.log(res.data);
      setSummary(res.data.summary);
      setPrediction(res.data.prediction.prediction);
      setHate(res.data.hate);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }


  function getLabelDescription(label) {
    switch (label) {
      case "LABEL_0":
        return "Acceptable";
      case "LABEL_1":
        return "Offensive";
      case "LABEL_2":
        return "Inappropriate";
      case "LABEL_3":
        return "Violent";
      default:
        return "";
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
            placeholder="enter a valid url to check the nsfw and credibility score."
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
              <div className="grid grid-cols-2 gap-2">
                {hate.map((item, index) => (
                  <div className="flex gap-2 border p-2 rounded" key={index}>
                    <p>{getLabelDescription(item.label)}:</p>
                    <p>{Math.trunc(100 * item.score)}%</p>
                  </div>
                ))}
              </div>
              <p className="border p-2 rounded">
                {" "}
                Credibility: {prediction === 1 ? "Reliable" : "Unreliable"}{" "}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="progress text-sm p-6 w-2/3 grid grid-cols-2 grid-flow-col gap-16"></div>
        </div>
      </main>
    </section>
  );
}
