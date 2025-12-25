import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  X, 
  Send, 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  BarChart3,
  MapPin,
  Droplets,
  Activity,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const aiSuggestions = [
  "Analyze water quality trends in Mokokchung",
  "Predict outbreak risk for next week",
  "Show intervention effectiveness metrics",
  "Generate health report summary"
];

const sampleResponses = [
  {
    trigger: "water quality",
    response: "Based on current data, I've identified 3 water sources showing declining quality indicators. The AI model suggests immediate testing for bacterial contamination in Mokokchung village well (confidence: 85%). Would you like me to generate an automated alert for the field teams?",
    suggestions: ["Generate alert", "View detailed analysis", "Schedule inspection"]
  },
  {
    trigger: "outbreak",
    response: "AI outbreak prediction model indicates a 65% probability of diarrhea cases increasing in the next 7 days in Imphal East district. Factors contributing: recent rainfall (+40%), declining water quality (-15%), and seasonal patterns. Recommended action: Deploy preventive health education team.",
    suggestions: ["Deploy team", "View risk factors", "Set up monitoring"]
  },
  {
    trigger: "intervention",
    response: "Current intervention effectiveness analysis shows: Water treatment programs have reduced case rates by 34% in treated areas. Community education initiatives show 67% improvement in prevention behaviors. Medical response time averaged 2.3 hours this week.",
    suggestions: ["Expand successful programs", "View detailed metrics", "Optimize response times"]
  },
  {
    trigger: "report",
    response: "This week's summary: 6 new health reports, 2 critical alerts resolved, 78% prevention score (↑15%). Key insights: Monsoon preparation needed in 3 districts, water source maintenance required in 2 locations. AI recommends prioritizing Mokokchung district for immediate intervention.",
    suggestions: ["Download full report", "Schedule interventions", "View recommendations"]
  }
];

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Health Surveillance Assistant. I can help you analyze data, predict outbreaks, and provide actionable insights. How can I assist you today?",
      timestamp: new Date(),
      suggestions: aiSuggestions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      const matchedResponse = sampleResponses.find(resp => 
        lowerMessage.includes(resp.trigger)
      );

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: matchedResponse ? matchedResponse.response : 
          "I understand you're asking about health surveillance data. Let me analyze the current situation and provide you with relevant insights. Based on real-time monitoring, I can help you with outbreak predictions, water quality analysis, or intervention planning.",
        timestamp: new Date(),
        suggestions: matchedResponse ? matchedResponse.suggestions : aiSuggestions
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>AI Health Assistant</CardTitle>
              <p className="text-sm text-gray-600">Powered by advanced ML models</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg p-3`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  
                  {message.suggestions && message.type === 'ai' && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-medium text-gray-600">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-6"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Capabilities */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">AI Capabilities:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-gray-600">Outbreak Prediction</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-600">Data Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <span className="text-xs text-gray-600">Risk Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-gray-600">Recommendations</span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about health data, predictions, or get recommendations..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(inputValue);
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}