import { takeEvery, select, call, put } from 'redux-saga/effects'

// 1. Swap currency
// 2. Change Base Currency
// 3. Upon Initial Appload

import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR } from '../actions/currencies';

const getLatestRate = currency => fetch(`https://frankfurter.app/current?from=${currency}`);

//fetch returns a promise

function* fetchLatestConversionRates(action) {
    // promise response is converted to json and console logged
    // getLatestRate('USD').then((res) => res.json()).then((res) => console.log(res));
    // yield;


    try {
        let currency = action.currency;
        if (currency === undefined) {
            currency = yield select(state => state.currencies.baseCurrency);
        }
        const response = yield call(getLatestRate, currency);
        const result = yield response.json();

        if (result.error) {
            yield put({ type: CONVERSION_ERROR, error: result.error });
        } else {
            yield put({ type: CONVERSION_RESULT, result });
        }

    } catch (e) {
        yield put({ type: CONVERSION_ERROR, error: e.message });
    }
};

export default function* rootSaga() {
    yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);

}