import CreateReactApp from './create-react-app';
import { operationMiddleware, operationReducer } from './redux-operation';
import reduxPromiseMiddleware from './redux-promise';

export default {
    CreateReactApp,
    reduxPromiseMiddleware,
    operationMiddleware,
    operationReducer
}