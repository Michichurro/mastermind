import React from 'react';

const ProgressBar = ({ current, total }) => {
    const progress = (current / total) * 100;

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-wider">
                <span>Progress</span>
                <span>{current} / {total}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
