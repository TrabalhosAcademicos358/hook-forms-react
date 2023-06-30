import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const errorRequired = "Esse campo é obrigatorio";

const schema = yup.object({
    name: yup.string().required(errorRequired),
    email: yup.string().email("Email invalido").required(errorRequired),
    password: yup
        .string()
        .min(8, "A senha deve conter ao minimo 8 caracteres")
        .required(errorRequired),
    password_confirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
        .required(errorRequired),
    profession: yup
        .string()
        .notOneOf(["0"], "selecione uma profissão valida")
        .required("Selecione uma das profissões dadas"),
    privacy_policy: yup // Isso não funcionou
        .boolean()
        .required("Você precisa concordar com os termos e condições"),
});

const listInput = [
    {
        nameId: "name",
        text: "Nome",
        props: { type: "text", placeholder: "Seu nome" },
    },
    {
        nameId: "email",
        text: "E-mail",
        props: { type: "email", placeholder: "Seu e-mail" },
    },
    {
        nameId: "password",
        text: "Senha",
        props: { type: "password", placeholder: "Senha" },
    },
    {
        nameId: "password_confirm",
        text: "Confime a senha",
        props: { type: "password", placeholder: "Confirme sua senha" },
    },
];

const Form2 = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);

    return (
        <div className="app-container">
            {listInput.map(({ nameId, text, props }) => (
                <div className="form-group">
                    <label>{text}</label>
                    <input
                        className={errors?.name && "input-error"}
                        {...props}
                        {...register(nameId)}
                    />
                    {errors[nameId] && (
                        <p className="error-message">
                            {errors[nameId].message}
                        </p>
                    )}
                </div>
            ))}

            <div className="form-group">
                <label>Profissão</label>
                <select {...register("profession")}>
                    <option value="0">Selecione sua profissão...</option>
                    <option value="developer">Desenvolvedor</option>
                    <option value="other">Outra</option>
                </select>
                {errors?.profession && (
                    <p className="error-message">
                        {errors?.profession?.message}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label className="checkbox-group">
                    <input type="checkbox" {...register("privacy_policy")} />
                    <p>I agree with the privacy terms.</p>
                </label>
                {errors?.privace_policy && (
                    <p className="error-message">
                        {errors?.privace_policy?.message}
                    </p>
                )}
            </div>

            <div className="form-group">
                <button onClick={handleSubmit(onSubmit)}>Criar conta</button>
            </div>
        </div>
    );
};

export default Form2;
