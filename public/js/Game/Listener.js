export default function createListener() {
    const state = {
        observers: [],
        direction: 'left',
        oldDirection: 'up',
        mobile: false
    }

    const subscribe = (observerFunction) => state.observers.push(observerFunction)

    const notifyAll = (command) => {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) state.mobile = true

    document.addEventListener('keydown', handleKeys)

    function handleKeys(event) {
        let keyPressed = event.key ? event.key.toLowerCase() : null

        if (keyPressed == 'w' || keyPressed == 'arrowup') {
                if (state.direction != 'up') {
                    if (state.direction != 'down') state.oldDirection = state.direction
                    state.direction = 'up'
                }
        }
        if (keyPressed == 'a' || keyPressed == 'arrowleft') {
            if (state.direction != 'left') {
                if (state.direction != 'right') state.oldDirection = state.direction
                state.direction = 'left'
            }
        }
        if (keyPressed == 's' || keyPressed == 'arrowdown') {
            if (state.direction != 'down') {
                if (state.direction != 'up') state.oldDirection = state.direction
                state.direction = 'down'
            }
        }
        if (keyPressed == 'd' || keyPressed == 'arrowright') {
            if (state.direction != 'right') {
                if (state.direction != 'left') state.oldDirection = state.direction
                state.direction = 'right'
            }
        }
    }

    return {
        subscribe,
        notifyAll,
        state
    }
}