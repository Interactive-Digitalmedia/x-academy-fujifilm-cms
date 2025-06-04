import * as React from "react";
import {
  Tabs,
  Tab,
  Input,
  Button,
  Accordion,
  AccordionItem,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { Search, Calendar, Filter, Plus, Trash2 } from "lucide-react";

interface Question {
  id: string;
  query: string;
  answer: string;
}

interface Template {
  id: string;
  name: string;
  questions: Question[];
  isExpanded: boolean;
}

interface OthersProps {}

const Others: React.FunctionComponent<OthersProps> = () => {
  const [activeTab, setActiveTab] = React.useState("faq");
  const [templates, setTemplates] = React.useState<Template[]>([
    {
      id: "1",
      name: "Template 1",
      questions: [],
      isExpanded: false,
    },
    {
      id: "2",
      name: "Template 2",
      questions: [
        { id: "q1", query: "Query", answer: "Sample" },
        { id: "q2", query: "Query", answer: "Sample" },
        { id: "q3", query: "Query", answer: "Sample" },
      ],
      isExpanded: true,
    },
  ]);

  const [defaultWebsiteFAQ, setDefaultWebsiteFAQ] = React.useState(false);
  const [defaultEventFAQ, setDefaultEventFAQ] = React.useState(false);

  const addNewTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: `Template ${templates.length + 1}`,
      questions: [],
      isExpanded: true,
    };
    setTemplates([...templates, newTemplate]);
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.id !== templateId));
  };

  const addQuestion = (templateId: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      query: "",
      answer: "",
    };

    setTemplates(
      templates.map((template) =>
        template.id === templateId
          ? { ...template, questions: [...template.questions, newQuestion] }
          : template
      )
    );
  };

  const deleteQuestion = (templateId: string, questionId: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              questions: template.questions.filter((q) => q.id !== questionId),
            }
          : template
      )
    );
  };

  const updateQuestion = (
    templateId: string,
    questionId: string,
    field: "query" | "answer",
    value: string
  ) => {
    setTemplates(
      templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              questions: template.questions.map((question) =>
                question.id === questionId
                  ? { ...question, [field]: value }
                  : question
              ),
            }
          : template
      )
    );
  };

  const renderFAQContent = () => (
    <div className="space-y-6">
      {/* Header with New Template Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h1>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={addNewTemplate}
        >
          New Template
        </Button>
      </div>

      {/* Templates Accordion */}
      <div className="">
        {templates.map((template) => (
          <Accordion
            key={template.id}
            defaultExpandedKeys={template.isExpanded ? [template.id] : []}
          >
            <AccordionItem
              key={template.id}
              aria-label={template.name}
              title={
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={template.id === "2"}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-medium text-gray-700">
                      {template.name}
                    </span>
                  </div>
                  <div
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTemplate(template.id);
                    }}
                  >
                    Delete Template
                  </div>
                </div>
              }
            >
              <div className="space-y-4 p-4">
                {/* Questions */}
                {template.questions.map((question, index) => (
                  <div key={question.id} className="space-y-3 p-4  rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">
                        {index + 1}. Question
                      </h4>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => deleteQuestion(template.id, question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Query
                        </label>
                        <Input
                          value={question.query}
                          onValueChange={(value) =>
                            updateQuestion(
                              template.id,
                              question.id,
                              "query",
                              value
                            )
                          }
                          placeholder="Query"
                          classNames={{
                            inputWrapper: "bg-white border border-gray-200",
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Answer
                        </label>
                        <Textarea
                          value={question.answer}
                          onValueChange={(value) =>
                            updateQuestion(
                              template.id,
                              question.id,
                              "answer",
                              value
                            )
                          }
                          placeholder="Sample"
                          minRows={3}
                          classNames={{
                            inputWrapper: "bg-white border border-gray-200",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Item Button */}
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={<Plus className="w-4 h-4" />}
                  onPress={() => addQuestion(template.id)}
                  className="w-full"
                >
                  Add Item
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      {/* Additional Controls */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Additional Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Make default website FAQ</span>
            <Switch
              isSelected={defaultWebsiteFAQ}
              onValueChange={setDefaultWebsiteFAQ}
              color="primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Make default event FAQ</span>
            <Switch
              isSelected={defaultEventFAQ}
              onValueChange={setDefaultEventFAQ}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsletterContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Newsletter Subscriptions
      </h1>
      <div className="text-gray-500">
        Newsletter subscriptions content coming soon...
      </div>
    </div>
  );

  const renderAboutUsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">About Us</h1>
        <Button color="primary" startContent={<span>✏️</span>}>
          Edit Details
        </Button>
      </div>
      <div className="text-gray-500">About Us content coming soon...</div>
    </div>
  );

  return (
    <div className="bg-white h-max rounded-xl p-8">
      {/* Search and Filter Header */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1 ">
          <Input
            type="text"
            placeholder="Search"
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              inputWrapper: "bg-gray-50 border border-gray-200 ",
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="bordered"
            className="border-[1.5px]"
            startContent={<Calendar className="w-4 h-4" />}
          >
            Dates
          </Button>
          <Button
            variant="bordered"
            className="border-[1.5px]"
            startContent={<Filter className="w-4 h-4" />}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Others sections"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
        }}
      >
        <Tab key="faq" title="FAQ">
          {renderFAQContent()}
        </Tab>
        <Tab key="newsletter" title="Newsletter Subscriptions">
          {renderNewsletterContent()}
        </Tab>
        <Tab key="about" title="About Us">
          {renderAboutUsContent()}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Others;
