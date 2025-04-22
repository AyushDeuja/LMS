const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* sideBar */}
      <aside className="w-[30%] h-full bg-amber-200"></aside>
      {/* title and logo */}
      <div>
        <h1 className="text-lg font-bold">LMS APP</h1>
      </div>

      {/* menu items */}
      <div>
        <ul>
          <li>Books</li>
          <li>Members</li>
          <li>Transactions</li>
        </ul>
      </div>
      {/* mainContent */}
      <div></div>
    </div>
  );
};

export default AppLayout;
