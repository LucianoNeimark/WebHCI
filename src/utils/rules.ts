export const requiredRule = (v : string) => !!v || 'Este campo es obligatorio'
export const minMaxRule = (min : number, max : number) => {
    return (v : string) => (Number(v) >= min && Number(v) <= max) || `El campo debe estar entre ${min} y ${max}`
}

export const colorRule = (v : string) => /^#[0-9A-F]{6}$/i.test(v) || 'El campo debe ser un color hexadecimal'
export const validNameRules = [
    requiredRule,
    (v : string) => (v.length >=3 && v.length <= 60) || 'El campo debe tener entre de 3 y 60 caracteres',
    (v: string) => /^[a-zA-Z0-9_ ]*$/.test(v) || 'El campo solo puede tener letras, números, _ y espacios'
]

export const codeRules = [
    (v: string) => !!v || 'El código es requerido',
    (v: string) => (v && v.length === 4) || 'El código debe tener 4 dígitos',
    (v: string) => (v && !isNaN(Number(v))) || 'El código debe ser numérico'
];
