import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import { NotificationContext } from '../notification/notification.context';
import { UserContext } from '../user/user.context';
import {
	addVoucherToUserId,
	getAllVouchersByUserIdRequest,
	deleteVoucherByUserId,
	getVouchersByUserIdAndVoucherIdRequest,
} from './voucher.service';

export const VoucherContext = createContext();

export const VoucherContextProvider = ({ children }) => {
	const [error, setError] = useState([]);
	const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);
	const [isLoadingTest, setIsLoadingTest] = useState(false);
	const [isLoadingPublish, setIsLoadingPublish] = useState(false);
	const [filteredCheckIns, setFilteredCheckIns] = useState([]);
	const [level, setLevel] = useState('');
	const [vouchers, setVouchers] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const { users, getAllUsers } = useContext(UserContext);
	const { user } = useContext(AuthenticationContext);

	useEffect(() => {
		setQuantity(filteredCheckIns.length);
	}, [filteredCheckIns]);

	useEffect(() => {
		getVouchersByUserIdOnPhone();
	}, []);

	const deleteVoucher = (voucherId) => {
		deleteVoucherByUserId(user.id, voucherId);
	};

	const checkInLevel = (count) => {
		if (count >= 11) {
			return 'Premium Customer';
		} else if (count >= 5) {
			return 'Loyal Customer';
		}
		return 'New Customer';
	};

	const addVoucherToUserForTesting = (voucher) => {
		setIsLoadingTest(true);
		try {
			addVoucherToUserId(user.id, voucher);
		} catch (e) {
			console.log('Error adding test voucher');
		}
		setTimeout(() => {
			setIsLoadingTest(false);
		}, 2500);
	};

	const addVoucherToUsers = (voucher) => {
		setIsLoadingPublish(true);
		try {
			if (voucher && filteredCheckIns.length !== 0) {
				filteredCheckIns.map((user) => addVoucherToUserId(user.id, voucher));
			}
		} catch (e) {
			console.log('Error adding voucher: ', e.message);
		}

		setTimeout(() => {
			setIsLoadingPublish(false);
		}, 2500);
	};

	const getVouchersByUserIdOnPhone = () => {
		getAllVouchersByUserIdRequest(user.id)
			.then((results) => {
				setVouchers(results);
			})
			.catch((e) => console.log('Error loading vouchers ', e.message));
	};

	const filterUsersByCheckInNumber = (num_1, num_2) => {
		setIsLoadingQuantity(true);
		let type = checkInLevel(num_1);
		setLevel(type);
		setTimeout(() => {
			if (users.length !== 0) {
				if (!num_1 && !num_2) {
					setIsLoadingQuantity(false);
					setFilteredCheckIns(users);
					return;
				}
				let filteredUsers = users.filter((user) => {
					let check_1 = false;
					let check_2 = false;
					let check = false;
					if (num_1) {
						NotificationContext;
						check_1 = user['noCheckIn'] >= num_1;
					}
					if (num_2) {
						check_2 = user['noCheckIn'] <= num_2;
					} else {
						check_2 = true;
					}
					if (check_1 && check_2) {
						check = true;
					}
					return check;
				});
				setFilteredCheckIns(filteredUsers);
			}
			setIsLoadingQuantity(false);
		}, 2400);
	};

	const getVouchersByUserIdAndVoucherId = (userId, voucherId) => {
		return getVouchersByUserIdAndVoucherIdRequest(userId, voucherId);
	};

	const getAllVouchersByUserId = (userId) => {
		return getAllVouchersByUserIdRequest(userId);
	};

	useEffect(() => {
		if (isLoadingQuantity) {
			getAllUsers();
		}
	}, [isLoadingQuantity]);

	return (
		<VoucherContext.Provider
			value={{
				filterUsersByCheckInNumber,
				addVoucherToUserForTesting,
				addVoucherToUsers,
				quantity,
				isLoadingQuantity,
				level,
				isLoadingTest,
				isLoadingPublish,
				filteredCheckIns,
				vouchers,
				deleteVoucher,
				getVouchersByUserIdOnPhone,
				getVouchersByUserIdAndVoucherId,
				getAllVouchersByUserId,
			}}
		>
			{children}
		</VoucherContext.Provider>
	);
};
