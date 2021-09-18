import React, { ReactElement, ReactNode } from 'react';
import { FC } from 'react';
import { createContext } from 'react';
import { AuthStore } from './authStore';

export const StoreContext = createContext<AuthStore>({} as AuthStore);

export type StoreComponent = FC<{
    store: AuthStore;
    children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({
    children,
    store
}): ReactElement => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}