import { styled } from '@mui/material/styles'
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material'
import { useState } from 'react'

import Iconify from '../../../components/Iconify'
import { Game } from '../../../common'


const StyledPopper = styled((props) => <Popper open placement="bottom-start" {...props} />)({
	width: '280px !important',
})

type Props = {
	games?: Array<Game>,
	setGameSearch: React.Dispatch<React.SetStateAction<string>>,
}

export default function GameSearch({ games, setGameSearch }: Props) {
	return (
		<Autocomplete
			sx={{ width: 280 }}
			autoHighlight
			popupIcon={null}
			PopperComponent={StyledPopper}
			options={games ?? []}
			getOptionLabel={(game) => game.name}
			isOptionEqualToValue={(option, value) => {
				if (option.id === value.id) setGameSearch(value.id)
				return option.id === value.id
			}}
			renderOption={(props, option) => (
				<li {...props} key={option.id}>{option.name}</li>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Search game..."
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
							</InputAdornment>
						)
					}}
				/>
			)}
		/>
	)
}
