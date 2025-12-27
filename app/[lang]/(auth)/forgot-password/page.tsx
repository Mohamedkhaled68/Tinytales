"use client";
import AccountRecoveryForm from "@/components/AccountRecoveryForm";
import CreateNewPassword from "@/components/CreateNewPassword";
import OtpForm from "@/components/OtpForm";
import { useState } from "react";

const page = () => {
    const [step, setStep] = useState("email");

    return (
        <>
            {step === "email" && <AccountRecoveryForm setStep={setStep} />}
            {step === "otp" && <OtpForm setStep={setStep} type="reset" />}
            {step === "reset" && <CreateNewPassword setStep={setStep} />}
        </>
    );
};

export default page;
