import SideBar from "../components/SideBar";
import EditUser from "../components/EditUser";

export default function Edit() {
  return (
    <section className="flex bg-slate-800">
      <SideBar />
      <EditUser />
    </section>
  );
}
