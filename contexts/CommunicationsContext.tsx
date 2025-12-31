"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Communications } from "@/types/Home";

interface CommunicationsContextType {
    communications: Communications | null;
    setCommunications: (communications: Communications | null) => void;
}

const CommunicationsContext = createContext<
    CommunicationsContextType | undefined
>(undefined);

export const CommunicationsProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [communications, setCommunications] = useState<Communications | null>(
        null
    );

    return (
        <CommunicationsContext.Provider
            value={{ communications, setCommunications }}
        >
            {children}
        </CommunicationsContext.Provider>
    );
};

export const useCommunications = () => {
    const context = useContext(CommunicationsContext);
    if (!context) {
        throw new Error(
            "useCommunications must be used within CommunicationsProvider"
        );
    }
    return context;
};
