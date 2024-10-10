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

type AddExpenseFormProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  formRef: React.RefObject<HTMLFormElement>;
};

export default function AddExpenseFormProvider(
  props: AddExpenseFormProviderProps
): JSX.Element | null {
  const { children, formRef } = props;

  const defaultValues: IAddExpenseForm = useMemo(
    () => ({
      amount: undefined,
      category: "",
      description: "",
      sharing: false,
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
    const { amount, category, description, sharing } = data;
    try {
      console.log("submit", data);
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
  description?: string;
  sharing?: boolean;
}

const AddExpenseFormSchema: ObjectSchema<IAddExpenseForm> = yup.object().shape({
  amount: yup.number().required(),
  category: string().required(),
  description: string(),
  sharing: yup.boolean(),
});
