import { redirect } from "next/navigation";

const page = () => {
    redirect("/forgot-password/account-recovery");
};

export default page;
