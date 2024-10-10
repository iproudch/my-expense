import AddForm from "./AddForm";

export function AddModal() {
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
