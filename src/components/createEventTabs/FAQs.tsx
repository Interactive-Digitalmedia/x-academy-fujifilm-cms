import { useState } from 'react'
import { Input, Textarea } from '@nextui-org/react'
import { Plus, Trash2 } from 'lucide-react'

const blankFaq = { Q: '', A: '' }

export default function FAQs({ data, setData }: any) {
  const [faqBlocks, setFaqBlocks] = useState([{ ...blankFaq }])

  const handleFieldChange = (index: number, field: 'Q' | 'A', value: string) => {
    const updated = [...faqBlocks]
    updated[index][field] = value
    setFaqBlocks(updated)
    setData({ ...data, FAQ: updated }) // sync with schema
  }

  const handleAddFaq = () => {
    const updated = [...faqBlocks, { ...blankFaq }]
    setFaqBlocks(updated)
    setData({ ...data, FAQ: updated })
  }

  const handleRemoveFaq = (index: number) => {
    if (faqBlocks.length === 1) return
    const updated = [...faqBlocks]
    updated.splice(index, 1)
    setFaqBlocks(updated)
    setData({ ...data, FAQ: updated })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>

      {faqBlocks.map((faq, index) => (
        <div
          key={index}
          className="space-y-4 p-6 rounded-xl border bg-white relative"
        >
          {/* Remove button */}
          {faqBlocks.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveFaq(index)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition"
              title="Remove this question"
            >
              <Trash2 size={16} />
            </button>
          )}

          <h3 className="font-medium text-md">Question Item</h3>

          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <Input
              placeholder="Enter your question"
              value={faq.Q}
              onChange={(e) => handleFieldChange(index, 'Q', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <Textarea
              placeholder="Type your answer"
              minRows={3}
              value={faq.A}
              onChange={(e) => handleFieldChange(index, 'A', e.target.value)}
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddFaq}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} strokeWidth={2} />
          Add Item
        </button>
      </div>
    </div>
  )
}
