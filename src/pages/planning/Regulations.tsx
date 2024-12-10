import { useState } from 'react';
import { QuestionInput } from '../../components/planning/QuestionInput';
import { ProgressBar } from '../../components/planning/ProgressBar';
import { ActionButtons } from '../../components/planning/ActionButtons';
import React from 'react';

export function Regulations() {
  const [answers, setAnswers] = useState({
    guidelines: '',
    capacity: '',
    training: ''
  });

  const handleChange = (field: keyof typeof answers) => (value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const progress = Object.values(answers).filter(Boolean).length * (100 / 3);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Sustainability: Workforce and Regulations
        </h1>
        <ActionButtons />
      </div>

      <ProgressBar progress={progress} />

      <QuestionInput
        question="Has your organisation's workforce, including those who may be using the digital health system, been trained to follow sustainability guidelines, and how will support for this be provided?"
        tooltip={`
          <div className="space-y-4">
            <p>
              Supporting staff in sustainability involves providing resources, training, incentives, and recognition.
              The end goal is to make sustainability 'the norm'. Depending on your role in your organisation,
              the following questions may be applicable directly to you, or they may need to be posed to senior colleagues.
            </p>
            <div className="space-y-2">
              <p>
                Will the individuals and teams deploying and supporting the digital health system be sufficiently
                trained from a sustainability perspective? Will they be provided with training materials and workshops
                that are maintained over time to reflect new policies and practices arising?
              </p>
              <p>
                Will these individuals and teams be incentivised to make progress toward the goals outlined in their training,
                including time for sustainability activities, recognition for completion, and so on?
              </p>
            </div>
          </div>
        `}
        value={answers.guidelines}
        onChange={handleChange('guidelines')}
      />

      <QuestionInput
        question="What is your organisation's capacity and resources for implementing and maintaining sustainable practices?"
        tooltip={`
          <div className="space-y-4">
            <p>
              Consider both human and financial resources needed to implement and maintain sustainable practices.
              This includes staff time, training costs, and any additional infrastructure or equipment needed.
            </p>
          </div>
        `}
        value={answers.capacity}
        onChange={handleChange('capacity')}
      />

      <QuestionInput
        question="What training and support systems are in place for sustainability initiatives?"
        tooltip={`
          <div className="space-y-4">
            <p>
              Detail the training programs, support mechanisms, and resources available to help staff
              understand and implement sustainable practices effectively.
            </p>
          </div>
        `}
        value={answers.training}
        onChange={handleChange('training')}
      />
    </div>
  );
}
