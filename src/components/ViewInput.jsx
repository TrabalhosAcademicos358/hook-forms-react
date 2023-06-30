export default function ViewInput({ errors, registerName, placeholder, errorMessages, register }) {
    return (
        <div className="form-group">
            <label>Nome</label>
            <input
                className={errors[registerName] && "input-error"}
                type={type}
                placeholder={placeholder}
                {...register(registerName, { required: true })}
            />
            {errors?.name?.type === "required" && (
                <p className="error-message">Necessario adicionar um nome</p>
            )}
        </div>
    )
}