/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { cva } from "class-variance-authority";
import { CgSpinner } from "react-icons/cg";

import { cn } from "../../lib/utils";

const spinnerVariants = cva(`animate-spin`, {
    variants: {
        variant: {
            primary: "text-emerald-400",
            danger: "text-red-500",
        },
        size: {
            small: "w-5 h-5",
            large: "w-10 h-10",
        },
    },
    defaultVariants: {
        size: "small",
        variant: "primary",
    },
});

export const Spinner = ({ size, variant, className }) => {
    return (
        <CgSpinner
            className={cn(spinnerVariants({ className, variant, size }))}
        />
    );
};

export const SpinnerFull = () => {
    return (
        <div className="w-full h-[50vh] flex justify-center items-center">
            <Spinner size="large" />
        </div>
    );
};
