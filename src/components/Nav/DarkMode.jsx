import { useState } from "react"
import ReactSwitch from "react-switch"
import useDarkSide from "../../hooks/useDarkSide"

const DarkMode = () => {

    const [colorTheme, setTheme] = useDarkSide()
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
 
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    };
 
    return (
        <>
        <label htmlFor="material-switch">
            <ReactSwitch
                //design stuff
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
                //design stuff 
                checked={darkSide}
                onChange={toggleDarkMode}
            />
         </label>   
        </>
    )
  


    
}

export default DarkMode