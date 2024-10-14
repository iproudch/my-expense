import { AddModal } from "./add/AddModal";
import Expenses from "./expenses/Expenses";
import { Menu } from "./Menu";
import Summary from "./summary/Summary";

export default function HomepageOverviews() {
  return (
    <>
      <h1>Hello</h1>
      <Summary />
      <Expenses />
      <AddModal />
    </>
  );
}
