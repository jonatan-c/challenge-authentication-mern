import clienteAxios from './index';

const tokenAuth = (token: any): any => {
	if (token) {
		clienteAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete clienteAxios.defaults.headers.common.Authorization;
	}
};

export default tokenAuth;