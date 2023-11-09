import { TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, Path, FieldValues, ValidationRule } from 'react-hook-form'


type TextFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	register: UseFormRegister<T>,
	name: string,
	label: string,
	type?: string, 
	requiredMsg?: string,
	startAdornment?: any,
	endAdornment?: any,
	inputProps?: Record<string, any>,
	width?: number,
	pattern?: ValidationRule<RegExp>,
	[x: string | number | symbol]: unknown,
};

const InputField = <T extends FieldValues>({ 
	errors, 
	register, 
	name, 
	label,
	type,
	requiredMsg,
	pattern,
	startAdornment,
	endAdornment,
	inputProps,
	width = 300,
	...others
}: TextFieldProps<T>) => {
	return (
		<TextField
			id={name}
			label={label}
			variant="outlined"
			margin="normal"
			type={type}
			{...register(name as Path<T>, {
				required: requiredMsg ?? false,
				pattern: pattern,
			})}
			error={Boolean(errors[name])}
			helperText={errors[name]?.message ? String(errors[name]?.message) : ''}
			
			InputProps={{
				startAdornment: startAdornment,
				endAdornment: endAdornment,
			}}
			inputProps={inputProps || { min: 0 }}
			{...others}
		/>
	)
}


export default InputField
