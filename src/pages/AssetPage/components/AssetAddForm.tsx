import { Box, Stack, TextField } from '@mui/material'
import { Control, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import InputField from '../../../components/TextFields/InputField'
import { AssetType, Game, URL_REGEX } from '../../../common'
import SelectField, { SelectFieldOptions } from '../../../components/TextFields/SelectField'



type Props<T extends FieldValues> = {
	errors: FieldErrors<T>, 
	register: UseFormRegister<T>,
	control: Control<T, any>,
	assetTypeData: AssetType[],
};


const AssetAddForm = <T extends FieldValues>({ errors, register, assetTypeData, control }: Props<T>) => {
	const getLocalGame = localStorage.getItem('currentGame')
	const localGame: Game | null = getLocalGame ? JSON.parse(getLocalGame) : null

	return (
		<Box sx={{ margin: '10px' }}>
			<Stack sx={{ marginY: '20px' }}>
				<TextField
					name={'Non-func game name'} value={localGame.name}
					label={'Game Name'}
					type="text" disabled
					sx={{ width: 700, marginRight: '15px' }}
				/>
				<TextField
					name={'Non-func game ID'} value={localGame.id}
					label={'Game Id'}
					type="text" disabled
					sx={{ width: 700, marginRight: '15px', marginTop: '15px' }}
				/>
			</Stack>

			<InputField<T>
				errors={errors}
				register={register}
				name={'name'}
				label={'Name'}
				type="text"
				requiredMsg="Name cannot be empty"
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />

			<InputField<T>
				errors={errors}
				register={register}
				name={'image'}
				label={'Image link'}
				type="text"
				requiredMsg="Image link cannot be empty"
				pattern={{
					value: URL_REGEX,
					message: 'This is not a valid URL - And / Or it should starts with HTTP / HTTPS',
				}}
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />

			<InputField<T>
				errors={errors}
				register={register}
				name={'description'}
				label={'Description'}
				type="text"
				requiredMsg="Name cannot be empty"
				sx={{ width: 700, marginRight: '15px' }}
			/> <br />

			<SelectField<T>
				errors={errors}
				control={control}
				name={'assetTypeId'} // Name corresponding to the field in your form
				label={'Asset Type'}
				options={assetTypeData.map((type: AssetType): SelectFieldOptions => ({
					value: type.id,
					label: type.name,
				}))}
				requiredMsg="Asset type selection is required"
				sx={{ width: 700, marginRight: '15px' }}
			/>

		</Box>
	)
}

export default AssetAddForm
