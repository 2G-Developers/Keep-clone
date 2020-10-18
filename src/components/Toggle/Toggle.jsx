import React, { useState, useEffect } from 'react';

function Toggle(props) {
    const localUser = JSON.parse(localStorage.getItem('theme')) || false
    const [toggle, setToggle] = useState(localUser);
    const darkTheme = {
        "--bg-color": "#202124",
        "--text-color": "#e8eaed",
        "--border-color": "#e8eaed",
        "--input-color": "rgba(241,243,244,0.24)",
        "--yellow-color": "#41331c"
    }

    const lightTheme = {
        "--bg-color": "#fff",
        "--text-color": "#202124",
        "--border-color": "#e0e0e0",
        "--input-color": "#f1f3f4",
        "--yellow-color": "#feefc3"
    }

    useEffect(() => {
        changeTheme()
        // eslint-disable-next-line
    }, [toggle])

    function changeTheme() {
        if(toggle) {
            localStorage.setItem('theme', true)
            for( let [key, value] of Object.entries(darkTheme)) {
                document.documentElement.style.setProperty(key, value)
            }
        } else {
            localStorage.setItem('theme', false)
            for( let [key, value] of Object.entries(lightTheme)) {
                document.documentElement.style.setProperty(key, value)
            }
        }
    }

    return (
        <>
            <label className="switch">
                <input className="theme-mode" type="checkbox" checked={toggle} onChange={() => setToggle(prevState => !prevState)} />
                <span className="slider"></span>
            </label>
        </>
    );
}

export default Toggle;