import React from "react";

interface Props {
    asset: string;
}

const Summary = ({ asset }: Props) => {
    return (
        <div className="max-w-md sm:px-3 lg:px-5">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 px-7 py-7">
                <img
                    className="w-96 h-64 mb-3 sm:rounded-md shadow-lg"
                    src={asset("images/compA-jpeg")}
                    alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    ABC Company
                </h5>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
        </div>
    );
};

export default Summary;
