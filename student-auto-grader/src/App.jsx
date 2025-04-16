import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StudentInputGrader() {
  const [answers, setAnswers] = useState(Array(25).fill(''));
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState([]);

  const answerKey = [
    'A', 'C', 'B', 'D', 'A', 'B', 'C', 'D', 'A', 'B',
    'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D',
    'A', 'B', 'C', 'D', 'A'
  ];

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value.toUpperCase();
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let total = 0;
    const feedback = answers.map((ans, i) => {
      const correct = answerKey[i];
      const isCorrect = ans.trim().toUpperCase() === correct;
      if (isCorrect) total++;
      return { question: i + 1, studentAnswer: ans, correctAnswer: correct, isCorrect };
    });
    setScore(total);
    setResult(feedback);
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white rounded-xl shadow-md border border-gray-200">
      <Card className="bg-[#f7f9fb]">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#1e3a8a] border-b pb-2">진단검사-TRI 성적입력</h2>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-5 gap-3">
            {answers.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-center focus:ring-2 focus:ring-blue-300"
                placeholder={Q${idx + 1}}
              />
            ))}
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={submitted || !name}>
            제출하고 채점하기
          </Button>
        </CardContent>
      </Card>

      {submitted && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{name}님의 채점 결과</h3>
            <p className="mb-4 text-lg">총점: <span className="font-bold text-blue-700">{score} / 25</span></p>
            <div className="grid grid-cols-5 gap-2 text-sm">
              {result.map((r, i) => (
                <div
                  key={i}
                  className={p-2 rounded text-center font-medium ${r.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}}
                >
                  Q{r.question}: {r.studentAnswer || '-'}
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => {
                setAnswers(Array(25).fill(''));
                setSubmitted(false);
                setScore(0);
                setResult([]);
                setName('');
              }}
            >
              다시 시작하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
