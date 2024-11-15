import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Quiz {
  id: string;
  title: string;
}

export default async function QuizMenu() {
  const quizDirectory = path.join(process.cwd(), "src/data/quizzes");
  const quizFiles = await fs.readdir(quizDirectory);

  const quizzes: Quiz[] = await Promise.all(
    quizFiles.map(async (filename) => {
      const filePath = path.join(quizDirectory, filename);
      const fileContents = await fs.readFile(filePath, "utf8");
      const quizData = JSON.parse(fileContents);
      return {
        id: quizData.id || path.parse(filename).name,
        title: quizData.title || `Quiz ${path.parse(filename).name}`,
      };
    })
  );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <Link href={`/quiz/${quiz.id}`} key={quiz.id}>
            <Card className="hover:shadow-lg transition-shadow aspect-video">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
