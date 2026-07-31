import Header from "../components/Header/Header";
import BottomNav from "../components/BottomNav/BottomNav";

type MainLayoutProps = {
    children: React.ReactNode;
}
function MainLayout({children}: MainLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomNav />
    </>
  );
}

export default MainLayout;
