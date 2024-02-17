export default function Header() {
  return (
    <main>
      <header class="bg-[#001220] text-gray-50 font-mono flex justify-between items-center p-3">
        <div class="left font-semibold text-lg">News Inspector</div>
        <a href="/dashboard">
          <img
            class="cursor-pointer"
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
