import { useEffect, useState } from 'react';

import { RestService } from '../services/RestService';
import config from '../config';


const resetService = RestService.getInstance();
export const useClient = () => {
	const [clientNumber, setClientNumber] = useState(0);
	

	useEffect(()=>{
		const fetClients = async () => {
			
			const {data} = await resetService.get(config.IDP_URL + '/clients');
		
			setClientNumber(data?.clients?.length);
		
		};
		fetClients();
		
	},[]);

	return {clientNumber};
};
