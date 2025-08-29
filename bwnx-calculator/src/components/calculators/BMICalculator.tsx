import { useState } from "react";

interface Props {}

export default function BMICalculator({}: Props) {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const bmi = weight / ((height / 100) * (height / 100));

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <label className="flex flex-col">
        <span>Height (cm)</span>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </label>
      <label className="flex flex-col">
        <span>Weight (kg)</span>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </label>
      <div className="text-center mt-4">
        <p className="text-xl font-semibold">BMI: {bmi.toFixed(1)}</p>
      </div>
    </div>
  );
}