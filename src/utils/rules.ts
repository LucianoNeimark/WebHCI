export const requiredRule = (v : string) => !!v || 'Este campo es obligatorio'
export const minMaxRule = (min : number, max : number) => {
    return (v : string) => (Number(v) >= min && Number(v) <= max) || `El campo debe estar entre ${min} y ${max}`
}
export const validNameRules = [
    requiredRule,
    (v : string) => (v.length >=3 && v.length <= 60) || 'El campo debe tener entre de 3 y 60 caracteres',
    (v: string) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El campo solo puede tener letras, números, _ y espacios'
]