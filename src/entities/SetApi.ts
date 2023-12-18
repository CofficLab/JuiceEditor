import EventManager from './EventManager';
import { Store } from 'pinia';

export default function setApi(app: Store<any, any, any, any>, feature: Store<any, any, any, any>) {
    window.api = {
        app: app,
        event: new EventManager(),
        feature: feature,
    }
}