import { Button } from '@mui/material'
import { GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'

import { Level } from '../../../../common/types'


function generateRandomId(): string {
	const timestamp = Date.now().toString(36) // Convert timestamp to base36 string
	const randomStr = Math.random().toString(36).substring(2, 8) // Random string, removing '0.' from the beginning

	return `${timestamp}-${randomStr}`
}

interface IEditToolbarProps {
	rows: Level[];
	setRows: (newGameLevel: Level[]) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
	) => void;
	newRowIds: Set<GridRowId>;
	setNewRowIds: React.Dispatch<React.SetStateAction<Set<GridRowId>>>;
}

export function LevelAddBtn(props: IEditToolbarProps) {
	const { rows, setRows, setRowModesModel, setNewRowIds } = props
	const { gameId } = useParams()

	const handleClick = () => {
		const id = generateRandomId() // Consider using your method to generate a unique ID
		const newLevel: Level = { id, name: '', levelUpPoint: 0, gameId: gameId, game: null } // Adjust default values accordingly
		const newRows: Level[] = [...rows, newLevel]
		setRows(newRows)
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}))
		setNewRowIds((prevIds) => new Set([...prevIds, id]))
	}

	return (
		<Button
			variant="contained"
			size="large"
			sx={{
				backgroundColor: 'primary.light',
				'&:hover': {
					backgroundColor: 'primary.main',
				},
			}}
			onClick={handleClick}
		>
			Add a Level Progress
		</Button>
	)
}

