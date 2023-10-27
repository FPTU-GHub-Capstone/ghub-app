export interface ILogEntry {
	_id: number;
	Level: string;
	UtcTimeStamp: string;
	MessageTemplate: {
		Text: string,
		Tokens: Array<{
			_t: string,
			StartIndex: number,
			Text: string,
		}>,
	};
	RenderedMessage: string;
	Properties: {
		SourceContext: string,
		RequestId: string,
		RequestPath: string,
		ConnectionId: string,
	};
	Exception: {
		_csharpnull: boolean,
	};
}
