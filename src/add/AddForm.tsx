import { useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import { CURRENCY } from "../constanst";
import AddExpenseFormProvider, { IAddExpenseForm } from "./AddFormProvider";
import { useFormContext } from "react-hook-form";
import { Loader } from "../Loader";

const CATEGORIES = ["Food", "Drink", "Shopping", "Bills", "Other"];

export default function AddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <AddExpenseFormProvider formRef={formRef}>
      <AddFormContent />
    </AddExpenseFormProvider>
  );
}

export function AddFormContent() {
  const { closeModal } = useModal();
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useFormContext<IAddExpenseForm>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onClose = () => {
    closeModal();
    reset();
  };

  return isSubmitting ? (
    <Loader />
  ) : (
    <div className="card bg-base-100 w-96 shadow-xl relative z-1">
      <p className="absolute right-4 top-4" onClick={onClose}>
        X
      </p>
      <div className="card-body">
        <h3 className="card-title">How much?</h3>
        <div className="flex flex-row items-center">
          <span className="font-bold text-3xl">{CURRENCY}</span>
          <input
            {...register("amount", { required: true })}
            type="number"
            className="input form-control outline-none focus:outline-none border-none bg-transparent text-3xl font-semibold"
          />
          {errors.amount && <span>This field is required</span>}
        </div>

        <div className="form-control flex flex-row justify-end">
          <label className="label cursor-pointer">
            <span className="label-text font-medium pr-2">Sharing</span>
            <input
              {...register("sharing")}
              type="checkbox"
              className="checkbox checkbox-xs checkbox-primary"
            />
          </label>
        </div>

        <select
          {...register("category")}
          className="select select-bordered z-50 w-full"
          defaultValue=""
        >
          <option disabled value="">
            Category
          </option>
          {CATEGORIES.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <input
          {...register("description")}
          type="text"
          placeholder="Description"
          className="input input-bordered w-full max-w-xs mt-4"
        />

        <div className="card-actions justify-end mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
