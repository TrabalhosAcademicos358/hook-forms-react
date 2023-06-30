import { useForm } from "react-hook-form";

const Form = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">Necessario adicionar um nome</p>
        )}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", { required: true })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">Necessario adicionar um email</p>
        )}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { required: true, minLength: 7 })}
        />
        {errors?.password?.type === "maxLength" && (
          <p className="error-message">A senha deve conter mais de 7 caracteres</p>
        )}

        {errors?.password?.type === "required" && (
          <p className="error-message">A senha é obrigatoria</p>
        )}
      </div>

      <div className="form-group">
        <label>Confirme a Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Confime a Senha"
          {...register("confirm_password", { 
            required: true, 
            validate: value => value === getValues("password") 
          })}
        />

        {errors?.confirm_password?.type === "required" && (
          <p className="error-message">A senha é obrigatoria</p>
        )}

        {errors?.confirm_password?.type === "validate" && (
          <p className="error-message">As senhas devem ser iguais</p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          {...register("profession", { validate: value => value !== "0" })}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>
        {errors?.profession?.type === "validate" && (
          <p className="error-message">Selecione uma das profissões</p>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-group">
          <input
            type="checkbox"
            {...register("privacy_policy", { required: true })}
          />
          <p>I agree with the privacy terms.</p>
        </label>
        {errors?.privace_policy?.type === "required" && (
          <p className="error-message">Concorde com os termos para continuar</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={handleSubmit(onSubmit)}>Criar conta</button>
      </div>
    </div>
  );
};

export default Form;
