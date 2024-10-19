import { useAuth } from "./context/UserProvider";
import Expenses from "./expenses/Expenses";
import Header from "./Header";
import Summary from "./summary/Summary";

export default function HomepageOverviews() {
  const { user } = useAuth();
  return (
    <>
      <Header title={`Hello,`} desc={user?.displayName ?? ""} />
      <Summary />
      <Expenses />
    </>
  );
}
