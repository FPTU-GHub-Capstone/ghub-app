import React, { useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider, ThemeOptions } from '@mui/material/styles'

import palette from './palette'
import shadows from './shadows'
import typography from './typography'
import { GlobalStyles } from './globalStyles'
import customShadows from './customShadows'


type Props = {
	children: React.ReactElement,
}

export default function ThemeProvider({ children }: Props) {
	const themeOptions = useMemo<ThemeOptions>(
		() => ({
			palette,
			shape: { borderRadius: 6 },
			typography,
			shadows: shadows(),
			customShadows: customShadows(),
		}),
		[]
	)

	const theme = createTheme(themeOptions)

	return (
		<StyledEngineProvider injectFirst>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</MUIThemeProvider>
		</StyledEngineProvider>
	)
}
