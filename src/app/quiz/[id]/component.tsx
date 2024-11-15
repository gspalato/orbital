"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface QuizComponentProps {
  questions: Question[];
  title: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizComponent({
  questions,
  title,
}: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>(
    []
  );

  useEffect(() => {
    setRandomizedQuestions(
      questions.map((question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }))
    );
  }, [questions]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return randomizedQuestions.reduce((score, question, index) => {
      return score + (question.answers[userAnswers[index]]?.correct ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{title} - Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">
            Your score: {score} out of {questions.length}
          </p>
          {randomizedQuestions.map((question, qIndex) => (
            <div key={question.id} className="mb-4">
              <p className="font-semibold">{question.question}</p>
              <div className="ml-4">
                {question.answers.map((answer, aIndex) => (
                  <p
                    key={aIndex}
                    className={
                      answer.correct
                        ? "text-green-600"
                        : userAnswers[qIndex] === aIndex
                        ? "text-red-600"
                        : "text-gray-600"
                    }
                  >
                    {answer.text}
                    {answer.correct && " (Correct)"}
                    {userAnswers[qIndex] === aIndex && " (Your answer)"}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => window.location.reload()}>Restart Quiz</Button>
          <Link href="/quizzes">
            <Button variant="outline">Back to Menu</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = randomizedQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {title} - Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">{currentQuestion.question}</p>
        <RadioGroup
          value={userAnswers[currentQuestionIndex].toString()}
          onValueChange={(value) => handleAnswer(parseInt(value))}
        >
          {currentQuestion.answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`answer-${currentQuestionIndex}-${index}`}
              />
              <Label htmlFor={`answer-${currentQuestionIndex}-${index}`}>
                {answer.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/quizzes">
          <Button variant="outline">Back to Menu</Button>
        </Link>
        <Button
          onClick={handleNext}
          disabled={userAnswers[currentQuestionIndex] === -1}
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
