import SideBar from "../components/SideBar";

export default function Dashboard() {
  return (
    <section className="flex">
      <SideBar />
      <h1 className="p-4">
        Welcome to News Inspector! Click on{" "}
        <span className="bg-purple-400 p-1 rounded">Create</span> to chck your
        URL
      </h1>
    </section>
  );
}
