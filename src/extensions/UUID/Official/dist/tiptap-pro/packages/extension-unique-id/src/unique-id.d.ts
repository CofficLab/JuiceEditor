import { Extension } from '@tiptap/core';
import { Transaction } from '@tiptap/pm/state';
export interface UniqueIDOptions {
    attributeName: string;
    types: string[];
    generateID: () => any;
    filterTransaction: ((transaction: Transaction) => boolean) | null;
}
export declare const UniqueID: Extension<UniqueIDOptions, any>;
