import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Card from './ui/Card';
import ProgressBar from './ui/ProgressBar';

const QuizScreen = ({ question, currentQuestionIndex, totalQuestions, onAnswer }) => {
    const { t } = useLanguage();

    // Get translated question
    const translatedQuestion = t.questions[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-4xl mx-auto animate-fade-in">
            <div className="w-full mb-12">
                <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white leading-tight">
                {translatedQuestion.text}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {question.options.map((option, index) => (
                    <Card
                        key={index}
                        onClick={() => onAnswer(option.scores)}
                        hoverEffect={true}
                        className="flex items-center justify-center min-h-[120px] text-center group"
                    >
                        <p className="text-lg text-slate-300 group-hover:text-white transition-colors">
                            {translatedQuestion.options[index]}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default QuizScreen;
