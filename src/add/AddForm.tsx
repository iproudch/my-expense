import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { IoClose, IoPeople } from "react-icons/io5";
import { CURRENCY } from "../constants";
import useMasterData from "../hooks/useMasterData";
import useModal from "../hooks/useModal";
import { Loader } from "../Loader";
import { getCategoryStyle } from "../utils/category";
import AddExpenseFormProvider, { type IAddExpenseForm } from "./AddFormProvider";

export default function AddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <AddExpenseFormProvider formRef={formRef}>
      <AddFormContent />
    </AddExpenseFormProvider>
  );
}

const fieldClass =
  "rounded-2xl border border-[#2f323b] bg-[#1b1c20] px-5 py-4 text-lg text-white placeholder:text-[#5f636f] outline-none focus:border-[#7b78ff]";

export function AddFormContent() {
  const { closeModal } = useModal();
  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<IAddExpenseForm>();
  const { categories } = useMasterData();
  const category = watch("category");
  const sharing = watch("sharing");

  useEffect(() => {
    if (!category && categories.length > 0) {
      setValue("category", categories[0].name);
    }
  }, [category, categories, setValue]);

  const onClose = () => {
    closeModal();
    reset();
  };

  return isSubmitting ? (
    <Loader />
  ) : (
    <div className="modal-box max-w-md rounded-t-3xl bg-[#23262f] p-6 text-[#e9eaf0] sm:rounded-3xl">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Add expense</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-12 w-12 items-center justify-center rounded-xl border-0 bg-[#2d3039] p-0 text-white"
        >
          <IoClose size={24} />
        </button>
      </div>

      <p className="mt-6 text-lg text-[#a0a4b3]">How much?</p>
      <div className="mt-2 flex items-center gap-3 border-b border-[#34373f] pb-3">
        <span className="text-5xl font-bold text-[#6b6f7c]">{CURRENCY}</span>
        <input
          {...register("amount", { required: true })}
          type="number"
          inputMode="decimal"
          step="any"
          placeholder="0"
          autoFocus
          className="w-full bg-transparent text-5xl font-bold text-white outline-none placeholder:text-[#6b6f7c]"
        />
      </div>
      {errors.amount ? (
        <p className="mt-1 text-sm text-[#f48c8c]">Enter an amount</p>
      ) : null}

      <p className="mt-6 text-lg text-[#a0a4b3]">Category</p>
      {categories.length === 0 ? (
        <Loader />
      ) : (
        <div className="mt-2 grid grid-cols-3 gap-3">
          {categories.map(({ name }) => {
            const { color, tint, icon } = getCategoryStyle(name);
            const selected = category === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setValue("category", name)}
                className="flex flex-col items-center gap-2 rounded-2xl border bg-[#1b1c20] px-2 py-4 text-base font-medium"
                style={
                  selected
                    ? { borderColor: color, backgroundColor: tint, color: "#fff" }
                    : { borderColor: "#2f323b", color: "#c3c6d2" }
                }
              >
                <span style={{ color }}>{icon}</span>
                {name}
              </button>
            );
          })}
        </div>
      )}
      {errors.category ? (
        <p className="mt-1 text-sm text-[#f48c8c]">Select a category</p>
      ) : null}

      <input
        {...register("description")}
        type="text"
        placeholder="Description (optional)"
        className={`${fieldClass} mt-5 w-full`}
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <input
          {...register("expenseDate")}
          type="date"
          className={`${fieldClass} min-w-0`}
        />
        <button
          type="button"
          onClick={() => setValue("sharing", !sharing)}
          className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-lg font-medium ${
            sharing
              ? "border-[#7b78ff] bg-[#34345c] text-[#c9c6ff]"
              : "border-[#2f323b] bg-[#1b1c20] text-[#c3c6d2]"
          }`}
        >
          <IoPeople size={22} />
          Shared
        </button>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-2xl border-0 bg-[#7b78ff] py-4 text-lg font-semibold text-[#14141c]"
      >
        Add expense
      </button>
    </div>
  );
}
