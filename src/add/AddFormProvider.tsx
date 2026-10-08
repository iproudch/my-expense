import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { ObjectSchema, string } from "yup";
import { addExpense } from "../service/service";
import useModal from "../hooks/useModal";
import { Timestamp } from "../service/firebase.config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import { format } from "date-fns";

type AddExpenseFormProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  formRef: React.RefObject<HTMLFormElement>;
};

export default function AddExpenseFormProvider(
  props: AddExpenseFormProviderProps
): JSX.Element | null {
  const { children, formRef } = props;
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const defaultValues: IAddExpenseForm = useMemo(
    () => ({
      amount: undefined,
      category: "",
      description: undefined,
      sharing: false,
      expenseDate: format(new Date(), "yyyy-MM-dd"),
    }),
    []
  );
  const resolver = useMemo(
    () => yupResolver(AddExpenseFormSchema, { abortEarly: false }),
    []
  );

  const formMethods = useForm<IAddExpenseForm>({
    criteriaMode: "all",
    defaultValues,
    mode: "onSubmit",
    resolver,
  });

  const { reset, handleSubmit } = formMethods;

  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<IAddExpenseForm> = async (data) => {
    const { description, expenseDate, ...expense } = data;
    try {
      const [y, m, d] = expenseDate.split("-").map(Number);
      const payload = {
        userId,
        ...expense,
        description:
          description && description?.length > 0 ? description : null,
        date: Timestamp.fromDate(new Date(y, m - 1, d)),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await addExpense(payload);
      closeModal();
      reset(defaultValues);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onError: SubmitErrorHandler<IAddExpenseForm> = (errors) => {
    console.error("AddExpenseFormProvider:onError", errors);
  };

  useEffect(() => {
    reset(defaultValues, { keepDirty: true });
  }, [defaultValues, reset]);

  return (
    <FormProvider {...formMethods}>
      <form
        ref={formRef}
        id={"add-form"}
        onReset={onReset}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export interface IAddExpenseForm {
  amount?: number;
  category: string;
  // date: Date;
  description?: string | null;
  sharing?: boolean;
  expenseDate: string; // yyyy-MM-dd, converted to the Firestore `date` on submit
}

const AddExpenseFormSchema: ObjectSchema<IAddExpenseForm> = yup.object().shape({
  amount: yup.number().required(),
  category: string().required(),
  description: string(),
  sharing: yup.boolean(),
  expenseDate: string().required(),
});
