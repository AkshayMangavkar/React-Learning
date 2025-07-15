import React, { useContext } from 'react'
import { Themecontext } from '../App'

const ChildC = () => {

    const {theme, settheme} = useContext(Themecontext);

    function toggletheme(){

        if(theme === 'light')
            settheme('dark');
        else
            settheme('light');
    }

    return (
        <div>
            <button onClick={toggletheme}>
                Change Theme
            </button>
        </div>
    )
}

export default ChildC
