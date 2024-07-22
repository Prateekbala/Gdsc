
import Sidebar from "../../@/components/ui/sidebar";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <Sidebar/>
        {children}
    </div>
  );
}

