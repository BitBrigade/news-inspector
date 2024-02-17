export default function SideBar() {
  return (
    <main class="flex bg-[#0f0f0f] text-gray-50">
      <div class="bg-[#001220] flex justify-center items-center shadow font-mono h-screen w-72">
        <div class="flex flex-col w-full p-3 gap-3">
          <img
            class="cursor-pointer self-center"
            src="/user-light.svg"
            alt="user"
            width={150}
            height={10}
          />
          <div class="info flex flex-col">
            <h1>username</h1>
            <h1>article count: 1</h1>
          </div>
          <div class="btns1 flex gap-2">
            <button class="bg-blue-500 w-full p-1 rounded">Edit</button>
            <button class="bg-red-400 w-full p-1 rounded">Sign out</button>
          </div>
          <div class="btns2 flex flex-col gap-2">
            <a href="/dashboard/create">
              <button class="bg-indigo-500 w-full p-1 rounded">+ Create</button>
            </a>
            <a href="#">
              <button class="bg-violet-500 w-full p-1 rounded">
                Your articles
              </button>
            </a>
            <a href="#">
              <button class="bg-red-500 self-end w-full p-1 rounded">
                Delete Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
