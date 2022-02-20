import { NextPage } from "next";
import * as React from "react";
import Layout from "../components/Layout";
import { Switch } from '@headlessui/react'

interface ISwitchProps {

}
/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const actionTypes = {
    toggle: 'TOGGLE',
    on: 'ON',
    off: 'OFF'
}
interface IAction {
    type: string
}
interface IState {
    on: boolean
}

const ToggleReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actionTypes.toggle:
            return { on: !state.on }
        case actionTypes.on: {
            return { on: true }
        }
        case actionTypes.off: {
            return { on: false }
        }
        default: {
            throw new Error(`Unhandles action type: ${action.type}`)
        }
    }
}
function useToggle({ reducer = ToggleReducer } = {}) {
    // const [on, setOnState] = React.useState<boolean>(false)
    // const toggle = () => setOnState(o => !o)
    // const setOn = () => setOnState(true)
    // const setOff = () => setOnState(true)
    const [{ on }, dispatch] = React.useReducer(reducer, { on: false })
    const toggle = () => dispatch({ type: actionTypes.toggle })
    const setOn = () => dispatch({ type: actionTypes.on })
    const setOff = () => dispatch({ type: actionTypes.off })

    return { on, toggle, setOn, setOff }
}


const StateReducerPage: NextPage = () => {

    const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
    console.log(clicksSinceReset)
    const tooMuchClick = clicksSinceReset >= 4
    const { on, toggle, setOn, setOff } = useToggle({
        reducer(currentState, action) {
            const changes = ToggleReducer(currentState, action)
            if (tooMuchClick && action.type === actionTypes.toggle) {
                return { ...changes, on: currentState.on }
            }
            return changes
        }
    })
    const [error, setError] = React.useState(false)
    // console.log('on', on)
    return (
        <Layout>
            <div className="">

                <div className="">
                    <button onClick={setOn} disabled={tooMuchClick}>On</button>
                    <button onClick={setOff} disabled={tooMuchClick}>Off</button>
                    <Switch
                        disabled={tooMuchClick}
                        checked={on}

                        onChange={() => { toggle(), setClicksSinceReset(n => n + 1) }}
                        className={classNames(
                            on ? 'bg-indigo-600' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={classNames(
                                on ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                        />
                    </Switch>
                    {tooMuchClick && (
                        <div className="flex">
                            <div className=" text-red-500">
                                Error: You cannot switch more than 4 times
                            </div>
                            <button onClick={() => setClicksSinceReset(0)}>reset</button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>

    )
}
export default StateReducerPage