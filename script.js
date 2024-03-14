import './utils/bling'

// todo app function
function todoAppFunc() {
    // state
    // ui

    //test 
    return makeElem('h1', {className: 'test'}, [
        makeElem('span', {id: 'span1'}, ['This is to test my makeElem function'])
    ])
}

// render to the DOM
(function render() {
    document.body.prepend(todoAppFunc());
})();