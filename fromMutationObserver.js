import { Observable } from 'rxjs/Observable'
// core observables
import 'rxjs/add/observable/defer'

import isDom from 'is-dom'

function fromMutationObserver(selector) {
    // select the target node
    let mutations$ = Observable.defer(() => {
        return Observable.create(function (subscriber) {
            if(isDom(selector)){
                var target = selector;
            } else {
                var target = document.querySelector(selector);
            }

            // create an observer instance
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                subscriber.next(mutation);
              });
            });
            // configuration of the observer:
            var config = { attributes: true, childList: true, characterData: true, subtree: true };

            // pass in the target node, as well as the observer options
            observer.observe(target, config);

            // later, you can stop observing
            return function() {
                observer.disconnect();
            }
        })
    });

    return mutations$
};

export default fromMutationObserver
