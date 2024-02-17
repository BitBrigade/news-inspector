export default function Header() {
  return (
    <main>
      <header className="bg-[#001220] text-gray-50 font-mono flex justify-between items-center p-3">
        <div className="left font-semibold text-lg">News Inspector</div>
        <a href="/dashboard">
          <img
            className="cursor-pointer"
            src="/user-light.svg"
            alt="user"
            width={30}
            height={10}
          />
        </a>
      </header>
    </main>
  );
}
