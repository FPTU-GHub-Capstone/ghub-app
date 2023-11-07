import { alpha, styled } from '@mui/material/styles'
import { TreeItem, TreeView as MuiTreeView, TreeViewProps } from '@mui/x-tree-view'
import { useState } from 'react'

import Iconify from '../../../../components/Iconify'
import Scrollbar from '../../../../components/Scrollbar'
import { PermissionBody } from '../../../../mock/permissions'


const TreeView = styled(MuiTreeView)(({ theme }) => ({
	// minHeight: 264,
	'& .MuiTreeItem-iconContainer .close': {
		opacity: 0.3
	},
	'& .MuiTreeItem-group': {
		marginLeft: 15,
		paddingLeft: 18,
		borderLeft: `0.5px solid ${alpha(theme.palette.text.primary, 0.4)}`
	}
}))

const Scopes = ({ rowData }: { rowData: PermissionBody }) => {
	let nodeId = 0

	return (
		<Scrollbar sx={{ paddingTop: 3 }}>
			<TreeView
				defaultExpanded={[]}
				defaultExpandIcon={<Iconify icon='mdi:plus-box-outline' />}
				defaultCollapseIcon={<Iconify icon='mdi:minus-box-outline' />}
				defaultEndIcon={<Iconify icon='mdi:close-box-outline' />}
			>
				{Object.entries(rowData).map(([entity, scopes]) => {
					nodeId = nodeId + 1
					return (
						<TreeItem key={entity} nodeId={`${nodeId}`} label={entity}>
							{(scopes as Array<string>).map((scope, index) => {
								nodeId = nodeId + 1
								return (
									<TreeItem key={index} nodeId={`${nodeId}`} label={scope} />
								)
							}
							)}
						</TreeItem>
					)
				})}
			</TreeView>
			<div></div>
		</Scrollbar>

	)
}

export default Scopes
