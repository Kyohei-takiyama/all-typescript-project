import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
};

export const Contact = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>();

  // フォームの送信時の処理
  // 全てのバリデーションを通過したら、onSubmit関数が実行される
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(data, isSubmitting);

  // 入力値を監視できる
  const watchLastName = watch("lastName");

  return (
    <div>
      <h1>Contact</h1>
      <p>{watchLastName}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-elements">
          <div className="form-element">
            <label>First Name:</label>
            <input
              {...register("firstName", {
                required: true,
                minLength: {
                  value: 2,
                  message: "最低2文字以上入力してください",
                },
                maxLength: {
                  value: 20,
                  message: "最大20文字以下で入力してください",
                },
              })}
            />
            {errors.firstName?.message && (
              <p className="error-message">{errors.firstName?.message}</p>
            )}
          </div>
          <div className="form-element">
            <label>First Name:</label>
            <input {...register("lastName", { required: true })} />
            {errors.lastName?.message && (
              <p className="error-message">{errors.lastName?.message}</p>
            )}
          </div>
        </div>
        <div className="submit-button" style={{ marginTop: "15px" }}>
          <input type="submit" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};
