import { styled } from '@mui/material/styles'
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material'

import Iconify from '../../../components/Iconify'
import { Game } from '../../../common'


const StyledPopper = styled((props) => <Popper open placement="bottom-start" {...props} />)({
	width: '280px !important',
})

type Props = {
	games?: Array<Game>,
}

export default function GameSearch({ games }: Props) {
	return (
		<Autocomplete
			sx={{ width: 280 }}
			autoHighlight
			popupIcon={null}
			PopperComponent={StyledPopper}
			options={games ?? []}
			getOptionLabel={(game) => game.name}
			isOptionEqualToValue={(option, value) => option.id === value.id}
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
						),
					}}
				/>
			)}
		/>
	)
}
