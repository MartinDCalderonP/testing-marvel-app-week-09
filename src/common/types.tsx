export type Action = any;
export type Dispatch = (action: Action) => void;
export type State = any;
export type Context = { state: State; dispatch: Dispatch };
