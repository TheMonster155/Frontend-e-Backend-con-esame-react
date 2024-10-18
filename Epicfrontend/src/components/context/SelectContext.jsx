import { createContext, useState } from 'react'

export const SelectContext = createContext()

export const SelectContextProvider = ({ children }) => {
    const [selectAsin, setSelectAsin] = useState(null)
    const toggleAsin = (asin) => {
        setSelectAsin((prev) => (prev === asin ? null : asin))
    }
    return (
        <SelectContext.Provider
            value={{ selectAsin, toggleAsin, setSelectAsin }}
        >
            {children}
        </SelectContext.Provider>
    )
}
