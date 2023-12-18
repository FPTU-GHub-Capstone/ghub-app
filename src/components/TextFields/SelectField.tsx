import * as React from 'react'
import {
	FormHelperText,
	SxProps,
	Theme,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
} from '@mui/material'
import {
	FieldErrors,
	Path,
	FieldValues,
	Control,
	Controller,
} from 'react-hook-form'
import Box from '@mui/material/Box'

import palette from '../../theme/palette'


export type SelectFieldOptions = {
	value: string | number,
	label: string,
};

type SelectFieldProps<T extends FieldValues> = {
	errors: FieldErrors<T>,
	control: Control<T>,
	name: string,
	label: string,
	options: SelectFieldOptions[],
	requiredMsg?: string,
	sx?: SxProps<Theme>,
	[x: string | number | symbol]: unknown,
};

const SelectField = <T extends FieldValues>({
	errors,
	control,
	name,
	label,
	options,
	requiredMsg,
	sx,
	...others
}: SelectFieldProps<T>) => {
	const labelId = `${name}-label`

	return (
		<Box sx={{ minWidth: 120, marginTop: '15px' }}>
			<FormControl fullWidth>
				<InputLabel 
					id={labelId} 
					sx={{ 
						color: errors[name]?.message ? palette.error.main : ''
					}}
				>
					{label}
				</InputLabel>
				<Controller
					name={name as Path<T>}
					control={control}
					render={({ field }) => (
						<Select
							labelId={labelId}
							id={`${name}-selectId`}
							value={field.value}
							label={label}
							onChange={field.onChange}
							error={Boolean(errors[name])}
							sx={sx}
							{...others}
						>
							{options.map((option) => (
								<MenuItem key={`${option.value}-${option.label}`} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
					rules={{ required: requiredMsg ?? false }}
				/>
				<FormHelperText sx={{color: palette.error.main}}>
					{errors[name]?.message ? String(errors[name]?.message) : ''}
				</FormHelperText>
			</FormControl>
		</Box>
	)
}

export default SelectField
