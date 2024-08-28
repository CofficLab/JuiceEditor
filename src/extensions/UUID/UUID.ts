import { Extension, findChildren, combineTransactionSteps, getChangedRanges, findChildrenInRange } from "@tiptap/core";
import { Slice, Fragment } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { v4 as uuidv4 } from "uuid";
import UniqueID from "../extension-unique-id/";

const UUID = UniqueID.extend();

export { UniqueID, UniqueID as default };