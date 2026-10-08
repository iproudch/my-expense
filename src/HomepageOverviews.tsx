import { format } from "date-fns";
import { useAuth } from "./context/UserProvider";
import Expenses from "./expenses/Expenses";
import PageHeader from "./PageHeader";
import Summary from "./summary/Summary";

export default function HomepageOverviews() {
  const { user } = useAuth();
  return (
    <>
      <PageHeader
        subtitle={format(new Date(), "EEEE, d MMMM")}
        title={`Hello, ${user?.displayName}`}
      />
      <Summary />
      <Expenses />
    </>
  );
}
