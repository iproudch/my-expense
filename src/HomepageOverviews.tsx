import Expenses from "./expenses/Expenses";
import Header from "./Header";
import Summary from "./summary/Summary";

export default function HomepageOverviews() {
  return (
    <>
      <Header title="Hello, " />
      <Summary />
      <Expenses />
    </>
  );
}
