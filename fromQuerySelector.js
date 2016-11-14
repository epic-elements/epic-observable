import { Observable } from 'rxjs/Observable'
// core observables
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/defer'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/timer'
// core operators
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/delayWhen'
import 'rxjs/add/operator/first'

import {AnimationFrameScheduler} from 'rxjs/scheduler/AnimationFrameScheduler'

function fromQuerySelector(selector) {
    return Observable.defer(()=>this.map(parentEl => parentEl.querySelectorAll(selector)))
        .switchMap(v => {
            if (!v || v.length<1) {
                return Observable.throw('No element found')
            }
            return Observable.from(v)
        })
        .retryWhen(error=>error.delayWhen(val => Observable.timer(500)),
            AnimationFrameScheduler);
    return domNodes$.first();
}

export default fromQuerySelector
