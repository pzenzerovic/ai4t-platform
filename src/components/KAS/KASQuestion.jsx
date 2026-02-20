export default function KASQuestion({ question, selectedAnswer, onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map(option => {
          const isSelected = selectedAnswer === option.id
          return (
            <button
              key={option.id}
              onClick={() => onSelect(question.id, option.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  isSelected ? 'border-primary' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span className={`text-sm leading-relaxed ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {option.text}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
