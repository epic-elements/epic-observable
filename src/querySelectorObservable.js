import { Observable } from 'rxjs/Observable'
// core observables
import 'rxjs/add/observable/defer'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/of'

// core operators
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/delayWhen'

import {AnimationFrameScheduler} from 'rxjs/scheduler/AnimationFrameScheduler'

function querySelector(selector) {
	const elements$ = this::getElements(selector)
		::errorIfEmpty()
		::retryIfError(500);
    return elements$
}

function getElements(selector) {
	let elements$ = this.map(parentEl => parentEl.querySelectorAll(selector))
	return Observable.defer(()=>elements$);
}

function errorIfEmpty() {
	return this.switchMap(v => {
		if (!v || v.length<1) {
			return Observable.throw('No element found')
		}
		return Observable.from(v)
	})
}

function retryIfError(delay) {
	return this.retryWhen(error=>error.delayWhen(val => Observable.timer(delay)),
		AnimationFrameScheduler);
}

export default querySelector
