export type UseModalResponse = {
openModal: () => void;
closeModal: () => void;
};



export default function useModal(): UseModalResponse {

  const openModal = () => {
    const modal = document?.getElementById(
      "add-expense-modal"
    ) as HTMLDialogElement | null;
    if (!modal) return;
    modal.showModal();
  };

  const closeModal = () => {
    const modal = document?.getElementById(
      "add-expense-modal"
    ) as HTMLDialogElement | null;
    if (!modal) return;
    modal.close();
  };

  return {
    openModal,
    closeModal
  };
}
