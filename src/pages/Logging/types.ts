export type LogEntry = Record<string, unknown> & {
	_id:  string,
	Level: string,
	UtcTimeStamp: string,
	RenderedMessage: string,
}
