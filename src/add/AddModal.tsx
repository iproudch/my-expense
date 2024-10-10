import AddForm from "./AddForm";

type AddExpenseProps = {
  toggleModal?: () => void;
};
export function AddModal(props: AddExpenseProps) {
  return (
    <>
      <dialog
        id="add-expense-modal"
        className="modal modal-middle sm:modal-middle overflow-visible"
      >
        <AddForm />
      </dialog>
    </>
  );
}
