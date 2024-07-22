
import Header from "../../@/components/ui/Header";
import Sidebar from "../../@/components/ui/sidebar";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Header/>
      {children}
         
    </div>
  );
}

