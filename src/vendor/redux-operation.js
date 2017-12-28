/**
 * 操作快照中间件
 */

export const ACTION_TYPE = '@@OPERATION';

const defaultTypes = [
    'PENDING',
    'SUCCESS',
    'FAILURE',
];

// 操作快照中间件
export function operationMiddleware(config = {}) {
    const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;
  
    // /_(PENDING|SUCCESS|FAILURE)$/
    const PROMISE_TYPE_STATUS_EXP = new RegExp('(\\w*)_(' + promiseTypeSuffixes.join('|') + ')$');
  
    // dispatch, getState
    return () => next => action => {
    
        const {type, payload, meta, error} = action;
        next(action);
    
        // 不需要进入操作快照的记录
        if (meta && meta.operation === false) {
            return;
        }
    
        let origin = type.match(PROMISE_TYPE_STATUS_EXP);

        const operationAction = {
            ...meta ? {meta} : {},
            ...error ? {error: true} : {},
            type: ACTION_TYPE,
            payload: {
                type: type,
                time: Date.now(),
                origin: origin ? origin[1] : type,
                status: origin ? origin[2] : promiseTypeSuffixes[1],
                result: payload
            }
        };

        // 操作快照
        // 异步执行，解决component中componmentWillReceiveProps事件无法监听同步操作中的状态变化
        setTimeout(() => {
            next(operationAction);
        }, 0);
    
    };
}

// 操作快照Reducer
export function operationReducer(state = {type: '', status: '', result: null}, {type, payload}) {
    return type == ACTION_TYPE ? payload : state;
}
