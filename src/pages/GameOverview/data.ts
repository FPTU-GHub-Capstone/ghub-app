export const swaggerJson = {
	openapi: '3.0.0',
	info: {
		title: 'Game API',
		version: '1.0.0',
		description: 'Your game API',
	},
	servers: [
		{
			url: 'http://localhost:8080/v1/gms',
			description: 'Development server',
		},
	],
	paths: {
		'/games': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'idList',
						'in': 'query',
						'schema': {
							'type': 'array',
							'items': {
								'type': 'string',
								'format': 'uuid'
							}
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			},
			'post': {
				'tags': [
					'Games'
				],
				'requestBody': {
					'content': {
						'application/json': {
							'schema': {
								'$ref': '#/components/schemas/CreateGameRequest'
							}
						},
						'text/json': {
							'schema': {
								'$ref': '#/components/schemas/CreateGameRequest'
							}
						},
						'application/*+json': {
							'schema': {
								'$ref': '#/components/schemas/CreateGameRequest'
							}
						}
					}
				},
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			},
			'put': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'requestBody': {
					'content': {
						'application/json': {
							'schema': {
								'$ref': '#/components/schemas/UpdateGameRequest'
							}
						},
						'text/json': {
							'schema': {
								'$ref': '#/components/schemas/UpdateGameRequest'
							}
						},
						'application/*+json': {
							'schema': {
								'$ref': '#/components/schemas/UpdateGameRequest'
							}
						}
					}
				},
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			},
			'delete': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'schema': {
							'type': 'string',
							'format': 'uuid',
							'default': 'defaultId'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/activity-types': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/asset-types': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/character-types': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/game-servers': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/levels': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/wallet-categories': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
		'/games/{id}/users': {
			'get': {
				'tags': [
					'Games'
				],
				'parameters': [
					{
						'name': 'id',
						'in': 'path',
						'required': true,
						'schema': {
							'type': 'string',
							'format': 'uuid'
						}
					}
				],
				'responses': {
					'200': {
						'description': 'Success'
					}
				}
			}
		},
	},
	components: {
		schemas: {
			'UpdateGameRequest': {
				'type': 'object',
				'properties': {
					'name': {
						'type': 'string',
						'nullable': true
					},
					'logo': {
						'type': 'string',
						'nullable': true
					},
					'link': {
						'type': 'string',
						'nullable': true
					}
				},
				'additionalProperties': false
			},
			'CreateGameRequest': {
				'required': [
					'name'
				],
				'type': 'object',
				'properties': {
					'name': {
						'minLength': 1,
						'type': 'string'
					},
					'logo': {
						'type': 'string',
						'nullable': true
					},
					'link': {
						'type': 'string',
						'nullable': true
					}
				},
				'additionalProperties': false
			},
			ResponseException: {
				type: 'object',
				properties: {
					isError: {
						type: 'boolean',
						description: 'Exception Message',
						default: true,
					},
					responseException: {
						type: 'object',
						description: 'Exception Object',
						properties: {
							exceptionMessage: {
								oneOf: [
									{
										type: 'string',
										description: 'Exception Message',
									},
									{
										type: 'object',
										description: 'Validation Errors',
										properties: {
											type: {
												type: 'string',
												description: 'Error type',
											},
											title: {
												type: 'string',
												description: 'Error title',
											},
											status: {
												type: 'integer',
												description: 'Error status code',
											},
											traceId: {
												type: 'string',
												description: 'Error trace ID',
											},
											errors: {
												type: 'object',
												additionalProperties: {
													type: 'array',
													items: {
														type: 'string',
													},
												},
												description: 'Error details',
											},
										},
									},
								],
							}
						}
					},
				},
			},

		},
	},
};
