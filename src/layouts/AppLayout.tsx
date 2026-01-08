import VerticalNavbar from "../components/VerticalNavbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* GROUP wrapper */}
      <div className="group fixed left-0 top-0 h-screen z-40">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <main
        className="
          ml-16
          transition-all duration-300
          group-hover:ml-64
          w-full
        "
      >
        {children}
      </main>
    </div>
  );
}
