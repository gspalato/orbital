import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Quiz from "./component";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const jsonDirectory = path.join(process.cwd(), "src/data/quizzes");

  try {
    const fileContents = await fs.readFile(
      jsonDirectory + `/${id}.json`,
      "utf8"
    );
    const quizData = JSON.parse(fileContents);

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {quizData.title || "Quiz"}
        </h1>
        <Quiz title={quizData.title} questions={quizData.questions} />
      </main>
    );
  } catch (error) {
    console.log(error);
  }
}
