import { useState } from 'react';


export function useDialog() {
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

	const handleOpenDialog = (): void => {
		setIsOpenDialog(true);
	};

	const handleCloseDialog = (): void => {
		setIsOpenDialog(false);
	};

	return [isOpenDialog, handleOpenDialog, handleCloseDialog] as const;
}
