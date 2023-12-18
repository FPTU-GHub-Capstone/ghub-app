import { useEffect, useState } from 'react';
import moment from 'moment';

import { RestService } from '../services/RestService';
import config from '../config';
import { PaymentStatus } from '../common';


export const useRevenue = () => {
	const [revenue, setRevenue] = useState(0);
	const [revenueList, setRevenueList]= useState([]);

	const resetService = RestService.getInstance();
	useEffect(()=>{
		const fetPayments = async () => {

			const paymentArray = Array(12).fill(0);
			let paymentAmount = 0;
			const {data} = await resetService.get(config.IDP_URL + `/payments?status=${PaymentStatus.SUCCESS}`);
		
			data.forEach(payment => {
				paymentAmount += payment.amount;
				const month = moment(payment.date,'YYYYMMDDHHmmss').month();
				paymentArray[month]  = paymentArray[month] + payment.amount;
			});
	
			setRevenue(paymentAmount);
			setRevenueList(paymentArray);
		
		};
		fetPayments();
		
	},[]);

	return {revenue, revenueList};
};
