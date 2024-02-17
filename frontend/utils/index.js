import axios from "axios";

let text = "";

const response = await axios
  .get("https://api.webscraping.ai/text", {
    params: {
      api_key: "0f96909d-1e49-4fb2-969f-baf2e0df11ba",
      url: "https://medium.com/@ravikumarray92/concurrency-in-go-goroutines-channels-waitgroup-db6a50b87a04",
      proxy: "residential",
      text_format: "xml",
    },
  })
  .then((response) => (text = response.data))
  .catch((error) => console.log(error.response.data));

console.log(text);


export default async function generateNewsArticles() {
  const res = await axios.post(
    "https://f213-65-1-225-4.ngrok-free.app/analyze"
  );
}