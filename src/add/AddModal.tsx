import AddForm from "./AddForm";

export function AddModal() {
  return (
    <dialog id="add-expense-modal" className="modal modal-bottom sm:modal-middle">
      <AddForm />
    </dialog>
  );
}
