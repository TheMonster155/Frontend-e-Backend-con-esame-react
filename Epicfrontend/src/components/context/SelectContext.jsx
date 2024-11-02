import { createContext, useState } from 'react'

export const SelectContext = createContext()

export const SelectContextProvider = ({ children }) => {
    const [selectAsin, setSelectAsin] = useState(null)
    const toggleAsin = (_id) => {
        setSelectAsin((prev) => (prev === _id ? null : _id))
    }
    return (
        <SelectContext.Provider
            value={{ selectAsin, toggleAsin, setSelectAsin }}
        >
            {children}
        </SelectContext.Provider>
    )
}
