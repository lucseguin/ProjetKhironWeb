import React from 'react';

export type EventCoordinatorEvent = {
	channel: string;
	payload: EventCoordinatorPayload;
};

export type EventCoordinatorPayload = {
	type: string;
	data?: any;
	message?: string;
	errorMessage?: string;
};

export type EventCoordinatorCallback = (event: EventCoordinatorEvent) => void;

export class EventCoordinatorClass {
	//private listeners: EventCoordinatorCallback[] = [];
	private listeners = new Map<string,EventCoordinatorCallback[]>();
	private propertyBag = new Map<string,any>();

	supportedChannel = [
		'auth',
		'notif',
	];

	constructor() {
	}

	store(id:string, item:any) {
		this.propertyBag.set(id, item);
	}
	retreive(id:string) {
		return this.propertyBag.get(id);
	}

	remove(channel: string, listener: EventCoordinatorCallback) {
        const holder = this.listeners.get(channel);
        if (holder) {
            this.listeners.set(channel, [...holder.filter( function (callback) {return callback !== listener;})] ) ;
        }
	}

	signal(
		channel: string,
		payload: EventCoordinatorPayload,
	) {
		const event: EventCoordinatorEvent = {
			channel,
			payload: { ...payload },
		};

		try {
			this.broadcast(event);
		} catch (e) {
			console.log("Failed to broadcast message. " + e.message);
		}
	}

	register(
		channel: string,
		callback: EventCoordinatorCallback
	) {	
        let bin = this.listeners.get(channel);

        if (!bin) {
            bin = [];
            this.listeners.set(channel,bin);
        }

		this.listeners.set(channel, [...bin, callback] ) ;

        //bin.push(callback);

		return () => {
			this.remove(channel, callback);
		};
	}

	private broadcast(event: EventCoordinatorEvent) {
		const { channel, payload } = event;
		const bin = this.listeners.get(channel);

		if (bin) {
			//console.log(`Broadcasting to ${channel} with `, payload);
			bin.forEach(listener => {
				try {
					listener(event);
				} catch (e) {
					console.log("Failed to invoke callback." + e.message);
				}
			});
		}
	}
}

export const EventCoordinator = new EventCoordinatorClass();

export default EventCoordinator;