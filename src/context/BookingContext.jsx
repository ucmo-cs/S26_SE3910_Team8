import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [booking, setBooking] = useState({
        service: null,
        branch: null,
        date: null,
        time: null,
        customer: {
            fullName: "",
            email: "",
            phone: "",
            notes: ""
        }
    });

    const updateBooking = (key, value) => {
        setBooking(prev => ({ ...prev, [key]: value }));
    };

    const updateCustomer = (field, value) => {
        setBooking(prev => ({
            ...prev,
            customer: { ...prev.customer, [field]: value }
        }));
    };

    const resetBooking = () => {
        setBooking({
            service: null,
            branch: null,
            date: null,
            time: null,
            customer: { fullName: "", email: "", phone: "", notes: "" }
        });
    };

    return (
        <BookingContext.Provider
            value={{ booking, updateBooking, updateCustomer, resetBooking }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);
